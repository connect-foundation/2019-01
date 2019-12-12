/* eslint-disable no-underscore-dangle */
import Room from '../models/room';
import User from '../models/user';
import Character from '../models/character';
import lobby from '../models/lobby';
import { shortUuid } from '../util';
import LOBBY from '../constants/lobby';
/**
 * Controller class
 * @property {array} rooms
 */
class Controller {
  /**
   *
   * @param {object} socket
   */
  connectUser(socket) {
    const user = new User(socket);
    this._bindEvent(user);
  }

  _letUserEnterLobby(user) {
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
   * @param {string} roomId
   */
  _letUserKnockRoom(user, roomId) {
    if (user.isInLobby() === false) return;
    const room = lobby.getRoom(roomId);

    if (room.isEnterable() === false) {
      user.emitKnockRoom({ isEnterable: false, roomId, message: '방에 들어갈 수 없습니다.' });
      return;
    }

    if (room.isUserEntered(user)) {
      user.emitKnockRoom({ isEnterable: false, roomId, message: '이미 들어간 방입니다.' });
      return;
    }

    user.emitKnockRoom({ isEnterable: true, roomId, message: '' });
  }

  /**
   *
   * @param {User} user
   * @param {string} roomId
   *
   * @fires Controller#enter_room
   */
  async _letUserEnterRoom(user, roomId) {
    if (user.isInLobby() === false) return;
    const room = lobby.getRoom(roomId);
    await this._assignCharacter(user);
    lobby.leaveUser(user.getId());
    await room.enterUser(user);
    lobby.updateRoomInfo(roomId, LOBBY.ACTION.USER_ENTERED);
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
    const roomId = room.getId();
    room.leaveUser(user);
    if (room.getNumOfUsers() === 0) {
      lobby.updateRoomInfo(roomId, LOBBY.ACTION.NO_USERS);
      lobby.deleteRoom(roomId);
      return;
    }
    lobby.updateRoomInfo(roomId, LOBBY.ACTION.USER_LEAVED);
  }

  /**
   *
   * @param {User} user
   */
  async _letUserStartGame(user) {
    if (user.isInLobby()) return;
    const room = lobby.getRoom(user.getRoomId());
    const roomId = room.getId();
    const isStart = await room.startGame(user);
    if (isStart) lobby.updateRoomInfo(roomId, LOBBY.ACTION.GAME_STARTED);
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
    room.chat(user.getNickname(), message);
  }

  _letUsersKnowGameEnded(user, roomId) {
    const room = lobby.getRoom(roomId);

    if (room !== undefined && room.isStarted() === false) {
      lobby.updateRoomInfo(roomId, LOBBY.ACTION.GAME_ENDED);
    }
  }

  /**
   *
   * @param {User} user
   */
  _bindEvent(user) {
    user.onCreateRoom((roomName) => this._letUserCreateRoom(user, roomName));
    user.onKnockRoom((roomId) => this._letUserKnockRoom(user, roomId));
    user.onEnterRoom(async (roomId) => {
      await this._letUserEnterRoom(user, roomId);
    });
    user.onStartGame(() => this._letUserStartGame(user));
    user.onEndGame((roomId) => this._letUsersKnowGameEnded(user, roomId));
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
