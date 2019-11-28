/* eslint-disable no-underscore-dangle */
import nicknameFinder from '../database/nickname';
import quizFinder from '../database/quiz';
import { ROOM, DIRECTION, FIELD } from '../constants/room';

/**
 * Room Class
 * @property {string} id
 * @property {string} name
 * @property {boolean} isGameStarted
 * @property {object[]} quizList
 * @property {object} currentQuiz
 * @property {number} currentRound
 * @property {number} currentTime
 * @property {Map<string, user>} users
 * @property {Array.<Array.<number, number>>} indexOfCharacters
 */
class Room {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isGameStarted = false;
    this.quizList = [];
    this.currentQuiz = {};
    this.currentRound = 0;
    this.currentTime = 0;
    this.users = new Map();
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    this.nicknameList = [];
    this.aliveUserNumber = 0;
  }

  async _fetchRandomNickname() {
    const adjList = await nicknameFinder.fetchAdjList();
    const nounList = await nicknameFinder.fetchNounList();
    for (let idx = 0; idx < adjList.length; idx += 1) {
      this.nicknameList[idx] = `${adjList[idx].adj} ${nounList[idx].noun}`;
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getNumOfUsers() {
    return this.users.size;
  }

  isEnterable() {
    if (this.isGameStarted) return false;
    if (this.users.size >= ROOM.MAX_USER) return false;
    return true;
  }

  // 아래는 on에 대응한 emit

  // emit: enter_room / 자신 / (자신 포함) 모든 캐릭터 + 닉네임 + 위치,
  //                          게임 중이 아니라면, 게임 중인 여부, 방장 여부
  //                          게임 중이라면, 게임 중인 여부, 문제 + 남은 시간까지
  // emit: enter_new_user / 자신을 제외한 모든 유저 / 새로 추가된 유저의 캐릭터 + 닉네임 + 위치
  /**
   * enter_room event.
   *
   * @event server#enter_room
   *
   * @type {object}
   * @property {Array} characterList
   * @property {Boolean} isGameStarted
   * @property {string} question
   * @property {number} timeLimit
   * @property {Boolean} isOwner
   *
   * @example
   * user.emitEnterRoom({
   *   characterList,
   *   isGameStarted: this.isGameStarted,
   *   question: this.currentQuiz.question,
   *   timeLimit: ROOM.TIME_LIMIT - this.currentTime,
   *   isOwner: this._isOwner(user),
   * });
   */
  /**
   *
   * @param {User} user
   */
  async enterUser(user) {
    this.users.set(user.getId(), user);

    if (this.isGameStarted === false) {
      this._placeCharacter(user);
    }

    if (!this.nicknameList.length) {
      await this._fetchRandomNickname();
    }
    user.setNickname(this.nicknameList.shift());

    const myCharacter = user.getCharacter();
    const characterList = this.makeCharacterList(myCharacter);

    const newUser = { ...characterList[characterList.length - 1], isMine: false };

    this.users.forEach((_user) => {
      if (user === _user) return;
      _user.emitEnterNewUser({ characterList: [newUser] });
    });

    user.emitEnterRoom({
      characterList,
      isGameStarted: this.isGameStarted,
      question: this.currentQuiz.question,
      timeLimit: ROOM.TIME_LIMIT - this.currentTime,
      isOwner: this._isOwner(user),
    });
    this.aliveUserNumber += 1;
  }


  makeCharacterList(myCharacter) {
    const characterList = [];

    this.users.forEach((_user) => {
      const character = _user.getCharacter();
      if (character.isPlaced() === false) return;
      characterList.push({
        userId: _user.getId(),
        isMine: character === myCharacter,
        nickname: _user.getNickname(),
        ...character.getInfo(),
      });
    });

    return characterList;
  }

  // emit: leave_user / 다른 유저 / 삭제할 캐릭터 + 닉네임
  leaveUser(user) {
    const character = user.getCharacter();
    if (character !== null && character.isPlaced()) {
      const [indexX, indexY] = character.getIndexes();
      this.indexOfCharacters[indexX][indexY] = undefined;
      user.deleteCharacter();
    }
    this.nicknameList.push(user.getNickname());
    const userInfo = { nickname: user.getNickname(), isOwner: this._isOwner(user) };

    this.users.delete(user.getId());
    this.users.forEach((_user) => _user.emitLeaveUser({ characterList: [userInfo] }));
    this.aliveUserNumber -= 1;
  }

  // emit: start_game / 모든 유저 / (시작 가능 시) 게임 상태 변경
  //  ㄴ 다음으로 변경: 시작 값으로 셋팅하고, emit: start_round 호출
  async startGame(user) {
    if (this._isOwner(user) && this.isGameStarted === false) {
      this.isGameStarted = true;
      this.currentRound = 0;
      this.quizList = await quizFinder.fetchQuizList();
      this.aliveUserNumber = this.users.size;

      await this._startRound();
    }
  }

  // emit: move / 모든 유저 / 특정 캐릭터의 이동할 위치
  moveCharacter(user, direction) {
    const character = user.getCharacter();
    if (character.isPlaced() === false) return;

    const [oldIndexX, oldIndexY] = character.getIndexes();
    let newIndexX = oldIndexX;
    let newIndexY = oldIndexY;

    switch (direction) {
      case DIRECTION.LEFT: newIndexX -= 1; break;
      case DIRECTION.RIGHT: newIndexX += 1; break;
      case DIRECTION.UP: newIndexY -= 1; break;
      case DIRECTION.DOWN: newIndexY += 1; break;
      default: return;
    }

    const nickname = user.getNickname();
    const canMove = this._canBeMoved(newIndexX, newIndexY);
    this.users.forEach((_user) => {
      _user.emitMove({ canMove, nickname, direction });
    });

    if (canMove) {
      user.character.setIndexes(newIndexX, newIndexY);
      this.indexOfCharacters[oldIndexX][oldIndexY] = undefined;
      this.indexOfCharacters[newIndexX][newIndexY] = user;
    }
  }

  // emit: chat_message / 모든 유저 / 채팅 로그 (닉네임 + 메시지)
  chat(user, message) {
    console.log(user.getId(), message);
    // TODO: 모든 유저에게 채팅 로그 (닉네임 + 메시지) emit
  }

  /**
   * @event server#start_round
   *
   * @property {object}
   * @property {number} currentRound
   * @property {string} question
   * @property {number} timeLimit
   */

  /**
   * round를 시작하게 합니다.
   */
  async _startRound() {
    this.currentQuiz = this.quizList[this.currentRound];
    this.currentTime = 0;
    this.users.forEach((user) => {
      user.emitStartRound({
        round: this.currentRound,
        question: this.currentQuiz.question,
        timeLimit: ROOM.TIME_LIMIT,
      });
    });

    this._countTime();
  }

  // emit: end_round / 모든 유저 / 정답, 오답 캐릭터 리스트, 해설
  _endRound() {
    const { comment, answer } = this.currentQuiz;
    const dropUsers = this._checkCharactersLocation(this.currentQuiz.answer);
    const endRoundInfos = {
      round: this.currentRound,
      comment,
      answer,
      characterList: dropUsers,
    };

    this.users.forEach((user) => {
      user.emitEndRound(endRoundInfos);
    });

    if (this.aliveUserNumber === 1 || this.currentRound === ROOM.MAX_ROUND) {
      this._endGame();
      return;
    }

    this.currentRound += 1;
    setTimeout(() => this._startRound(), ROOM.WAITING_TIME_MS);
  }

  _checkCharactersLocation(answerSide) {
    const [dropStart, dropEnd] = answerSide
      ? [FIELD.X_START, FIELD.X_END] : [FIELD.O_START, FIELD.O_END];

    const dropUsers = [];

    for (let i = dropStart; i < dropEnd; i += 1) {
      for (let j = 0; j < ROOM.FIELD_ROW; j += 1) {
        const character = this.indexOfCharacters[i][j];
        if (character !== undefined) {
          dropUsers.push({ nickname: character.getNickname(), isOwner: this._isOwner(character) });
          this.indexOfCharacters[i][j] = undefined;
        }
      }
    }
    this.aliveUserNumber -= dropUsers.length;
    return dropUsers;
  }

  // emit: not_end_round / 모든 유저 / 정답, 재도전 안내
  // 현재 있어야하나, 고민 중...
  _notEndRound() {}

  // emit: end_game / 모든 유저 / 우승자 닉네임, 게임 상태, 모든 캐릭터 + 닉네임 + 위치
  _endGame() {
    this.users.forEach((user) => {
      setTimeout(() => user.emitEndGame(), ROOM.WAITING_TIME_MS);
    });
    this.isGameStarted = false;
  }

  /**
   * 유저의 캐릭터를 랜덤한 위치에 이동시키는 메서드
   */
  _placeCharacter(user) {
    const [indexX, indexY] = this._getRandomEmptyIndex();
    const character = user.getCharacter();
    character.setIndexes(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = user;
  }

  /**
   * @returns {Boolean}
   */
  _isOwner(user) {
    const ownerId = this.users.keys().next().value;
    return ownerId === user.getId();
  }

  /**
   * 제한 시간까지 시간을 측정하는 메서드
   */
  _countTime() {
    setTimeout(() => {
      this.currentTime += 1;
      if (this.currentTime < ROOM.TIME_LIMIT) {
        this._countTime();
      } else {
        this._endRound();
      }
    }, ROOM.SECOND);
  }

  /**
   * @returns {Array.<number, number>}
   */
  _getRandomEmptyIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (ROOM.FIELD_COLUMN));
      indexY = Math.floor(Math.random() * (ROOM.FIELD_ROW));
    } while (this.indexOfCharacters[indexX][indexY]);
    return [indexX, indexY];
  }

  /**
   * @returns {Array.<Array.<number, number>>}
   */
  _getEmptyIndexMatrix() {
    return Array(ROOM.FIELD_COLUMN).fill().map(() => Array(ROOM.FIELD_ROW));
  }

  /**
   * @returns {Boolean}
   */
  _canBeMoved(newIndexX, newIndexY) {
    if (newIndexX < 0 || newIndexX >= ROOM.FIELD_COLUMN) return false;
    if (newIndexY < 0 || newIndexY >= ROOM.FIELD_ROW) return false;
    if (this.indexOfCharacters[newIndexX][newIndexY] !== undefined) return false;
    return true;
  }
}

export default Room;
