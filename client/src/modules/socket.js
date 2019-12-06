/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import EVENT from '../constants/socket-event';
import URL from '../constants/url';

const isFunction = (callback) => typeof callback === 'function';

class SocketContainer {
  constructor() {
    this.socket = undefined;
  }

  connect(query) {
    this.socket = (
      process.env.NODE_ENV === 'production'
        ? socketio({
          path: '/socket.io', transports: ['websocket'], query, reconnection: false,
        })
        : socketio(URL.LOCAL_API_SERVER, {
          transports: ['websocket'], query, reconnection: false,
        }));
  }

  isConnected() {
    return (this.socket !== undefined && this.socket.connected);
  }

  disconnect() {
    if (this.isConnected()) this.socket.disconnect();
  }

  emitCreateRoom(roomName) {
    if (this.isConnected()) this.socket.emit(EVENT.CREATE_ROOM, roomName);
  }

  emitStartGame() {
    if (this.isConnected()) this.socket.emit(EVENT.START_GAME);
  }

  emitMove(direction) {
    if (this.isConnected()) this.socket.emit(EVENT.MOVE, direction);
  }

  emitEnterLobby() {
    this.socket.emit(EVENT.ENTER_LOBBY);
  }

  emitEnterRoom(data) {
    if (this.isConnected()) this.socket.emit(EVENT.ENTER_ROOM, data);
  }

  emitLeaveRoom() {
    if (this.isConnected()) this.socket.emit(EVENT.LEAVE_ROOM);
  }

  emitChatMessage(data) {
    if (this.isConnected()) this.socket.emit(EVENT.CHAT_MESSAGE, data);
  }

  emitEndGame(data) {
    this.socket.emit(EVENT.END_GAME, data);
  }

  onEnterLobby(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.ENTER_LOBBY, (data) => callback(data));
    }
  }

  onCreateRoom(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.CREATE_ROOM, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onRoomIsCreated(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.ROOM_IS_CREATED, (data) => callback(data));
    }
  }

  onUpdateRoomInfo(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.UPDATE_ROOM_INFO, (data) => callback(data));
    }
  }

  onEnterRoom(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.ENTER_ROOM, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onEnterNewUser(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.ENTER_NEW_USER, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onMove(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.MOVE, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onStartRound(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.START_ROUND, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onEndRound(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.END_ROUND, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onEndGame(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.END_GAME, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onQuizList(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.FETCH_QUIZLIST, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onLeaveUser(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.LEAVE_USER, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onStartGame(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.START_GAME, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onLeaveRoom(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.LEAVE_ROOM, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onChatMessage(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.CHAT_MESSAGE, (data) => {
        if (this.isConnected()) callback(data);
      });
    }
  }

  onDisconnect(callback) {
    if (this.socket === undefined) return;

    if (isFunction(callback)) {
      this.socket.on(EVENT.DISCONNECT, (data) => callback(data));
    }
  }
}

const socket = new SocketContainer();

export default socket;
