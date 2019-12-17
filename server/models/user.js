import EVENT from '../constants/socket-event';
import { isFunction } from '../util';

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
    this.character = null;
    this.roomId = null;
    this.guest = this.nickname === undefined;
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

  getCharacter() {
    return this.character;
  }

  setCharacter(character) {
    this.character = character;
  }

  deleteCharacter() {
    this.character = null;
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

  onEndGame(callback) {
    if (isFunction(callback) === false) return;
    this.socket.on(EVENT.END_GAME, (roomId) => callback(roomId));
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
}

export default User;
