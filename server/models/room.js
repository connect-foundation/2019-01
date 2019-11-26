import Player from './player';
import nicknameFinder from '../database/nickname';

class Room {
  constructor() {
    this.quizs = [];
    this.currentRound = 0;
    this.currentQuiz = {};
    this.fieldRow = 8;
    this.fieldColumn = 16;
    this.playerList = [];
    this.indexOfPlayers = Array(this.fieldColumn).fill(null).map(() => Array(this.fieldRow));
    this.nickname = {};
    this.fetchRandomNickname();
  }

  /**
   * @returns {Object{quiz, charactersLocation:Array.<indexX, indexY>, countTime}}
   */
  async startNewRound() {
    this.setToCurrentQuiz();
    this.currentRound += 1;

    return { quiz: this.currentQuiz, charactersLocation: [], countTime: 60 };
  }

  addQuizList(quizs) {
    this.quizs = [...this.quizs, ...quizs];
  }

  setToCurrentQuiz() {
    this.currentQuiz = this.quizs[this.currentRound];
  }

  hasNoMoreQuiz() {
    return this.quizs[this.currentRound] === undefined;
  }

  async enterNewPlayer() {
    const player = new Player();
    const character = await this.assignCharacterToPlayer(player);
    return character;
  }

  async assignCharacterToPlayer(player) {
    const [indexX, indexY] = this.getRandomIndex();
    const character = await player.makeCharacter(indexX, indexY);
    this.indexOfPlayers[indexX][indexY] = player;
    this.playerList.push(player);
    return character;
  }

  getExistCharacters() {
    return this.playerList.map((p) => p.character);
  }

  getRandomIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (this.fieldColumn));
      indexY = Math.floor(Math.random() * (this.fieldRow));
    } while (this.indexOfPlayers[indexX][indexY]);
    return [indexX, indexY];
  }

  async fetchRandomNickname() {
    const adjList = await nicknameFinder.fetchAdjList();
    const nounList = await nicknameFinder.fetchNounList();
    this.nickname.adjList = adjList.map((nickname) => nickname.adj);
    this.nickname.nounList = nounList.map((nickname) => nickname.noun);
    console.log(this.nickname.adjList);
    console.log(this.nickname.nounList);
  }
}

export default Room;
