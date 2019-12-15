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
    this.aliveUsers = new Map();
    this.moveQueue = [];
    this.isMoving = false;
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
    return this.isGameStarted === false && this.users.size < ROOM.MAX_USER;
  }

  isUserEntered(user) {
    if (user.isGuest()) return false;
    return this.users.has(user.getNickname());
  }

  isStarted() {
    return this.isGameStarted;
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
    if (this.isGameStarted === false) {
      this._placeCharacter(user);
    }

    if (this.nicknameList.length === 0) {
      await this._fetchRandomNickname();
    }

    if (user.isGuest()) {
      user.setNickname(this.nicknameList.shift());
    }
    this.users.set(user.getNickname(), user);

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
      roomName: this.name,
    });
    this.aliveUsers.set(user.getNickname(), user);
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

    this.users.delete(user.getNickname());
    const nickname = user.getNickname();
    const isAlive = this.aliveUsers.has(nickname);
    const characterList = [{ nickname, isAlive }];

    this.users.forEach((_user) => {
      _user.emitLeaveUser({ characterList, isOwner: this._isOwner(_user) });
    });
    this.aliveUsers.delete(nickname);
    user.emitLeaveRoom();
  }

  // emit: start_game / 모든 유저 / (시작 가능 시) 게임 상태 변경
  //  ㄴ 다음으로 변경: 시작 값으로 셋팅하고, emit: start_round 호출
  async startGame(user) {
    if (this._canBeStarted(user) === false) return false;

    this.isGameStarted = true;
    this.currentRound = 0;
    this.quizList = await quizFinder.fetchQuizList();
    this.users.forEach((_user) => _user.emitStartGame());

    setTimeout(() => this._startRound(), ROOM.READY_TIME_MS);
    return true;
  }

  useSkill(user, direction) {
    const character = user.getCharacter();
    if (character.isPlaced() === false) return;

    const [oldIndexX, oldIndexY] = character.getIndexes();
    const { nextUser } = this._canBeMoved(oldIndexX, oldIndexY, direction);

    if (nextUser === undefined) return;
    this.moveQueue.push([nextUser, direction, true]);
    if (this.moveQueue.length > 0) {
      this.moveCharacter(...this.moveQueue.shift());
    }
  }

  // emit: move / 모든 유저 / 특정 캐릭터의 이동할 위치
  moveCharacter(user, direction, isLoop = false) {
    const character = user.getCharacter();

    if (character.isPlaced() === false) return;
    if (this.isMoving) {
      this.moveQueue.push([user, direction, isLoop]);
      return;
    }
    this.isMoving = true;

    const [oldIndexX, oldIndexY] = character.getIndexes();
    const { newIndexX, newIndexY, canMove } = this._canBeMoved(oldIndexX, oldIndexY, direction);
    const canTurn = direction !== character.getDirection();

    if (canMove) {
      character.setIndexes(newIndexX, newIndexY);
      this.indexOfCharacters[oldIndexX][oldIndexY] = undefined;
      this.indexOfCharacters[newIndexX][newIndexY] = user;
    }

    if (canMove || canTurn) {
      // character의 기본 direction을 null로 설정했습니다.
      // 추후에는 캐릭터 생성시 랜덤한 방향을 바라보게 하거나 아래를 보게 해줄수도 있겠죠
      const nickname = user.getNickname();
      character.setDirection(direction);
      this.users.forEach((_user) => {
        _user.emitMove({
          canMove, nickname, direction, newIndexX, newIndexY,
        });
      });
    }

    if (canMove && isLoop) {
      this.moveQueue.push([user, direction, isLoop]);
    }

    this.isMoving = false;
    if (this.moveQueue.length > 0) {
      this.moveCharacter(...this.moveQueue.shift());
    }
  }

  // emit: chat_message / 모든 유저 / 채팅 로그 (닉네임 + 메시지)
  chat(nickname, message) {
    this.users.forEach((user) => user.emitChatMessage({ nickname, message }));
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
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    const characterList = [];

    this.aliveUsers.forEach((user, nickname) => {
      const [indexX, indexY] = this._getRandomEmptyIndex();
      const character = user.getCharacter();
      character.setIndexes(indexX, indexY);
      this.indexOfCharacters[indexX][indexY] = user;
      characterList.push({ nickname, indexX, indexY });
    });

    this.users.forEach((user) => {
      user.emitStartRound({
        round: this.currentRound,
        question: this.currentQuiz.question,
        timeLimit: ROOM.TIME_LIMIT,
        characterList,
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

    if (this.aliveUsers.size - dropUsers.length !== 0) {
      dropUsers.forEach(({ nickname }) => this.aliveUsers.delete(nickname));
    }

    if (this.aliveUsers.size === 1 || this.currentRound === ROOM.MAX_ROUND) {
      this._endGame();
      return;
    }

    this.currentRound += 1;
    setTimeout(() => this._startRound(), ROOM.WAITING_TIME_MS);
  }

  _checkCharactersLocation(answerSide) {
    const [dropStart, dropEnd] = (
      answerSide
        ? [FIELD.X_START, FIELD.X_END]
        : [FIELD.O_START, FIELD.O_END]);

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
    return dropUsers;
  }

  // emit: not_end_round / 모든 유저 / 정답, 재도전 안내
  // 현재 있어야하나, 고민 중...
  _notEndRound() {}

  // emit: end_game / 모든 유저 / 우승자 닉네임, 게임 상태, 모든 캐릭터 + 닉네임 + 위치
  _endGame() {
    const characterList = [];
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    this.users.forEach((user) => {
      const [indexX, indexY] = this._placeCharacter(user);
      characterList.push({ nickname: user.getNickname(), indexX, indexY });
    });

    this.users.forEach((user) => {
      setTimeout(() => user.emitEndGame({
        characterList,
        isOwner: this._isOwner(user),
      }), ROOM.WAITING_TIME_MS);
    });
    this.isGameStarted = false;

    this.aliveUsers.clear();
    this.users.forEach((user) => this.aliveUsers.set(user.getNickname(), user));
  }

  /**
   * 유저의 캐릭터를 랜덤한 위치에 이동시키는 메서드
   * @returns {Array.<number, number>}
   */
  _placeCharacter(user) {
    const [indexX, indexY] = this._getRandomEmptyIndex();
    const character = user.getCharacter();
    character.setIndexes(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = user;
    return [indexX, indexY];
  }

  /**
   * @returns {Boolean}
   */
  _isOwner(user) {
    const ownerNickname = this.users.keys().next().value;
    return ownerNickname === user.getNickname();
  }

  /**
   * 제한 시간까지 시간을 측정하는 메서드
   */
  _countTime() {
    setTimeout(() => {
      this.currentTime += 1;
      if (this.currentTime < ROOM.TIME_LIMIT) {
        this._countTime();
        return;
      }
      this._endRound();
    }, ROOM.SECOND);
  }

  /**
   * @returns {Array.<number, number>}
   */
  _getRandomEmptyIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * ROOM.FIELD_COLUMN);
      indexY = Math.floor(Math.random() * ROOM.FIELD_ROW);
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
  _canBeMoved(oldIndexX, oldIndexY, direction) {
    let [newIndexX, newIndexY] = [oldIndexX, oldIndexY];
    switch (direction) {
      case DIRECTION.LEFT: newIndexX -= 1; break;
      case DIRECTION.RIGHT: newIndexX += 1; break;
      case DIRECTION.UP: newIndexY -= 1; break;
      case DIRECTION.DOWN: newIndexY += 1; break;
      default: return {
        newIndexX, newIndexY, canMove: false, occupiedUser: undefined,
      };
    }

    const inField = (
      newIndexX >= 0 && newIndexX < ROOM.FIELD_COLUMN
      && newIndexY >= 0 && newIndexY < ROOM.FIELD_ROW
    );
    const nextUser = inField ? this.indexOfCharacters[newIndexX][newIndexY] : undefined;
    const canMove = inField && nextUser === undefined;

    return {
      newIndexX, newIndexY, canMove, nextUser,
    };
  }

  /**
   * @returns {Boolean}
   */
  _canBeStarted(user) {
    return (
      this.aliveUsers.size > 1
      && this.aliveUsers.size <= ROOM.MAX_USER
      && this._isOwner(user)
      && this.isGameStarted === false);
  }
}

export default Room;
