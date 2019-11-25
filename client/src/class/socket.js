/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import EVENT from '../constants/socket-event';

const _isFunction = (callback) => typeof callback === 'function';

class SocketContainer {
  constructor() {
    this.socket = undefined;
    this.connect();
  }

  connect() {
    this.socket = socketio.connect('http://localhost:3000');
  }

  disconnect() {
    this.socket.disconnect();
  }

  onEnterRoom(callback) {
    if (_isFunction(callback)) {
      this.socket.on(EVENT.ENTER_ROOM, (data) => callback(data));
    }
  }

  onEnterPlayer(callback) {
    if (_isFunction(callback)) {
      this.socket.on(EVENT.ENTER_PLAYER, (data) => callback(data));
    }
  }

  emitStartGame() {
    this.socket.emit(EVENT.START_GAME);
  }

  onQuizList(callback) {
    if (_isFunction(callback)) {
      this.socket.on(EVENT.FETCH_QUIZLIST, (data) => callback(data));
    }
  }
}

const socket = new SocketContainer();

export default socket;
