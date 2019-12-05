/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import { useHistory } from 'react-router-dom';
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
    if (this.isConnected) this.socket.disconnect();
  }

  emitCreateRoom(roomName) {
    if (this.isConnected) this.socket.emit(EVENT.CREATE_ROOM, roomName);
  }

  emitStartGame() {
    if (this.isConnected) this.socket.emit(EVENT.START_GAME);
  }

  emitMove(direction) {
    if (this.isConnected) this.socket.emit(EVENT.MOVE, direction);
  }

  emitEnterRoom(data) {
    if (this.isConnected) this.socket.emit(EVENT.ENTER_ROOM, data);
  }

  emitLeaveRoom() {
    if (this.isConnected) this.socket.emit(EVENT.LEAVE_ROOM);
  }

  emitChatMessage(data) {
    if (this.isConnected) this.socket.emit(EVENT.CHAT_MESSAGE, data);
  }

  onRoomInfos(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.ROOM_INFOS, (data) => callback(data));
    }
  }

  onCreateRoom(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.CREATE_ROOM, (data) => callback(data));
    }
  }

  onEnterRoom(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.ENTER_ROOM, (data) => callback(data));
    }
  }

  onEnterNewUser(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.ENTER_NEW_USER, (data) => callback(data));
    }
  }

  onMove(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.MOVE, (data) => callback(data));
    }
  }

  onStartRound(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.START_ROUND, (data) => callback(data));
    }
  }

  onEndRound(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.END_ROUND, (data) => callback(data));
    }
  }

  onEndGame(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.END_GAME, (data) => callback(data));
    }
  }

  onQuizList(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.FETCH_QUIZLIST, (data) => callback(data));
    }
  }

  onLeaveUser(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.LEAVE_USER, (data) => callback(data));
    }
  }

  onStartGame(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.START_GAME, (data) => callback(data));
    }
  }

  onLeaveRoom(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.LEAVE_ROOM, (data) => callback(data));
    }
  }

  onChatMessage(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.CHAT_MESSAGE, (data) => callback(data));
    }
  }

  onDisconnect(callback) {
    if (isFunction(callback) && this.isConnected) {
      this.socket.on(EVENT.DISCONNECT, () => callback());
    }
  }
}

const socket = new SocketContainer();

export default socket;
