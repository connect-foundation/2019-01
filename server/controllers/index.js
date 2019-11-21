import QuizModel from '../models/quiz';
import RoomModel from '../models/room';

class GameController {
  constructor(quizModel, roomModel) {
    this.QuizModel = quizModel;
    this.RoomModel = roomModel;
    this.players = [];
    this.rooms = [];
    // map 예제
    this.mapRooms = new Map();
  }

  enterPlayer(socket) {
    this.players.push(socket);
    this.bindPlayerEvents(socket);
  }

  async roomStartRound(roomIdx) {
    const newRoom = new RoomModel();
    this.rooms.push(newRoom);

    if (this.rooms[roomIdx].hasNoMoreQuiz()) {
      const tenQuizs = await QuizModel.getQuizList();
      this.rooms[roomIdx].setTenQuizs(tenQuizs);
    }
    this.players.forEach(async (player) => {
      const roundValue = await this.rooms[roomIdx].startRound();
      player.emit('start round', roundValue);
    });
  }

  // 콜백들은 다른데서 불러와도 될듯
  bindPlayerEvents(socket) {
    socket.on('start_game', async () => {
      console.log('game started');

      this.roomStartRound(0);
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

const gameController = new GameController(QuizModel, RoomModel);

export default gameController;
