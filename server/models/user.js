/* eslint-disable no-underscore-dangle */
import EVENT from '../constants/socket-event';
import { isFunction } from '../util';
import imageFinder from '../database/image';

/**
 * User Class
 * @property {string} id
 * @property {Object} socket
 * @property {string} nickname
 * @property {string} roomId
 * @property {boolean} guest
 * @property {string} characterUrl
 * @property {number} indexX
 * @property {number} indexY
 * @property {number} direction
 */
class User {
  constructor(socket) {
    this.id = socket.id;
    this.socket = socket;
    this.nickname = socket.handshake.query.githubId;
    this.roomId = null;
    this.guest = this.nickname === undefined;
    this.characterUrl = null;
    this.indexX = null;
    this.indexY = null;
    this.direction = 0;
  }

  getId() {
    return this.id;
  }

  getNickname() {
    return this.nickname;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  getRoomId() {
    return this.roomId;
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  deleteRoomId() {
    this.roomId = null;
  }

  isGuest() {
    return this.guest;
  }

  getCharacterUrl() {
    return this.characterUrl;
  }

  async setCharacterUrl() {
    const [image] = await imageFinder.fetchRandomCharacter();
    this.characterUrl = image.url;
  }

  getIndexes() {
    return [this.indexX, this.indexY];
  }

  setIndexes(indexX, indexY) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  deleteCharacterInfo() {
    this.characterUrl = null;
    this.indexX = null;
    this.indexY = null;
  }

  /**
   * @returns {boolean}
   */
  isPlaced() {
    return this.indexX !== null && this.indexY !== null;
  }

  /**
   * @returns {boolean}
   */
  isInLobby() {
    return this.roomId === null;
  }

  /**
   * @returns {boolean}
   */
  isConnected() {
    return this.socket !== undefined && this.socket.connected;
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   */
  _on(eventName, callback) {
    if (this.socket === undefined) return;
    if (isFunction(callback) === false) return;
    this.socket.on(eventName, (data) => {
      console.log('on fire', eventName);
      callback(data);
    });
  }

  onEnterLobby(callback) {
    this._on(EVENT.ENTER_LOBBY, callback);
  }

  onKnockRoom(callback) {
    this._on(EVENT.KNOCK_ROOM, callback);
  }

  onEnterRoom(callback) {
    this._on(EVENT.ENTER_ROOM, callback);
  }

  onCreateRoom(callback) {
    this._on(EVENT.CREATE_ROOM, callback);
  }

  onLeaveRoom(callback) {
    this._on(EVENT.LEAVE_ROOM, callback);
  }

  onStartGame(callback) {
    this._on(EVENT.START_GAME, callback);
  }

  onReadyRoom(callback) {
    this._on(EVENT.READY_ROOM, callback);
  }

  onMove(callback) {
    this._on(EVENT.MOVE, callback);
  }

  onUseSkill(callback) {
    this._on(EVENT.USE_SKILL, callback);
  }

  onChatMessage(callback) {
    this._on(EVENT.CHAT_MESSAGE, callback);
  }

  onDisconnecting(callback) {
    this._on(EVENT.DISCONNECT, callback);
  }

  /**
   * @param {string} eventName
   * @param {Object} data
   */
  _emit(eventName, data) {
    if (this.isConnected() === false) return;
    this.socket.emit(eventName, data);
    console.log('emit', eventName);
  }

  emitEnterLobby(data) {
    this._emit(EVENT.ENTER_LOBBY, data);
  }

  emitCreateRoom(data) {
    this._emit(EVENT.CREATE_ROOM, data);
  }

  emitRoomIsCreated(data) {
    this._emit(EVENT.ROOM_IS_CREATED, data);
  }

  emitUpdateRoomInfo(data) {
    this._emit(EVENT.UPDATE_ROOM_INFO, data);
  }

  emitKnockRoom(data) {
    this._emit(EVENT.KNOCK_ROOM, data);
  }

  emitEnterRoom(data) {
    this._emit(EVENT.ENTER_ROOM, data);
  }

  emitEnterNewUser(data) {
    this._emit(EVENT.ENTER_NEW_USER, data);
  }

  emitLeaveUser(data) {
    this._emit(EVENT.LEAVE_USER, data);
  }

  emitStartRound(data) {
    this._emit(EVENT.START_ROUND, data);
  }

  emitEndRound(data) {
    this._emit(EVENT.END_ROUND, data);
  }

  emitEndGame(data) {
    this._emit(EVENT.END_GAME, data);
  }

  emitResetGame(data) {
    this._emit(EVENT.RESET_GAME, data);
  }

  emitMove(data) {
    this._emit(EVENT.MOVE, data);
  }

  emitChatMessage(data) {
    this._emit(EVENT.CHAT_MESSAGE, data);
  }

  emitStartGame() {
    this._emit(EVENT.START_GAME);
  }

  emitLeaveRoom() {
    this._emit(EVENT.LEAVE_ROOM);
  }

  emitGoToLobby() {
    this._emit(EVENT.GO_TO_LOBBY);
  }

  emitUpdatePlayerNum(data) {
    this._emit(EVENT.UPDATE_PLAYER_NUM, data);
  }
}

export default User;
