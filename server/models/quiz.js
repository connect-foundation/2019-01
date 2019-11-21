import pool from '../database/connection';
import quizFinder from '../database/quiz';

class QuizModel {
  constructor() {
    this.pool = pool;
    this.quizFinder = quizFinder;
  }

  /**
  * @returns {Array.<id,category,level,question,comment,answer>}:quiz object 10개를 return함
  */
  async getQuizList() {
    const [quizList] = await this.pool.query(this.quizFinder.getTenQuiz);
    return quizList;
  }
}

export default new QuizModel();
