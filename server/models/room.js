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
 * @property {Array.<Array.<object>>} indexOfUsers
 * @property {Array.<stringr>} nicknameList
 * @property {Map<string, user>} aliveUsers
 * @property {Array.<object>} moveQueue
 * @property {boolean} isMoveLock
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
    this.indexOfUsers = this._getEmptyIndexMatrix();
    this.nicknameList = [];
    this.aliveUsers = new Map();
    this.moveQueue = [];
    this.isMoveLock = false;
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

  _lockMove() {
    this.isMoveLock = true;
  }

  _unlockMove() {
    this.isMoveLock = false;
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
    if (this.isGameStarted) {
      user.emitGoToLobby();
      return;
    }

    this._placeUser(user);
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
    const nickname = user.getNickname();
    user.setRoomId(this.id);
    this.users.set(nickname, user);
    this.aliveUsers.set(nickname, user);
  }

  _broadcastNewUser(user) {
    const newUser = {
      isMine: false,
      nickname: user.getNickname(),
      ...user.getCharacterInfo(),
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
      if (user.isPlaced() === false) return;

      const isMine = userId === user.getId();
      characterList.push({ isMine, nickname, ...user.getCharacterInfo() });
    });

    return characterList;
  }

  // emit: leave_user / 다른 유저 / 삭제할 캐릭터 + 닉네임
  leaveUser(user) {
    const nickname = user.getNickname();
    this._deleteUser(user, nickname);
    this._broadcastLeaveUser(nickname);
    user.emitLeaveRoom();
    this._broadcastPlayerNum();
  }

  _deleteUser(user, nickname) {
    if (user.isPlaced()) {
      const [indexX, indexY] = user.getIndexes();
      this.indexOfUsers[indexX][indexY] = undefined;
      user.deleteCharacter();
    }

    this.nicknameList.push(nickname);
    this.users.delete(nickname);
    this.aliveUsers.delete(nickname);
    user.deleteRoomId();
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
    if (user.isPlaced() === false) return;

    const oldIndexes = user.getIndexes();
    const newIndexes = this._makeNewIndexes(oldIndexes, direction);
    const { nextUser } = this._checkUserCanMove(newIndexes);

    if (nextUser === undefined) return;
    this._turnUser(user, direction);
    this._knockBackUser(nextUser, direction);

    if (this.moveQueue.length > 0) {
      this.moveUser(this.moveQueue.shift());
    }
  }

  _turnUser(user, direction) {
    this.moveQueue.push({ user, direction, isLoop: false });
  }

  _knockBackUser(user, direction) {
    this.moveQueue.push({ user, direction, isLoop: true });
  }

  // emit: move / 모든 유저 / 특정 캐릭터의 이동할 위치
  moveUser({ user, direction, isLoop = false }) {
    if (user.isPlaced() === false) return;
    if (this.isMoveLock) {
      this.moveQueue.push({ user, direction, isLoop });
      return;
    }

    this._lockMove();
    const canTurn = direction !== user.getDirection();
    const oldIndexes = user.getIndexes();
    const newIndexes = this._makeNewIndexes(oldIndexes, direction);
    const { canMove } = this._checkUserCanMove(newIndexes);
    const nickname = user.getNickname();
    user.setDirection(direction);

    if (canMove) this._updateIndexes(oldIndexes, newIndexes, user);
    if (canMove || canTurn) {
      const [newIndexX, newIndexY] = newIndexes;
      this.users.forEach((_user) => _user.emitMove({
        canMove, nickname, direction, newIndexX, newIndexY,
      }));
    }

    if (canMove && isLoop) {
      this.moveQueue.push({ user, direction, isLoop });
    }

    this._unlockMove();
    if (this.moveQueue.length > 0) {
      this.moveUser(this.moveQueue.shift());
    }
  }

  _updateIndexes(oldIndexes, newIndexes, user) {
    const [oldIndexX, oldIndexY] = oldIndexes;
    const [newIndexX, newIndexY] = newIndexes;

    this.indexOfUsers[oldIndexX][oldIndexY] = undefined;
    this.indexOfUsers[newIndexX][newIndexY] = user;
    user.setIndexes(newIndexX, newIndexY);
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
    const characterList = this._teleportUsers(this.aliveUsers);
    const { question } = this.currentQuiz;
    const timeLimit = ROOM.TIME_LIMIT;

    this.users.forEach((user) => user.emitStartRound({
      question, timeLimit, characterList,
    }));
  }

  _teleportUsers(users) {
    this._lockMove();
    this.indexOfUsers = this._getEmptyIndexMatrix();

    const characterList = [];
    users.forEach((user, nickname) => {
      const [indexX, indexY] = this._placeUser(user);
      characterList.push({ nickname, indexX, indexY });
    });

    this._clearMoveQueue();
    this._unlockMove();

    return characterList;
  }

  // emit: end_round / 모든 유저 / 정답, 오답 캐릭터 리스트, 해설
  _endRound() {
    const dropUsers = this._checkUsersLocation(this.currentQuiz.answer);
    const isSomeoneAlive = this.aliveUsers.size > dropUsers.length;

    if (isSomeoneAlive) this._killUser(dropUsers);
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

  _killUser(dropUsers) {
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

  _checkUsersLocation(answerSide) {
    const [dropStart, dropEnd] = (
      answerSide
        ? [FIELD.X_START, FIELD.X_END]
        : [FIELD.O_START, FIELD.O_END]);

    const dropUsers = [];
    const setDropUser = (nickname, i, j) => {
      dropUsers.push({ nickname });
      this.indexOfUsers[i][j] = undefined;
    };

    this.aliveUsers.forEach((user, nickname) => {
      const [indexX, indexY] = user.getIndexes();
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
    const characterList = this._teleportUsers(newWinners);

    this.users.forEach((user) => user.emitEndGame({ characterList }));
  }

  _resetGame() {
    this._broadcastResetGame();
    this._resetGameData();
    this._broadcastPlayerNum();
  }

  _broadcastResetGame() {
    const characterList = this._teleportUsers(this.users);
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
  _placeUser(user) {
    this._lockMove();
    const [indexX, indexY] = this._makeRandomIndexes();
    user.setIndexes(indexX, indexY);
    this.indexOfUsers[indexX][indexY] = user;
    this._clearMoveQueue();
    this._unlockMove();
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
    if (this.indexOfUsers[indexX][indexY]) return this._makeRandomIndexes();
    return [indexX, indexY];
  }

  /**
   * @returns {Array.<Array.<number, number>>}
   */
  _getEmptyIndexMatrix() {
    return Array(ROOM.FIELD_COLUMN).fill().map(() => Array(ROOM.FIELD_ROW));
  }

  _makeNewIndexes([indexX, indexY], direction) {
    switch (direction) {
      case DIRECTION.LEFT: return [indexX - 1, indexY];
      case DIRECTION.RIGHT: return [indexX + 1, indexY];
      case DIRECTION.UP: return [indexX, indexY - 1];
      case DIRECTION.DOWN: return [indexX, indexY + 1];
      default: return [indexX, indexY];
    }
  }

  _checkUserCanMove([indexX, indexY]) {
    const isInField = (
      indexX >= 0
        && indexY >= 0
        && indexX < ROOM.FIELD_COLUMN
        && indexY < ROOM.FIELD_ROW
    );
    const nextUser = isInField ? this.indexOfUsers[indexX][indexY] : undefined;
    const canMove = isInField && nextUser === undefined;
    return { canMove, nextUser };
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
