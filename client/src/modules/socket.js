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

  emitReadyRoom(roomId) {
    this._emit(EVENT.READY_ROOM, roomId);
  }

  emitMove(direction) {
    this._emit(EVENT.MOVE, direction);
  }

  emitUseSkill(direction) {
    this._emit(EVENT.USE_SKILL, direction);
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

  onResetGame(callback) {
    this._on(EVENT.RESET_GAME, callback);
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

  onUpdatePlayerNum(callback) {
    this._on(EVENT.UPDATE_PLAYER_NUM, callback);
  }

  _off(eventName) {
    if (this.socket === undefined) return;
    this.socket.off(eventName);
  }

  offEnterLobby() {
    this._off(EVENT.ENTER_LOBBY);
  }

  offCreateRoom() {
    this._off(EVENT.CREATE_ROOM);
  }

  offRoomIsCreated() {
    this._off(EVENT.ROOM_IS_CREATED);
  }

  offUpdateRoomInfo() {
    this._off(EVENT.UPDATE_ROOM_INFO);
  }

  offKnockRoom() {
    this._off(EVENT.KNOCK_ROOM);
  }

  offStartGame() {
    this._off(EVENT.START_GAME);
  }

  offEndGame() {
    this._off(EVENT.END_GAME);
  }

  offResetGame() {
    this._off(EVENT.RESET_GAME);
  }

  offStartRound() {
    this._off(EVENT.START_ROUND);
  }

  offEndRound() {
    this._off(EVENT.END_ROUND);
  }

  offLeaveUser() {
    this._off(EVENT.LEAVE_USER);
  }

  offEnterRoom() {
    this._off(EVENT.ENTER_ROOM);
  }

  offEnterNewUser() {
    this._off(EVENT.ENTER_NEW_USER);
  }

  offMove() {
    this._off(EVENT.MOVE);
  }

  offLeaveRoom() {
    this._off(EVENT.LEAVE_ROOM);
  }

  offChatMessage() {
    this._off(EVENT.CHAT_MESSAGE);
  }

  offUpdatePlayerNum() {
    this._off(EVENT.UPDATE_PLAYER_NUM);
  }
}

const socket = new SocketContainer();

export default socket;
