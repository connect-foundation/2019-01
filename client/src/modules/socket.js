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
          path: '/socket.io', transports: ['websocket'], query, reconnection: false, secure: true,
        })
        : socketio(URL.LOCAL_API_SERVER, {
          transports: ['websocket'], query, reconnection: false,
        }));
  }

  isConnected() {
    return this.socket !== undefined && this.socket.connected;
  }

  disconnect() {
    if (this.isConnected()) this.socket.disconnect();
  }

  _emit(eventName, data, strongCheck = true) {
    if (this.isConnected() === false && strongCheck) return;
    this.socket.emit(eventName, data);
  }

  emitCreateRoom(roomName) {
    this._emit(EVENT.CREATE_ROOM, roomName);
  }

  emitStartGame() {
    this._emit(EVENT.START_GAME);
  }

  emitMove(direction) {
    this._emit(EVENT.MOVE, direction);
  }

  emitEnterLobby() {
    this._emit(EVENT.ENTER_LOBBY, undefined, false);
  }

  emitKnockRoom(roomId) {
    this._emit(EVENT.KNOCK_ROOM, roomId);
  }

  emitEnterRoom(roomId) {
    this._emit(EVENT.ENTER_ROOM, roomId);
  }

  emitLeaveRoom() {
    this._emit(EVENT.LEAVE_ROOM);
  }

  emitChatMessage(message) {
    this._emit(EVENT.CHAT_MESSAGE, message);
  }

  emitEndGame(roomId) {
    this._emit(EVENT.END_GAME, roomId);
  }

  _on(eventName, callback) {
    if (this.socket === undefined) return;
    if (isFunction(callback) === false) return;
    this.socket.on(eventName, (data) => callback(data));
  }

  onEnterLobby(callback) {
    this._on(EVENT.ENTER_LOBBY, callback);
  }

  onCreateRoom(callback) {
    this._on(EVENT.CREATE_ROOM, callback);
  }

  onRoomIsCreated(callback) {
    this._on(EVENT.ROOM_IS_CREATED, callback);
  }

  onUpdateRoomInfo(callback) {
    this._on(EVENT.UPDATE_ROOM_INFO, callback);
  }

  onKnockRoom(callback) {
    this._on(EVENT.KNOCK_ROOM, callback);
  }

  onEnterRoom(callback) {
    this._on(EVENT.ENTER_ROOM, callback);
  }

  onEnterNewUser(callback) {
    this._on(EVENT.ENTER_NEW_USER, callback);
  }

  onMove(callback) {
    this._on(EVENT.MOVE, callback);
  }

  onStartRound(callback) {
    this._on(EVENT.START_ROUND, callback);
  }

  onEndRound(callback) {
    this._on(EVENT.END_ROUND, callback);
  }

  onEndGame(callback) {
    this._on(EVENT.END_GAME, callback);
  }

  onQuizList(callback) {
    this._on(EVENT.FETCH_QUIZLIST, callback);
  }

  onLeaveUser(callback) {
    this._on(EVENT.LEAVE_USER, callback);
  }

  onStartGame(callback) {
    this._on(EVENT.START_GAME, callback);
  }

  onLeaveRoom(callback) {
    this._on(EVENT.LEAVE_ROOM, callback);
  }

  onChatMessage(callback) {
    this._on(EVENT.CHAT_MESSAGE, callback);
  }

  onDisconnect(callback) {
    this._on(EVENT.DISCONNECT, callback);
  }
}

const socket = new SocketContainer();

export default socket;
