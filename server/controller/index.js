/* eslint-disable no-underscore-dangle */
import Room from '../models/room';
import User from '../models/user';
import Character from '../models/character';
import lobby from '../models/lobby';
import { shortUuid } from '../util';
/**
 * Controller class
 * @property {array} rooms
 */
class Controller {
  constructor() {
    // 임시 코드
    this.testRoom = new Room(1, 'test room');
    lobby.rooms.set(this.testRoom.getId(), this.testRoom);
  }

  /**
   *
   * @param {object} socket
   */
  connectUser(socket) {
    const user = new User(socket);
    this._bindEvent(user);
    // lobby에 자동으로 들어가게 할 필요는 없다.
    // 아래를 주석하면 isInLobby()가 false
    // lobby에서 users를 관리를 하는데 로비에 안들어가고
    // 바로 room으로 들어가게 하면 lobby가 해당 유저를 모른다. 이건 어떻게?
    // lobby.enterUser(user);
  }

  _letUserEnterLobby(user) {
    // 로비로는 바로 들어오는 경우가 없다.
    // 로그인창 -> 로비 -> 룸
    // 룸 url -> 룸
    lobby.enterUser(user);
  }

  /**
   *
   * @param {User} user
   * @param {string} roomName
   */
  _letUserCreateRoom(user, roomName) {
    if (user.isInLobby() === false) return;
    const roomId = shortUuid();
    const room = new Room(roomId, roomName);
    lobby.createRoom(user, room);
  }

  /**
   *
   * @param {User} user
   * @param {number} roomId
   *
   * @fires Controller#enter_room
   */
  async _letUserEnterRoom(user, roomId) {
    if (user.isInLobby()) {
      lobby.leaveUser(user.getId);
    }
    const room = lobby.getRoom(roomId);
    await this._assignCharacter(user);
    await room.enterUser(user);
  }

  /**
   *
   * @param {User} user
   */
  async _assignCharacter(user) {
    const character = new Character();
    await character.setUrl();
    user.setCharacter(character);
  }

  /**
   *
   * @param {User} user
   */
  _letUserLeaveRoom(user) {
    if (user.isInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.leaveUser(user);
  }

  /**
   *
   * @param {User} user
   */
  async _letUserStartGame(user) {
    if (user.isInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    await room.startGame(user);
  }

  /**
   *
   * @param {User} user
   * @param {*} direction
   */
  _letUserMove(user, direction) {
    if (user.isInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.moveCharacter(user, direction);
  }

  /**
   *
   * @param {User} user
   * @param {string} message
   */
  _letUserChat(user, message) {
    if (user.isInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.chat(user, message);
  }

  /**
   *
   * @param {User} user
   */
  _bindEvent(user) {
    user.onCreateRoom((roomName) => this._letUserCreateRoom(user, roomName));
    user.onEnterRoom(async (roomId) => {
      await this._letUserEnterRoom(user, roomId);
    });
    user.onStartGame(() => this._letUserStartGame(user));
    user.onMove((direction) => this._letUserMove(user, direction));
    user.onChatMessage((message) => this._letUserChat(user, message));
    user.onLeaveRoom(() => this._letUserLeaveRoom(user));
    user.onDisconnecting(() => {
      console.log('a user disconnected');
      this._letUserLeaveRoom(user);
    });
    user.onEnterLobby(() => this._letUserEnterLobby(user));
  }
}

const controller = new Controller();

export default controller;
