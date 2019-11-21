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

    const otherCharacters = this.rooms[0].getExistCharacters(); //방은 하나라고 가정하고 rooms[0]번째 방을 이용합니다.
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
    //   this.startRoomRound(0); // 문제 하나만 넘겨주는 logic

      this.players.forEach(async (player) => { // 문제 10개를 배열로 넘겨주는 logic
        player.emit('get_quiz_list', await quizFinder.getQuizList());
      });
    });
  }
}

const gameController = new GameController();

export default gameController;
