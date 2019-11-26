/* eslint-disable no-underscore-dangle */

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

  async createRoom(user, room) {
    this.rooms.set(room.getId(), room);
    await room.enterUser(user);
    this.leaveUser(user.getId());
  }
}

const lobby = new Lobby();

export default lobby;
