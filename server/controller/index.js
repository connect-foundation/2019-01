/* eslint-disable no-underscore-dangle */

import Room from '../models/room';
import User from '../models/user';
import Character from '../models/character';
import lobby from '../models/lobby';

/**
 * Controller class
 * @property {array} rooms
 */
class Controller {
  constructor() {
    this.rooms = [];
    this.rooms.push(new Room());

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
    lobby.enterUser(user);
  }

  /**
   *
   * @param {User} user
   * @param {number} roomId
   * @param {string} roomName
   */
  _letUserCreateRoom(user, roomId, roomName) {
    if (user.isInLobby() === false) return;
    const testRoom = new Room(roomId, roomName);
    lobby.createRoom(user, testRoom);
  }

  /**
   *
   * @param {User} user
   * @param {number} roomId
   *
   * @fires Controller#enter_room
   */
  async _letUserEnterRoom(user, roomId) {
    if (user.isInLobby() === false) return;
    const room = lobby.getRoom(roomId);
    lobby.leaveUser(user.getId);
    await this._assignCharacter(user);
    room.enterUser(user);
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
    user.onEnterRoom(async (roomId) => {
      await this._letUserEnterRoom(user, roomId);
    });
    user.onStartGame(() => this._letUserStartGame(user));
    user.onMove((direction) => this._letUserMove(user, direction));
    user.onChatMessage((message) => this._letUserChat(user, message));
    user.onLeaveRoom(() => this._letUserLeaveRoom(user));
    user.onDisconnecting(() => this._letUserLeaveRoom(user));
  }
}

const controller = new Controller();

export default controller;
