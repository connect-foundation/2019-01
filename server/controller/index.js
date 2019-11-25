import Room from '../models/room';
import User from '../models/user';

class GameController {
  constructor() {
    this.rooms = [];
    this.rooms.push(new Room());
    this.userRoomMap = new Map();
  }

  async letUserEnterRoom(user, roomId) {
    console.log(roomId); // 추후 roomId로 방 찾기
    const room = this.rooms[0];
    await room.enterUser(user);
  }

  letUserLeaveRoom(user) {
    const room = this.rooms[0];
    room.leaveUser(user);
  }

  async letUserStartGame(user) {
    const room = this.rooms[0];
    await room.startGame(user);
  }

  letUserMove(user, direction) {
    const room = this.rooms[0];
    room.moveCharacter(user, direction);
  }

  letUserChat(user, message) {
    const room = this.rooms[0];
    room.chat(user, message);
  }

  bindEvent(socket) {
    const user = new User(socket);

    user.onEnterRoom((roomId) => this.letUserEnterRoom(user, roomId));
    user.onStartGame(() => this.letUserStartGame(user));
    user.onMove((direction) => this.letUserMove(user, direction));
    user.onChatMessage((message) => this.letUserChat(user, message));
    user.onLeaveRoom(() => this.letUserLeaveRoom(user));
    user.onDisconnecting(() => this.letUserLeaveRoom(user));
  }
}

const gameController = new GameController();

export default gameController;
