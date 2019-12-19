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
 * @property {Array.<Array.<object>>} indexOfCharacters
 * @property {Array.<stringr>} nicknameList
 * @property {Map<string, user>} aliveUsers
 * @property {Array.<object>} moveQueue
 * @property {boolean} isMoving
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
    const smallLength = adjList.length > nounList.length ? nounList.length : adjList.length;

    for (let idx = 0; idx < smallLength; idx += 1) {
      const nickname = `${adjList[idx].adj} ${nounList[idx].noun}`;
      this.nicknameList.push(nickname);
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
    return (this.isGameStarted === false) && (this.users.size < ROOM.MAX_USER);
  }

  isUserEntered(user) {
    if (user.isGuest()) return false;
    return this.users.has(user.getNickname());
  }

  isStarted() {
    return this.isGameStarted;
  }

  _broadcastPlayerNum() {
    const data = {
      numOfPlayer: this.aliveUsers.size,
      numOfViewer: this.users.size - this.aliveUsers.size,
    };
    this.users.forEach((user) => user.emitUpdatePlayerNum(data));
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
   *   timeLimit: ROOM.TIME_LIMIT_S - this.currentTime,
   *   isOwner: this._isOwner(user),
   * });
   */
  /**
   *
   * @param {User} user
   */
  async enterUser(user) {
    this._placeCharacter(user);

    if (this.nicknameList.length === 0) {
      await this._fetchRandomNickname();
    }

    if (user.isGuest()) {
      user.setNickname(this.nicknameList.shift());
    }

    this._acceptUser(user);
    this._broadcastNewUser(user);
    this._sendAllUsers(user);
    this._broadcastPlayerNum();
  }

  _acceptUser(user) {
    this.users.set(user.getNickname(), user);
    this.aliveUsers.set(user.getNickname(), user);
  }

  _broadcastNewUser(user) {
    const newUser = {
      isMine: false,
      nickname: user.getNickname(),
      ...user.getCharacter().getInfo(),
    };

    this.users.forEach((_user) => {
      if (user === _user) return;
      _user.emitEnterNewUser({ characterList: [newUser] });
    });
  }

  _sendAllUsers(user) {
    const characterList = this._makeCharacterList(user.getId());
    user.emitEnterRoom({
      characterList,
      isOwner: this._isOwner(user),
      roomName: this.name,
    });
  }

  _makeCharacterList(userId) {
    const characterList = [];

    this.users.forEach((user, nickname) => {
      const character = user.getCharacter();
      if (character.isPlaced() === false) return;

      const isMine = userId === user.getId();
      characterList.push({ isMine, nickname, ...character.getInfo() });
    });

    return characterList;
  }

  // emit: leave_user / 다른 유저 / 삭제할 캐릭터 + 닉네임
  leaveUser(user) {
    this._deleteCharacter(user);

    const nickname = user.getNickname();
    this._dropUser(nickname);

    this._broadcastLeaveUser(nickname);
    user.emitLeaveRoom();
    this._broadcastPlayerNum();
  }

  _deleteCharacter(user) {
    const character = user.getCharacter();
    if (character !== null && character.isPlaced()) {
      const [indexX, indexY] = character.getIndexes();
      this.indexOfCharacters[indexX][indexY] = undefined;
      user.deleteCharacter();
    }
  }

  _dropUser(nickname) {
    this.nicknameList.push(nickname);
    this.users.delete(nickname);
    this.aliveUsers.delete(nickname);
  }

  _broadcastLeaveUser(nickname) {
    const isAlive = this.aliveUsers.has(nickname);
    const characterList = [{ nickname, isAlive }];
    this.users.forEach((_user) => {
      _user.emitLeaveUser({ characterList, isOwner: this._isOwner(_user) });
    });
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
    this.moveQueue.push({ user, direction, isLoop: false });
    this.moveQueue.push({ user: nextUser, direction, isLoop: true });
    if (this.moveQueue.length > 0) {
      // eslint-disable-next-line no-shadow
      const { user, direction, isLoop } = this.moveQueue.shift();
      this.moveCharacter(user, direction, isLoop);
    }
  }

  // emit: move / 모든 유저 / 특정 캐릭터의 이동할 위치
  moveCharacter(user, direction, isLoop = false) {
    const character = user.getCharacter();

    if (character.isPlaced() === false) return;
    if (this.isMoving) {
      this.moveQueue.push({ user, direction, isLoop });
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
      this.moveQueue.push({ user, direction, isLoop });
    }

    this.isMoving = false;
    if (this.moveQueue.length > 0) {
      // eslint-disable-next-line no-shadow
      const { user, direction, isLoop } = this.moveQueue.shift();
      this.moveCharacter(user, direction, isLoop);
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
  _startRound() {
    if (this.aliveUsers.size === 0) {
      this._resurrectAllUser();
    }

    if (this.aliveUsers.size === 1) {
      this._endGame(this.aliveUsers);
      return;
    }

    this._prepareForNewRound();
    this._broadcastStartRound();
    this._broadcastPlayerNum();
    setTimeout(() => this._endRound(), ROOM.TIME_LIMIT * ROOM.SECOND_MS);
  }

  _resurrectAllUser() {
    this.aliveUsers = new Map(this.users);
  }

  _prepareForNewRound() {
    this.currentQuiz = this.quizList[this.currentRound];
    this.currentTime = 0;
  }

  _broadcastStartRound() {
    const characterList = this._teleportCharacters(this.aliveUsers);
    const { question } = this.currentQuiz;
    const timeLimit = ROOM.TIME_LIMIT;

    this.users.forEach((user) => user.emitStartRound({
      question, timeLimit, characterList,
    }));
  }

  _teleportCharacters(users) {
    this.isMoving = true;
    this.indexOfCharacters = this._getEmptyIndexMatrix();

    const characterList = [];
    users.forEach((user, nickname) => {
      const [indexX, indexY] = this._placeCharacter(user);
      characterList.push({ nickname, indexX, indexY });
    });

    this._clearMoveQueue();
    this.isMoving = false;

    return characterList;
  }

  // emit: end_round / 모든 유저 / 정답, 오답 캐릭터 리스트, 해설
  _endRound() {
    const dropUsers = this._checkCharactersLocation(this.currentQuiz.answer);
    const isSomeoneAlive = this.aliveUsers.size > dropUsers.length;

    if (isSomeoneAlive) this._killCharacter(dropUsers);
    this._broadcastEndRound(dropUsers);
    this._broadcastPlayerNum();

    if (this._isWhoWin()) {
      const winners = (
        (isSomeoneAlive || this._isLastRound())
          ? this.aliveUsers
          : this.users
      );
      setTimeout(() => this._endGame(winners), ROOM.WAITING_TIME_MS);
      return;
    }

    if (this._isLastRound()) {
      setTimeout(() => this._endGame(this.aliveUsers), ROOM.WAITING_TIME_MS);
      return;
    }

    setTimeout(() => this._startNextRound(), ROOM.WAITING_TIME_MS);
  }

  _broadcastEndRound(dropUsers) {
    const { comment, answer } = this.currentQuiz;
    const endRoundInfos = { comment, answer, characterList: dropUsers };

    this.users.forEach((user) => user.emitEndRound(endRoundInfos));
  }

  _killCharacter(dropUsers) {
    dropUsers.forEach(({ nickname }) => this.aliveUsers.delete(nickname));
  }

  _isWhoWin() {
    return this.aliveUsers.size === 1;
  }

  _isLastRound() {
    return this.currentRound === ROOM.MAX_ROUND;
  }

  _startNextRound() {
    this.currentRound += 1;
    this._startRound();
  }

  _checkCharactersLocation(answerSide) {
    const [dropStart, dropEnd] = (
      answerSide
        ? [FIELD.X_START, FIELD.X_END]
        : [FIELD.O_START, FIELD.O_END]);

    const dropUsers = [];
    const setDropUser = (nickname, i, j) => {
      dropUsers.push({ nickname });
      this.indexOfCharacters[i][j] = undefined;
    };

    this.aliveUsers.forEach((user, nickname) => {
      const character = user.getCharacter();
      const [indexX, indexY] = character.getIndexes();
      if (dropStart <= indexX && indexX < dropEnd) {
        setDropUser(nickname, indexX, indexY);
      }
    });

    return dropUsers;
  }

  // emit: end_game / 모든 유저 / 우승자 닉네임, 게임 상태, 모든 캐릭터 + 닉네임 + 위치
  _endGame(winners) {
    this._broadcastEndGame(winners);
    this._broadcastPlayerNum();
    setTimeout(() => this._resetGame(), ROOM.WAITING_TIME_MS);
  }

  _broadcastEndGame(winners) {
    const newWinners = winners.size === 0 ? this.users : winners;
    const characterList = this._teleportCharacters(newWinners);

    this.users.forEach((user) => user.emitEndGame({ characterList }));
  }

  _resetGame() {
    this._broadcastResetGame();
    this._resetGameData();
    this._broadcastPlayerNum();
  }

  _broadcastResetGame() {
    const characterList = this._teleportCharacters(this.users);
    this.users.forEach((user) => {
      const isOwner = this._isOwner(user);
      user.emitResetGame({ characterList, isOwner });
    });
  }

  _resetGameData() {
    this.isGameStarted = false;
    this.aliveUsers = new Map(this.users);
  }

  /**
   * 유저의 캐릭터를 랜덤한 위치에 이동시키는 메서드
   * @returns {Array.<number, number>}
   */
  _placeCharacter(user) {
    this.isMoving = true;
    const [indexX, indexY] = this._makeRandomIndexes();
    const character = user.getCharacter();
    character.setIndexes(indexX, indexY);
    this.indexOfCharacters[indexX][indexY] = user;
    this._clearMoveQueue();
    this.isMoving = false;
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
   * @returns {Array.<number, number>}
   */
  _makeRandomIndexes() {
    const indexX = Math.floor(Math.random() * ROOM.FIELD_COLUMN);
    const indexY = Math.floor(Math.random() * ROOM.FIELD_ROW);
    if (this.indexOfCharacters[indexX][indexY]) return this._makeRandomIndexes();
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
        newIndexX, newIndexY, canMove: false, nextUser: undefined,
      };
    }

    const isInField = (
      newIndexX >= 0
        && newIndexY >= 0
        && newIndexY < ROOM.FIELD_ROW
        && newIndexX < ROOM.FIELD_COLUMN
    );
    const nextUser = isInField ? this.indexOfCharacters[newIndexX][newIndexY] : undefined;
    const canMove = isInField && nextUser === undefined;

    return {
      newIndexX, newIndexY, canMove, nextUser,
    };
  }

  /**
   * @returns {Boolean}
   */
  _canBeStarted(user) {
    return (
      this.users.size > 1
        && this.users.size <= ROOM.MAX_USER
        && this._isOwner(user)
        && this.isGameStarted === false
    );
  }

  _clearMoveQueue() {
    this.moveQueue = [];
  }
}

export default Room;
