import getQuizList from '../models/quiz';

class GameController {
  constructor() {
    this.players = [];
    this.rooms = [];
  }

  enterPlayer(socket) {
    this.players.push(socket);
  }
}

const gameController = new GameController();

export default gameController;
