/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import EVENT from '../constants/socket-event';

class SocketContainer {
  constructor() {
    this.socket = undefined;
    // this.connect();
  }

  connect() {
    this.socket = socketio.connect('http://localhost:3000');
  }

  disconnect() {
    this.socket.disconnect();
  }

  onEnterRoom(callback) {
    this.socket.on(EVENT.ENTER_ROOM, (data) => callback(data));
  }

  onEnterPlayer(callback) {
    this.socket.on(EVENT.ENTER_PLAYER, (data) => callback(data));
  }
}

const socket = new SocketContainer();

export default socket;
