import pool from '../database/connection';
import quizFinder from '../database/quiz';
// quizFinder 이름 변경 필요할듯

class RoomModel {
  constructor() {
    this.name;
    this.id;
    this.gameState;
    this.roomState;
    this.masterPlayer;
    this.playerList = []; // socket
    this.chatLog = [];
    this.quizs = [];
    this.currentRound = 0;
    this.currentQuiz;
  }


  async startGame() {
    // 1. 전광판 상태 변경
    // 2. 상태를 게임중으로 변경
    this.gameState = 'doing';
  }

  /**
   * @returns {Object{quiz, charactersLocation:Array.<indexX, indexY>, countTime}}
   */
  async startRound() {
    this.getQuiz();
    this.currentRound += 1;

    return { quiz: this.currentQuiz, charactersLocation: [], countTime: 60 };
  }

  setTenQuizs(tenQuizs) {
    this.quizs = [...this.quizs, ...tenQuizs];
  }

  getQuiz() {
    this.currentQuiz = this.quizs[this.currentRound];
    return this.currentQuiz;
  }

  hasNoMoreQuiz() {
    return this.quizs[this.currentRound] === undefined;
  }
}

export default RoomModel;
