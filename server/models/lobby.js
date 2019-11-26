/* eslint-disable no-underscore-dangle */

class Lobby {
  constructor() {
    this.userList = new Map();
    this.roomList = new Map();
  }

  getRoom(roomId) {
    return this.roomList.get(roomId);
  }

  _broadcast(emitCallback) {
    this.userList.forEach(emitCallback);
  }

  _makeRoomInfos() {
    const roomInfos = [];
    this.roomList.forEach((room, roomId) => {
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
    this.userList.set(user.getId(), user);
    user.onEnterLobby();
    user.emitRoomInfos(this._makeRoomInfos());
  }

  leaveUser(userId) {
    this.userList.delete(userId);
  }

  async createRoom(user, room) {
    this.roomList.set(room.getId(), room);
    await room.enterUser(user);
    this.leaveUser(user.getId());
  }
}

const lobby = new Lobby();
export default lobby;
