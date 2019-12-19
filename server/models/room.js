/* eslint-disable no-underscore-dangle */
import nicknameFinder from '../database/nickname';
import quizFinder from '../database/quiz';
import { ROOM, DIRECTION, FIELD } from '../constants/room';

/**
 * Room Class
 * @property {String} id
 * @property {string} name
 * @property {boolean} isGameStarted
 * @property {Object[]} quizList
 * @property {Object} currentQuiz
 * @property {number} currentRound
 * @property {Map.<string, User>} users
 * @property {Array.<Array.<User>>} indexOfUsers
 * @property {Array.<string>} nicknameList
 * @property {Map.<string, User>} aliveUsers
 * @property {Array.<object>} moveQueue
 * @property {boolean} isMoveLock
 */
class Room {
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isGameStarted = false;
    this.quizList = [];
    this.currentQuiz = {};
    this.currentRound = 0;
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

  /**
   * @returns {number}
   */
  getNumOfUsers() {
    return this.users.size;
  }

  /**
   * @returns {boolean}
   */
  isEnterable() {
    return (this.isGameStarted === false) && (this.users.size < ROOM.MAX_USER);
  }

  /**
   * @param {User} user
   * @returns {boolean}
   */
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

  /**
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

  /**
   * @param {User} user
   */
  _acceptUser(user) {
    const nickname = user.getNickname();
    user.setRoomId(this.id);
    this.users.set(nickname, user);
    this.aliveUsers.set(nickname, user);
  }

  /**
   * @param {User} user
   */
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

  /**
   * @param {User} user
   */
  _sendAllUsers(user) {
    const characterList = this._makeCharacterList(user.getId());
    user.emitEnterRoom({
      characterList,
      isOwner: this._isOwner(user),
      roomName: this.name,
    });
  }

  /**
   * @param {string} userId
   */
  _makeCharacterList(userId) {
    const characterList = [];

    this.users.forEach((user, nickname) => {
      if (user.isPlaced() === false) return;

      const isMine = userId === user.getId();
      characterList.push({ isMine, nickname, ...user.getCharacterInfo() });
    });

    return characterList;
  }

  /**
   * @param {User} user
   */
  leaveUser(user) {
    const nickname = user.getNickname();
    this._deleteUser(user, nickname);
    this._broadcastLeaveUser(nickname);
    user.emitLeaveRoom();
    this._broadcastPlayerNum();
  }

  /**
   * @param {User} user
   * @param {string} nickname
   */
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

  /**
   * @param {string} nickname
   */
  _broadcastLeaveUser(nickname) {
    const isAlive = this.aliveUsers.has(nickname);
    const characterList = [{ nickname, isAlive }];
    this.users.forEach((_user) => {
      _user.emitLeaveUser({ characterList, isOwner: this._isOwner(_user) });
    });
  }

  /**
   * @param {User} user
   * @returns {boolean}
   */
  async startGame(user) {
    if (this._canBeStarted(user) === false) return false;

    this.isGameStarted = true;
    this.currentRound = 0;
    this.quizList = await quizFinder.fetchQuizList();
    this.users.forEach((_user) => _user.emitStartGame());

    setTimeout(() => this._startRound(), ROOM.READY_TIME_MS);
    return true;
  }

  /**
   * @param {User} user
   * @param {number} direction
   */
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

  /**
   * @param {User} user
   * @param {number} direction
   */
  _turnUser(user, direction) {
    this.moveQueue.push({ user, direction, isLoop: false });
  }

  /**
   * @param {User} user
   * @param {number} direction
   */
  _knockBackUser(user, direction) {
    this.moveQueue.push({ user, direction, isLoop: true });
  }

  /**
   * @param {Object} param0
   * @param {User} param0.user
   * @param {number} param0.direction
   * @param {boolean} param0.isLoop
   */
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

  /**
   * @param {Array.<number>} oldIndexes
   * @param {Array.<number>} newIndexes
   * @param {User} user
   */
  _updateIndexes(oldIndexes, newIndexes, user) {
    const [oldIndexX, oldIndexY] = oldIndexes;
    const [newIndexX, newIndexY] = newIndexes;

    this.indexOfUsers[oldIndexX][oldIndexY] = undefined;
    this.indexOfUsers[newIndexX][newIndexY] = user;
    user.setIndexes(newIndexX, newIndexY);
  }

  /**
   * @param {User} user
   * @param {string} message
   */
  chat(user, message) {
    const nickname = user.getNickname();
    this.users.forEach((_user) => _user.emitChatMessage({ nickname, message }));
  }

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
  }

  _broadcastStartRound() {
    const characterList = this._teleportUsers(this.aliveUsers);
    const { question } = this.currentQuiz;
    const timeLimit = ROOM.TIME_LIMIT;

    this.users.forEach((user) => user.emitStartRound({
      question, timeLimit, characterList,
    }));
  }

  /**
   * @param {Map.<string, User>} users
   * @returns {Array.<Object>}
   */
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

  /**
   * @param {Array.<Object>} dropUsers
   */
  _broadcastEndRound(dropUsers) {
    const { comment, answer } = this.currentQuiz;
    const endRoundInfos = { comment, answer, characterList: dropUsers };

    this.users.forEach((user) => user.emitEndRound(endRoundInfos));
  }

  /**
   * @param {Array.<Object>} dropUsers
   */
  _killUser(dropUsers) {
    dropUsers.forEach(({ nickname }) => this.aliveUsers.delete(nickname));
  }

  /**
   * @returns {boolean}
   */
  _isWhoWin() {
    return this.aliveUsers.size === 1;
  }

  /**
   * @returns {boolean}
   */
  _isLastRound() {
    return this.currentRound === ROOM.MAX_ROUND;
  }

  _startNextRound() {
    this.currentRound += 1;
    this._startRound();
  }

  /**
   * @param {boolean} answerSide
   * @returns {Array.<Object>}
   */
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

  /**
   * @param {Map.<string, User>} winners
   */
  _endGame(winners) {
    this._broadcastEndGame(winners);
    this._broadcastPlayerNum();
    setTimeout(() => this._resetGame(), ROOM.WAITING_TIME_MS);
  }

  /**
   * @param {Map.<string, User>} winners
   */
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
   * @param {User} user
   * @returns {Array.<number>}
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
   * @param {User} user
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
   * @returns {Array.<Array.<User>>}
   */
  _getEmptyIndexMatrix() {
    return Array(ROOM.FIELD_COLUMN).fill().map(() => Array(ROOM.FIELD_ROW));
  }

  /**
   * @param {Array.<number>} param0
   * @param {number} param0.indexX
   * @param {number} param0.indexY
   * @param {number} direction
   * @returns {Array.<number>}
   */
  _makeNewIndexes([indexX, indexY], direction) {
    switch (direction) {
      case DIRECTION.LEFT: return [indexX - 1, indexY];
      case DIRECTION.RIGHT: return [indexX + 1, indexY];
      case DIRECTION.UP: return [indexX, indexY - 1];
      case DIRECTION.DOWN: return [indexX, indexY + 1];
      default: return [indexX, indexY];
    }
  }

  /**
   * @param {Array.<number>} param0
   * @param {number} param0.indexX
   * @param {number} param0.indexY
   * @returns {{ canMove: boolean, nextUser: User }}
   */
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
   * @param {User} user
   * @returns {boolean}
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
