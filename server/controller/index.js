import quizFinder from '../database/quiz';
import Room from '../models/room';

class GameController {
  constructor() {
    this.players = [];
    this.rooms = [];
    this.rooms.push(new Room());
  }

  async enterPlayer(socket) {
    this.players.push(socket);
    this.bindPlayerEvents(socket);

    const otherCharacters = this.rooms[0].getExistCharacters();
    const character = await this.rooms[0].enterNewPlayer();
    socket.emit('enter_room', { character, otherCharacters });

    this.players.forEach(async (player) => {
      if (player === socket) return;
      player.emit('enter_new_player', character);
    });
  }

  async startRoomRound(roomIdx) {
    if (this.rooms[roomIdx].hasNoMoreQuiz()) {
      const quizList = await quizFinder.getQuizList();
      this.rooms[roomIdx].addQuizList(quizList);
    }
    this.players.forEach(async (player) => {
      const roundValue = await this.rooms[roomIdx].startNewRound();
      player.emit('start_round', roundValue);
    });
  }

  bindPlayerEvents(socket) {
    socket.on('start_game', () => {
      this.startRoomRound(0);

      this.players.forEach(async (player) => {
        player.emit('fetch_quiz_list', await quizFinder.getQuizList());
      });
    });
  }
}

const gameController = new GameController();

export default gameController;
