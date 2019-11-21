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

    socket.on('start_game', () => {
      this.players.forEach(async (player) => {
        player.emit('get_quiz_list', await quizFinder.getQuizList());
      });
    });

    const otherCharacters = this.rooms[0].getExistCharacters();
    const character = await this.rooms[0].enterNewPlayer();
    socket.emit('enter_room', { character, otherCharacters });

    this.players.forEach(async (player) => {
      if (player === socket) return;
      player.emit('enter_new_player', character);
    });
  }
}

const gameController = new GameController();

export default gameController;
