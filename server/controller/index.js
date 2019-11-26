/* eslint-disable no-underscore-dangle */
import Room from '../models/room';
import User from '../models/user';
import Character from '../models/character';

class GameController {
  constructor() {
    this.rooms = [];
    this.rooms.push(new Room());
    this.userRoomMap = new Map();
  }

  async _letUserEnterRoom(user, roomId) {
    console.log(roomId); // 추후 roomId로 방 찾기
    const room = this.rooms[0];
    await this._assignCharacter(user);
    await room.enterUser(user);
  }

  _letUserLeaveRoom(user) {
    const room = this.rooms[0];
    room.leaveUser(user);
  }

  async _letUserStartGame(user) {
    const room = this.rooms[0];
    await room.startGame(user);
  }

  _letUserMove(user, direction) {
    const room = this.rooms[0];
    room.moveCharacter(user, direction);
  }

  _letUserChat(user, message) {
    const room = this.rooms[0];
    room.chat(user, message);
  }

  async _assignCharacter(user) {
    const character = new Character();
    await character.setCharacterUrl();
    user.setCharacter(character);
  }

  bindEvent(socket) {
    const user = new User(socket);

    user.onEnterRoom((roomId) => this._letUserEnterRoom(user, roomId));
    user.onStartGame(() => this._letUserStartGame(user));
    user.onMove((direction) => this._letUserMove(user, direction));
    user.onChatMessage((message) => this._letUserChat(user, message));
    user.onLeaveRoom(() => this._letUserLeaveRoom(user));
    user.onDisconnecting(() => this._letUserLeaveRoom(user));
  }
}

const gameController = new GameController();

export default gameController;
