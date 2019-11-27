/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import EVENT from '../constants/socket-event';

const isFunction = (callback) => typeof callback === 'function';

class SocketContainer {
  constructor() {
    this.socket = undefined;
    this.url = process.env.NODE_ENV === 'production' ? 'http://localhost/socket.io' : 'http://localhost:3000';
    this.connect();
  }

  connect() {
    this.socket = socketio.connect('http://localhost:3000', { transports: ['websocket'] });
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitStartGame() {
    this.socket.emit(EVENT.START_GAME);
  }

  emitMove(direction) {
    this.socket.emit(EVENT.MOVE, direction);
  }

  emitEnterRoom(data) {
    this.socket.emit(EVENT.ENTER_ROOM, data);
  }

  onRoomInfos(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.ROOM_INFOS, (data) => callback(data));
    }
  }

  onEnterRoom(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.ENTER_ROOM, (data) => callback(data));
    }
  }

  onEnterNewUser(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.ENTER_NEW_USER, (data) => callback(data));
    }
  }

  onMove(callback) {
    this.socket.on(EVENT.MOVE, (data) => callback(data));
  }

  onQuizList(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.FETCH_QUIZLIST, (data) => callback(data));
    }
  }

  onLeaveUser(callback) {
    if (isFunction(callback)) {
      this.socket.on(EVENT.LEAVE_USER, (data) => callback(data));
    }
  }
}

const socket = new SocketContainer();

export default socket;
