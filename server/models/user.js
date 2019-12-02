import EVENT from '../constants/socket-event';

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
    this.nickname = null;
    this.character = null;
    this.roomId = null;
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

  onEnterLobby() {
    this.roomId = null;
  }

  onEnterRoom(callback) {
    this.socket.on(EVENT.ENTER_ROOM, (roomId) => {
      callback(roomId);
      this.roomId = roomId;
    });
  }

  onLeaveRoom(callback) {
    this.socket.on(EVENT.LEAVE_ROOM, () => {
      callback();
      this.roomId = null;
    });
  }

  onStartGame(callback) {
    this.socket.on(EVENT.START_GAME, () => {
      console.log('on start game');
      callback();
    });
  }

  onMove(callback) {
    this.socket.on(EVENT.MOVE, (direction) => callback(direction));
  }

  onChatMessage(callback) {
    this.socket.on(EVENT.CHAT_MESSAGE, (message) => callback(message));
  }

  onDisconnecting(callback) {
    this.socket.on(EVENT.DISCONNECT, () => callback());
  }

  emitRoomInfos(data) {
    this.socket.emit(EVENT.ROOM_INFOS, data);
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

  emitNotEndRound(data) {
    this.socket.emit(EVENT.NOT_END_ROUND, data);
  }

  emitEndGame(data) {
    this.socket.emit(EVENT.END_GAME, data);
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
}

export default User;
