/* eslint-disable no-underscore-dangle */

import Room from '../models/room';
import User from '../models/user';
import lobby from '../models/lobby';
import Character from '../models/character';

class Controller {
  constructor() {
    this.rooms = [];
    this.rooms.push(new Room());

    // 임시 코드
    this.testRoom = new Room(1, 'test room');
    lobby.roomList.set(this.testRoom.getId(), this.testRoom);
  }

  connectUser(socket) {
    const user = new User(socket);
    this._bindEvent(user);
    lobby.enterUser(user);
  }

  async _letUserCreateRoom(user, roomId, roomName) {
    if (user.getIsInLobby() === false) return;
    const testRoom = new Room(roomId, roomName);
    await lobby.createRoom(user, testRoom);
  }

  async _letUserEnterRoom(user, roomId) {
    if (user.getIsInLobby() === false) return;
    const room = lobby.getRoom(roomId);
    lobby.leaveUser(user.getId);
    await this._assignCharacter(user);
    await room.enterUser(user);
  }

  async _assignCharacter(user) {
    const character = new Character();
    await character.setCharacterUrl();
    user.setCharacter(character);
  }

  _letUserLeaveRoom(user) {
    if (user.getIsInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.leaveUser(user);
  }

  async _letUserStartGame(user) {
    if (user.getIsInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    await room.startGame(user);
  }

  _letUserMove(user, direction) {
    if (user.getIsInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.moveCharacter(user, direction);
  }

  _letUserChat(user, message) {
    if (user.getIsInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    room.chat(user, message);
  }

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
