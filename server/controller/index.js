import getQuizList from '../models/quiz';

class GameController {
  constructor() {
    this.players = [];
    this.rooms = [];
  }

  enterPlayer(socket) {
    this.players.push(socket);
    socket.on('start_game', () => {
      this.players.forEach(async (player) => {
        player.emit('get_quiz_list', await getQuizList());
      });
    });
  }
}

const gameController = new GameController();

export default gameController;
