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
  