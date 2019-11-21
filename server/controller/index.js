import quizFinder from '../database/quiz';
import Room from '../models/room';
import RoomManager from '../models/room-manager';
import Player from '../models/player';
import event from '../event';

class GameController {
  constructor() {
    this.roomManager = new RoomManager();
    this.playerSockets = [];
    this.rooms = [];
    this.rooms.push(new Room());
  }

  async enterPlayer(socket) {
    this.playerSockets.push(socket);
    const newPlayer = new Player(socket.id);
    this.roomManager.enterPlayer(newPlayer);
    socket.emit(event.ROOM_INFOS, this.roomManager.getRoomInfos());

    socket.on(event.CREATE_ROOM, (data) => {
      this.roomManager.createRoom(data.roomName, newPlayer);
    });

    socket.on(event.ENTER_ROOM, async (data) => {
      const otherCharacters = this.roomManager.getExistCharacters();
      const character = await this.roomManager.enterRoom(data.roomId, socket.id);
      socket.emit(event.ENTER_ROOM, { character, otherCharacters });

      // 해당 방의 다른 유저들에게 새로 들어온 유저의 정보를 emit 해주는 로직
    });
  }
}

const gameController = new GameController();

export default gameController;
