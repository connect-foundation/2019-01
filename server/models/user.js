import EVENT from '../constants/socket-event';
import { isFunction } from '../util';
import imageFinder from '../database/image';

/**
 * User Class
 * socket을 받아서 감싸줘서 user로 내보낸다.
 * @property {string} id
 * @property {object} socket
 * @property {string} nickname
 * @property {Character} character
 * @property {number} roomId
 */
class User {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.nickname = socket.handshake.query.githubId;
    this.roomId = null;
    this.guest = this.nickname === undefined;
    this.characterUrl = null;
    this.indexX = null;
    this.indexY = null;
    this.direction = 0;
  }

  /**
   * 넘겨받은 좌표를 instance내 좌표에 할당함
   * @param {number} indexX
   * @param {number} indexY
   */
  setIndexes(indexX, indexY) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  /**
   * 현재 위치 좌표를 반환
   * @returns {array.<number, number>}
   */
  getIndexes() {
    return [this.indexX, this.indexY];
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  /**
   * 캐릭터가 놓여져 있는지 아닌지를 반환하는 함수
   * @returns {Boolean}
   */
  isPlaced() {
    return this.indexX !== null && this.indexY !== null;
  }

  /**
   * 랜덤한 캐릭터 이미지를 데이터베이스로부터 가져와서
   * 자신의 url에 할당한다.
   */
  async setCharacterUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.characterUrl = image.url;
  }

  /**
   * @returns {{url:string, indexX: number, indexY: number}}
   */
  getCharacterInfo() {
    return {
      url: this.characterUrl,
      indexX: this.indexX,
      indexY: this.indexY,
    };
  }

  isGuest() {
    return this.guest;
  }

  getNickname() {
    return this.nickname;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  getId() {
    return this.id;
  }

  deleteCharacter() {
    this.characterUrl = null;
    this.indexX = null;
    this.indexY = null;
    this.direction = 0;
  }

  isInLobby() {
    return this.roomId === null;
  }

  getRoomId() {
    return this.roomId;
  }

  /**
   *
   * @param {Function} callback
   */
  onEnterLobby(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.ENTER_LOBBY, () => {
      callback();
      this.roomId = null;
    });
  }

  onKnockRoom(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.KNOCK_ROOM, (roomId) => {
      callback(roomId);
      this.roomId = null;
    });
  }

  onEnterRoom(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.ENTER_ROOM, (roomId) => {
      callback(roomId);
      this.roomId = roomId;
    });
  }

  onCreateRoom(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.CREATE_ROOM, (roomName) => callback(roomName));
  }

  onLeaveRoom(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.LEAVE_ROOM, () => {
      callback();
      this.roomId = null;
    });
  }

  onStartGame(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.START_GAME, () => callback());
  }

  onReadyRoom(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.READY_ROOM, (roomId) => callback(roomId));
  }

  onMove(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.MOVE, (direction) => callback(direction));
  }

  onUseSkill(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.USE_SKILL, (direction) => callback(direction));
  }

  onChatMessage(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.CHAT_MESSAGE, (message) => callback(message));
  }

  onDisconnecting(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.DISCONNECT, () => callback());
  }

  emitEnterLobby(data) {
    this.socket.emit(EVENT.ENTER_LOBBY, data);
  }

  emitCreateRoom(data) {
    this.socket.emit(EVENT.CREATE_ROOM, data);
  }

  emitRoomIsCreated(data) {
    this.socket.emit(EVENT.ROOM_IS_CREATED, data);
  }

  emitUpdateRoomInfo(data) {
    this.socket.emit(EVENT.UPDATE_ROOM_INFO, data);
  }

  emitKnockRoom(data) {
    this.socket.emit(EVENT.KNOCK_ROOM, data);
  }

  emitEnterRoom(data) {
    this.socket.emit(EVENT.ENTER_ROOM, data);
  }

  emitEnterNewUser(data) {
    this.socket.emit(EVENT.ENTER_NEW_USER, data);
  }

  emitLeaveUser(data) {
    this.socket.emit(EVENT.LEAVE_USER, data);
  }

  emitStartRound(data) {
    this.socket.emit(EVENT.START_ROUND, data);
  }

  emitEndRound(data) {
    this.socket.emit(EVENT.END_ROUND, data);
  }

  emitEndGame(data) {
    this.socket.emit(EVENT.END_GAME, data);
  }

  emitResetGame(data) {
    this.socket.emit(EVENT.RESET_GAME, data);
  }

  emitMove(data) {
    this.socket.emit(EVENT.MOVE, data);
  }

  emitChatMessage(data) {
    this.socket.emit(EVENT.CHAT_MESSAGE, data);
  }

  emitStartGame() {
    this.socket.emit(EVENT.START_GAME);
  }

  emitLeaveRoom() {
    this.socket.emit(EVENT.LEAVE_ROOM);
  }

  emitUpdatePlayerNum(data) {
    this.socket.emit(EVENT.UPDATE_PLAYER_NUM, data);
  }
}

export default User;
