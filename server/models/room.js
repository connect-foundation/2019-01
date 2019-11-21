class RoomModel {
  constructor() {
    this.isGameStarted = false;
    this.playerList = []; // socket
    this.chatLog = [];
    this.quizs = [];
    this.currentRound = 0;
    this.currentQuiz;
  }


  async startGame() {
    // 1. 전광판 상태 변경
    // 2. 상태를 게임중으로 변경
    this.isGameStarted = true;
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
}

export default RoomModel;
