import Player from './player';
/**
 * A Character
 * @typedef {Object} Character
 * @property {number} id
 * @property {string} category
 * @property {string} name
 * @property {string} url
 * @property {number} indexX
 * @property {number} indexY
 */

/**
 * Room Class
 * @property {string[]} quizs
 * @property {number} currentRound
 * @property {string} currentQuiz
 * @property {number} fieldRow
 * @property {number} fieldColumn
 * @property {Player[]} playerList
 * @property {Array.<Array.<number, number>>} indexOfPlayers
 *
 */
class Room {
  constructor() {
    this.quizs = [];
    this.currentRound = 0;
    this.currentQuiz = '';
    this.fieldRow = 8;
    this.fieldColumn = 16;
    this.playerList = [];
    this.indexOfPlayers = Array(this.fieldColumn).fill(null).map(() => Array(this.fieldRow));
  }


  /**
   * 새로운 라운드를 시작
   * 현재 라운드에 맞는 퀴즈로 변경하고 그에 맞는 라운드 값들을 반환
   * @returns {{
   * quiz: string,
   * charactersLocation: Array<Array.<number,number>>,
   * countTime: number}}
   *
   * @example
   *  this.players.forEach(async (player) => {
   *   const roundValue = await this.rooms[roomIdx].startNewRound();
   *   player.emit('start_round', roundValue);
   *  });
   *  // roundValue = { quiz: '퀴즈 예시입니다.' charactersLocation: [[2, 5]], countTimte: 60}
   */
  async startNewRound() {
    this.setToCurrentQuiz();
    this.currentRound += 1;

    return { quiz: this.currentQuiz, charactersLocation: [], countTime: 60 };
  }

  /**
   * Room객체에 새로운 퀴즈들을 추가
   * @param {Array.<string>} quizs
   */
  addQuizList(quizs) {
    this.quizs = [...this.quizs, ...quizs];
  }

  /**
   * 현재 라운드에 맞춰서 채팅을 변경합니다.
   */
  setToCurrentQuiz() {
    this.currentQuiz = this.quizs[this.currentRound];
  }

  /**
   * @returns {Boolean}
   */
  hasNoMoreQuiz() {
    return this.quizs[this.currentRound] === undefined;
  }

  /**
   * @returns {Character}
   */
  async enterNewPlayer() {
    const player = new Player();
    const character = await this.assignCharacterToPlayer(player);
    return character;
  }

  /**
   *
   * @param {Player} player
   * @returns {Character}
   */
  async assignCharacterToPlayer(player) {
    const [indexX, indexY] = this.getRandomIndex();
    const character = await player.makeCharacter(indexX, indexY);
    this.indexOfPlayers[indexX][indexY] = player;
    this.playerList.push(player);
    return character;
  }

  /**
   * @returns {Player[]}
   */
  getExistCharacters() {
    return this.playerList.map((p) => p.character);
  }

  /**
   * @returns {Array.<number, number>}
   */
  getRandomIndex() {
    let indexX;
    let indexY;
    do {
      indexX = Math.floor(Math.random() * (this.fieldColumn));
      indexY = Math.floor(Math.random() * (this.fieldRow));
    } while (this.indexOfPlayers[indexX][indexY]);
    return [indexX, indexY];
  }
}

export default Room;
