import EVENT from '../constants/socket-event';

class User {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.nickname = null;
    this.character = null;
    this.isInLobby = true;
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

  getIsInLobby() {
    return this.isInLobby;
  }

  getRoomId() {
    return this.roomId;
  }

  onEnterLobby() {
    this.isInLobby = true;
  }

  onEnterRoom(callback) {
    this.socket.on(EVENT.ENTER_ROOM, (roomId) => {
      callback(roomId);
      this.roomId = roomId;
      this.isInLobby = false;
    });
  }

  onLeaveRoom(callback) {
    this.socket.on(EVENT.LEAVE_ROOM, () => {
      callback();
      this.roomId = null;
      this.isInLobby = true;
    });
  }

  onStartGame(callback) {
    this.socket.on(EVENT.START_GAME, () => callback());
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
}

export default User;
