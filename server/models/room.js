/**
 * 코드리뷰
 * 현재 JSdoc을 사용해주려고 합니다. JSDoc을 사용하면 좋은 것 같은데, 코드가 너무 길어지고 가독성이 좀 떨어지는 느낌이 있는 것 같습니다.
 * JSDoc과 같이 양이 많은 주석도 많이 사용하나요?
 */


/**
 * Room Class
 * @property {string} id
 * @property {string} name
 * @property {boolean} isGameStarted
 * @property {object[]} quizList
 * @property {object} currentQuiz
 * @property {number} currentRound
 * @property {number} currentTime
 * @property {Map<string, user>} users
 * @property {Array.<Array.<number, number>>} indexOfCharacters
 */
class Room {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isGameStarted = false;
    this.quizList = [];
    this.currentQuiz = {};
    this.currentRound = 0;
    this.currentTime = 0;
    this.users = new Map();
    this.indexOfCharacters = this._getEmptyIndexMatrix();
  }
}