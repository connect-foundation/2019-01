/* eslint-disable no-underscore-dangle */
/**
 * Lobby Class
 * @property {Map.<string, User>} users
 * @property {Map.<string, Room>} rooms
 */
class Lobby {
  constructor() {
    this.users = new Map();
    this.rooms = new Map();
  }

  /**
   * @param {string} roomId
   *
   * @returns {Room}
   */
  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  /**
   * @param {string} roomId
   */
  deleteRoom(roomId) {
    this.rooms.delete(roomId);
  }

  /**
   * @param {User} user
   * @param {Room} room
   */
  addRoom(user, room) {
    const roomId = room.getId();
    this.rooms.set(roomId, room);

    user.emitCreateRoom(roomId);
    this.users.forEach((_user) => {
      if (_user === user) return;
      const roomInfo = this._makeRoomInfo(room);
      _user.emitRoomIsCreated(roomInfo);
    });
  }

  /**
   * @param {User} user
   */
  enterUser(user) {
    const userId = user.getId();
    const roomInfoList = this._makeRoomInfoList();
    this.users.set(userId, user);
    user.deleteRoomId();

    user.emitEnterLobby(roomInfoList);
  }

  /**
   * @param {string} userId
   */
  leaveUser(userId) {
    this.users.delete(userId);
  }

  /**
   * @param {string} roomId
   */
  updateRoomInfo(roomId) {
    const room = this.getRoom(roomId);
    const roomInfo = {
      id: roomId,
      name: room.getName(),
      numOfUsers: room.getNumOfUsers(),
      isEnterable: room.isEnterable(),
    };

    this.users.forEach((user) => {
      user.emitUpdateRoomInfo({ roomId, roomInfo });
    });
  }

  /**
   * @typedef RoomInfo
   * @type {object}
   * @property {string} id
   * @property {string} name
   * @property {number} numOfUsers
   * @property {boolean} isEnterable
   */

  /**
   * @param {Room} room
   *
   * @returns {RoomInfo}
   */
  _makeRoomInfo(room) {
    return {
      id: room.getId(),
      name: room.getName(),
      numOfUsers: room.getNumOfUsers(),
      isEnterable: room.isEnterable(),
    };
  }

  /**
   * @returns {Array.<RoomInfo>}
   */
  _makeRoomInfoList() {
    const roomInfoList = [];
    this.rooms.forEach((room) => {
      const roomInfo = this._makeRoomInfo(room);
      roomInfoList.push(roomInfo);
    });
    return roomInfoList;
  }
}

const lobby = new Lobby();

export default lobby;
