/* eslint-disable no-underscore-dangle */
import Room from '../models/room';
import User from '../models/user';
import Character from '../models/character';
import lobby from '../models/lobby';
import { shortUuid } from '../util';
import { KNOCK_MESSAGE } from '../constants/lobby';
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
    console.log('a user connected');
    const user = new User(socket);
    this._bindEvent(user);
  }

  /**
   *
   * @param {User} user
   */
  _letUserEnterLobby(user) {
    if (user.isInLobby()) return;
    lobby.enterUser(user);
  }

  /**
   *
   * @param {User} user
   * @param {string} roomName
   */
  _letUserCreateRoom(user, roomName) {
    if (user.isInLobby() === false) return;
    if (roomName === '') return;
    const roomId = shortUuid();
    const room = new Room(roomId, roomName);
    lobby.addRoom(user, room);
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
      user.emitKnockRoom({ isEnterable: false, roomId, message: KNOCK_MESSAGE.DENIED });
      return;
    }

    if (room.isUserEntered(user)) {
      user.emitKnockRoom({ isEnterable: false, roomId, message: KNOCK_MESSAGE.OVERLAP });
      return;
    }

    user.emitKnockRoom({ isEnterable: true, roomId, message: KNOCK_MESSAGE.PASS });
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
    if (room === undefined) {
      user.emitGoToLobby();
      return;
    }
    this._letUserLeaveLobby(user);
    await this._assignCharacter(user);
    await room.enterUser(user);
    lobby.updateRoomInfo(roomId);
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
    const roomId = user.getRoomId();
    const room = lobby.getRoom(roomId);
    if (room === undefined) return;
    room.leaveUser(user);
    lobby.updateRoomInfo(roomId);

    if (room.getNumOfUsers() === 0) {
      lobby.deleteRoom(roomId);
    }
  }

  /**
   *
   * @param {User} user
   */
  _letUserLeaveLobby(user) {
    if (user.isInLobby() === false) return;
    const userId = user.getId();
    lobby.leaveUser(userId);
  }

  /**
   *
   * @param {User} user
   */
  async _letUserStartGame(user) {
    if (user.isInLobby()) return;
    const roomId = user.getRoomId();
    const room = lobby.getRoom(roomId);
    const isStart = await room.startGame(user);
    if (isStart) lobby.updateRoomInfo(roomId);
  }

  /**
   *
   * @param {User} user
   * @param {*} direction
   */
  _letUserMove(user, direction) {
    if (user.isInLobby()) return;
    const roomId = user.getRoomId();
    const room = lobby.getRoom(roomId);
    room.moveCharacter(user, direction);
  }

  /**
   *
   * @param {User} user
   * @param {*} direction
   */
  _letUserUseSkill(user, direction) {
    if (user.isInLobby()) return;
    const roomId = user.getRoomId();
    const room = lobby.getRoom(roomId);
    room.useSkill(user, direction);
  }

  /**
   *
   * @param {User} user
   * @param {string} message
   */
  _letUserChat(user, message) {
    if (user.isInLobby()) return;
    const roomId = user.getRoomId();
    const room = lobby.getRoom(roomId);
    room.chat(user, message);
  }

  /**
   *
   * @param {User} user
   * @param {string} roomId
   */
  _letUsersKnowGameEnded(user, roomId) {
    const room = lobby.getRoom(roomId);
    if (room === undefined || room.isStarted()) return;
    lobby.updateRoomInfo(roomId);
  }

  /**
   *
   * @param {User} user
   */
  _letUserDisconnected(user) {
    console.log('a user disconnected');
    this._letUserLeaveRoom(user);
    this._letUserLeaveLobby(user);
  }

  /**
   *
   * @param {User} user
   */
  _bindEvent(user) {
    user.onCreateRoom((roomName) => this._letUserCreateRoom(user, roomName));
    user.onKnockRoom((roomId) => this._letUserKnockRoom(user, roomId));
    user.onEnterRoom((roomId) => this._letUserEnterRoom(user, roomId));
    user.onStartGame(() => this._letUserStartGame(user));
    user.onReadyRoom((roomId) => this._letUsersKnowGameEnded(user, roomId));
    user.onMove((direction) => this._letUserMove(user, direction));
    user.onUseSkill((direction) => this._letUserUseSkill(user, direction));
    user.onChatMessage((message) => this._letUserChat(user, message));
    user.onLeaveRoom(() => this._letUserLeaveRoom(user));
    user.onEnterLobby(() => this._letUserEnterLobby(user));
    user.onDisconnecting(() => this._letUserDisconnected(user));
  }
}

const controller = new Controller();

export default controller;
