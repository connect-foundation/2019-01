/* eslint-disable no-underscore-dangle */
import Character from './character';
import quizFinder from '../database/quiz';

const FILED_ROW = 8;
const FILED_COLUMN = 16;
const SECOND = 1000; // 1s
const TIME_LIMIT = 60 * SECOND; // 60s

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
    this.userCharacterMap = new Map();
    this.indexOfCharacters = this._getEmptyIndexMatrix();
  }

  // 아래는 on에 대응한 emit

  // emit: enter_room / 자신 / (자신 포함) 모든 캐릭터 + 닉네임 + 위치,
  //                          게임 중이 아니라면, 게임 중인 여부, 방장 여부
  //                          게임 중이라면, 게임 중인 여부, 문제 + 남은 시간까지
  // emit: enter_new_player / 자신을 제외한 모든 유저 / 새로 추가된 유저의 캐릭터 + 닉네임 + 위치
  async enterUser(user) {
    const userId = user.getId();

    if (this.isGameStarted === false) {
      await this._giveCharacter(userId);
    }

    const characterList = [];
    const myCharacter = this.userCharacterMap.get(userId);
    this.userCharacterMap.forEach((_character, _userId) => {
      characterList.push({
        userId: _userId,
        isMine: _character === myCharacter,
        ..._character.getInfo(),
      });
    });

    this.userList.forEach((_user) => {
      _user.emitEnterNewUser({ ...myCharacter.getInfo() });
    });

    user.emitEnterRoom({
      characterList,
      isGameStarted: this.isGameStarted,
      question: this.currentQuiz.question,
      timeLimit: TIME_LIMIT - this.currentTime,
      isOwner: this._isOwner(userId),
    });

    this.userList.push(user);
  }

  // emit: leave_user / 다른 유저 / 삭제할 캐릭터 + 닉네임
  leaveUser(user) {
    const userId = user.getId();
    if (this.userCharacterMap.has(userId)) {
      const character = this.userCharacterMap.get(userId);
      const [indexX, indexY] = character.getIndexies();
      this.indexOfCharacters[indexX][indexY] = undefined;
      this.userCharacterMap.delete(userId);
    }

    const userIndex = this.userList.findIndex((_user) => user === _user);
    this.userList.splice(userIndex, 1);

    this.userList.forEach((_user) => _user.emitLeaveUser({ userId }));
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
    const character = this.userCharacterMap.get(user.getId());
    if (character === undefined) return;

    const [oldIndexX, oldIndexY] = character.getIndexies();
    let newIndexX = oldIndexX;
    let newIndexY = oldIndexY;

    switch (direction) {
      case 'left': newIndexX -= 1; break;
      case 'right': newIndexX += 1; break;
      case 'up': newIndexY -= 1; break;
      case 'down': newIndexY += 1; break;
      default:
    }

    const userId = user.getId();
    if (this._canBeMoved(newIndexX, newIndexY)) {
      this.indexOfCharacters[oldIndexX][oldIndexY] = undefined;
      this.indexOfCharacters[newIndexX][newIndexY] = character;
      character.setIndexies(newIndexX, newIndexY);

      user.emitMove({ userId, indexX: newIndexX, indexY: newIndexY });
    } else {
      user.emitMove({ userId, indexX: oldIndexX, indexY: oldIndexY });
    }
  }

  // emit: chat_message / 모든 유저 / 채팅 로그 (닉네임 + 메시지)
  chat(user, message) {
    console.log(user.getId(), message);
    // TODO: 모든 유저에게 채팅 로그 (닉네임 + 메시지) emit
  }

  // 아래는 자체 emit
  // emit: start_round / 모든 유저 / 문제, 각 캐릭터 위치, 제한 시간
  async _startRound() {
    if (this.quizList.length === 0) {
      this.quizList = await quizFinder.fetchQuizList();
    }
    this.currentQuiz = this.quizList.shift();
    this.currentTime = 0;

    const characterLocations = [];
    this.indexOfCharacters = this._getEmptyIndexMatrix();
    this.userCharacterMap.forEach((character, userId) => {
      this._placeCharacter(character);
      const [indexX, indexY] = character.getIndexies();
      characterLocations.push({ userId, indexX, indexY });
    });

    this.userList.forEach((user) => {
      user.emitStartRound({
        round: this.currentRound,
        question: this.currentQuiz.question,
        characterLocations,
        timeLimit: TIME_LIMIT,
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

  async _giveCharacter(userId) {
    const character = new Character();
    await character.setCharacterUrl();
    this.userCharacterMap.set(userId, character);
    this._placeCharacter(character);
  }

  _placeCharacter(character) {
    const [indexX, indexY] = this._getRandomEmptyIndex();
    character.setIndexies(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = character;
  }

  _isOwner(userId) {
    const ownerId = this.userCharacterMap.keys().next().value;
    return ownerId === userId;
  }

  _countTime() {
    setTimeout(() => {
      this.currentTime += 1;
      if (this.currentTime < TIME_LIMIT) {
        this._countTime();
      } else {
        this.endRound();
      }
    }, SECOND);
  }

  _getRandomEmptyIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (FILED_COLUMN));
      indexY = Math.floor(Math.random() * (FILED_ROW));
    } while (this.indexOfCharacters[indexX][indexY]);
    return [indexX, indexY];
  }

  _getEmptyIndexMatrix() {
    return Array(FILED_COLUMN).fill().map(() => Array(FILED_ROW));
  }

  _canBeMoved(newIndexX, newIndexY) {
    if (newIndexX < 0 || newIndexX >= FILED_ROW) return false;
    if (newIndexY < 0 || newIndexY >= FILED_COLUMN) return false;
    if (this.indexOfCharacters[newIndexX][newIndexY] !== undefined) return false;
    return true;
  }
}

export default Room;
