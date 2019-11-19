import pool from '../database/connection';
import quiz from '../database/quiz';

class Quiz {
  /**
    * @returns {Array.<id,category,level,question,comment,answer>}:quiz object 10개를 return함
    */
  async getTenQuiz() {
    const [rows] = await pool.query(quiz.getTenQuiz);
    const QuizList = rows;
    console.log(QuizList);
    return QuizList;
  }
}

export default Quiz;
