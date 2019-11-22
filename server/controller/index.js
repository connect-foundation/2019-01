import quizManager from '../models/quiz';
import Room from '../models/room';

class GameController {
  constructor() {
    this.players = [];
    this.rooms = [];
    // map 예제
    this.mapRooms = new Map();

    // 임시
    this.rooms.push(new Room());
  }

  enterPlayer(socket) {
    this.players.push(socket);
    this.bindPlayerEvents(socket);
  }

  async startRoomRound(roomIdx) {
    if (this.rooms[roomIdx].hasNoMoreQuiz()) {
      const quizList = await quizManager.getQuizList();
      this.rooms[roomIdx].addQuizList(quizList);
    }
    this.players.forEach(async (player) => {
      const roundValue = await this.rooms[roomIdx].startNewRound();
      player.emit('start round', roundValue);
    });
  }

  // 콜백들은 다른데서 불러와도 될듯
  bindPlayerEvents(socket) {
    socket.on('start_game', () => {
      console.log('game started');

      this.startRoomRound(0);
    });

    socket.on('enter_room', () => {
      // ...
    });
    socket.on('leave_room', () => {
      // ...
    });
    socket.on('init', () => {

    });
  }
}

const gameController = new GameController();

export default gameController;