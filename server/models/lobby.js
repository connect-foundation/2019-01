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

  _broadcast(emitCallback) {
    this.users.forEach(emitCallback);
  }

  _makeRoomInfos() {
    const roomInfos = [];
    this.rooms.forEach((room, roomId) => {
      const roomInfo = {
        id: roomId,
        name: room.getName(),
        numOfUsers: room.getNumOfUsers(),
        isEnterable: room.isEnterable(),
      };
      roomInfos.push(roomInfo);
    });
    return roomInfos;
  }

  enterUser(user) {
    this.users.set(user.getId(), user);
    user.onEnterLobby();
    user.emitRoomInfos(this._makeRoomInfos());
  }

  leaveUser(userId) {
    this.users.delete(userId);
  }

  createRoom(user, room) {
    const roomId = room.getId();
    this.rooms.set(roomId, room);
    user.emitCreateRoom(roomId);
  }
}

const lobby = new Lobby();

export default lobby;
