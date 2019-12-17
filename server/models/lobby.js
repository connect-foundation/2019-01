/* eslint-disable no-underscore-dangle */
/**
 * Lobby Class
 * @property {Map} users
 */
class Lobby {
  constructor() {
    this.users = new Map();
    this.rooms = new Map();
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  _makeSingleRoomInfo(room) {
    return {
      id: room.getId(),
      name: room.getName(),
      numOfUsers: room.getNumOfUsers(),
      isEnterable: room.isEnterable(),
    };
  }

  _makeRoomInfos() {
    const roomInfos = [];
    this.rooms.forEach((room) => {
      roomInfos.push(this._makeSingleRoomInfo(room));
    });
    return roomInfos;
  }

  /**
   *
   * @param {User} user
   */
  enterUser(user) {
    this.users.set(user.getId(), user);

    user.emitEnterLobby(this._makeRoomInfos());
  }

  leaveUser(userId) {
    this.users.delete(userId);
  }

  createRoom(user, room) {
    const roomId = room.getId();
    this.rooms.set(roomId, room);

    user.emitCreateRoom(roomId);

    this.users.forEach((_user) => {
      if (_user === user) return;
      _user.emitRoomIsCreated(this._makeSingleRoomInfo(room));
    });
  }

  deleteRoom(roomId) {
    this.rooms.delete(roomId);
  }

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
}

const lobby = new Lobby();

export default lobby;
