/* eslint-disable no-underscore-dangle */
import quizFinder from '../database/quiz';
import { ROOM, DIRECTION } from '../constants/room';

/**
 * Room Class
 * @property {string} id
 * @property {string} name
 * @property {boolean} isGameStarted
 * @property {object[]} quizList
 * @property {object} currentQuiz
 * @property {number} currentRound
 * @property {number} currentTime
 * @property {User[]} userList
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
    this.userList = [];
    this.indexOfCharacters = this._getEmptyIndexMatrix();
  }

  // 아래는 on에 대응한 emit

  // emit: enter_room / 자신 / (자신 포함) 모든 캐릭터 + 닉네임 + 위치,
  //                          게임 중이 아니라면, 게임 중인 여부, 방장 여부
  //                          게임 중이라면, 게임 중인 여부, 문제 + 남은 시간까지
  // emit: enter_new_user / 자신을 제외한 모든 유저 / 새로 추가된 유저의 캐릭터 + 닉네임 + 위치
  enterUser(user) {
    this.userList.push(user);

    const myCharacter = user.getCharacter();
    if (this.isGameStarted === false) {
      this._placeCharacter(myCharacter);
    }

    const characterList = [];
    this.userList.forEach((_user) => {
      const character = _user.getCharacter();
      if (character.isPlaced() === false) return;
      characterList.push({
        userId: _user.getId(),
        isMine: character === myCharacter,
        ...character.getInfo(),
      });
    });

    this.userList.forEach((_user) => {
      if (user === _user) return;
      _user.emitEnterNewUser(myCharacter.getInfo());
    });

    user.emitEnterRoom({
      characterList,
      isGameStarted: this.isGameStarted,
      question: this.currentQuiz.question,
      timeLimit: ROOM.TIME_LIMIT - this.currentTime,
      isOwner: this._isOwner(user),
    });
  }

  // emit: leave_user / 다른 유저 / 삭제할 캐릭터 + 닉네임
  leaveUser(user) {
    const character = user.getCharacter();
    if (character.isPlaced()) {
      const [indexX, indexY] = character.getIndexes();
      this.indexOfCharacters[indexX][indexY] = undefined;
      user.deleteCharacter();
    }

    const userIndex = this.userList.findIndex((_user) => user === _user);
    this.userList.splice(userIndex, 1);

    this.userList.forEach((_user) => _user.emitLeaveUser({ userId: user.getId() }));
  }

  // emit: start_game / 모든 유저 / (시작 가능 시) 게임 상태 변경
  //  ㄴ 다음으로 변경: 시작 값으로 셋팅하고, emit: start_round 호출
  async startGame(user) {
    if (this._isOwner(user) && this.isGameStarted === false) {
      this.isGameStarted = true;
      this.currentRound = 0;

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

    if (this._canBeMoved(newIndexX, newIndexY) === false) return;

    this.indexOfCharacters[oldIndexX][oldIndexY] = undefined;
    this.indexOfCharacters[newIndexX][newIndexY] = character;
    character.setIndexes(newIndexX, newIndexY);

    const userId = user.getId();
    user.emitMove({ userId, indexX: newIndexX, indexY: newIndexY });
  }

  // emit: chat_message / 모든 유저 / 채팅 로그 (닉네임 + 메시지)
  chat(user, message) {
    console.log(user.getId(), message);
    // TODO: 모든 유저에게 채팅 로그 (닉네임 + 메시지) emit
  }

  // 아래는 자체 emit
  // emit: start_round / 모든 유저 / 문제, 각 캐릭터 위치, 제한 시간
  async _startRound() {
    if (this.quizList[this.currentRound] === undefined) {
      const newQuizList = await quizFinder.fetchQuizList();
      newQuizList.forEach((newQuiz) => { // 문제 추가할 때, 전에 냈던 문제이면 추가하지 않는 걸로
        if (this.quizList.find((oldQuiz) => oldQuiz.id === newQuiz.id)) return;
        this.quizList.push(newQuiz);
      });
    }
    this.currentQuiz = this.quizList[this.currentRound];
    this.currentTime = 0;

    const characterLocations = [];
    this.indexOfCharacters = this._getEmptyIndexMatrix();

    this.userList.forEach((user) => {
      const character = user.getCharacter();
      if (character.isPlaced() === false) return;

      this._placeCharacter(character);
      const [indexX, indexY] = character.getIndexes();
      characterLocations.push({ userId: user.getId(), indexX, indexY });
    });

    this.userList.forEach((user) => {
      user.emitStartRound({
        round: this.currentRound,
        question: this.currentQuiz.question,
        characterLocations,
        timeLimit: ROOM.TIME_LIMIT,
      });
    });

    this._countTime();
  }

  // emit: end_round / 모든 유저 / 정답, 오답 캐릭터 리스트
  _endRound() {
    this.currentRound += 1;
  }

  // emit: not_end_round / 모든 유저 / 정답, 재도전 안내
  // 현재 있어야하나, 고민 중...
  _notEndRound() {}

  // emit: end_game / 모든 유저 / 우승자 닉네임, 게임 상태, 모든 캐릭터 + 닉네임 + 위치
  _endGame() {
    this.isGameStarted = false;
  }

  /**
   * 유저의 캐릭터를 랜덤한 위치에 이동시키는 메서드
   */
  _placeCharacter(character) {
    const [indexX, indexY] = this._getRandomEmptyIndex();
    character.setIndexes(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = character;
  }

  /**
   * @returns {Boolean}
   */
  _isOwner(user) {
    const owner = this.userList[0];
    return owner === user;
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
        this.endRound();
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
      indexX = Math.floor(Math.random() * (ROOM.FILED_COLUMN));
      indexY = Math.floor(Math.random() * (ROOM.FILED_ROW));
    } while (this.indexOfCharacters[indexX][indexY]);
    return [indexX, indexY];
  }

  /**
   * @returns {Array.<Array.<number, number>>}
   */
  _getEmptyIndexMatrix() {
    return Array(ROOM.FILED_COLUMN).fill().map(() => Array(ROOM.FILED_ROW));
  }

  /**
   * @returns {Boolean}
   */
  _canBeMoved(newIndexX, newIndexY) {
    if (newIndexX < 0 || newIndexX >= ROOM.FILED_ROW) return false;
    if (newIndexY < 0 || newIndexY >= ROOM.FILED_COLUMN) return false;
    if (this.indexOfCharacters[newIndexX][newIndexY] !== undefined) return false;
    return true;
  }
}

export default Room;
