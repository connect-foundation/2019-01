/* eslint-disable no-underscore-dangle */
import LOBBY from '../constants/lobby';

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
    console.log(`user entered lobby | id : ${user.getId()} | nickname : ${user.getNickname()}`);

    // user.onEnterLobby();
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
      /*
      방을 만든 유저가 방에 들어가기 전에 아래 이벤트가 emit되기 때문에
      0명으로 방목록이 생성됨, 그래서 값이 1인 FAKE_USER_NUMBER를 넣어줌
      정상적으로 방목록이 생성된 것처럼 보이나 추가적인 보완이 필요할수도 있을듯
      이를테면,, 유저가 방을 들락날락할때 숫자를 변경시켜주는 이벤트를 만든다면
      1명으로 초기화 -> 들어가면서 +1 해서 2명으로 변경될 수도 있음
      들어가면서 1명 추가시키는걸 하면 fake 안써도 되는구나!
      */
      _user.emitRoomIsCreated({ ...this._makeSingleRoomInfo(room), numOfUsers: LOBBY.FAKE_USER_NUMBER });
    });
  }
}

const lobby = new Lobby();

export default lobby;
