import pool from '../database/connection';
import quiz from '../database/quiz';

class Quiz {
  async getTenQuiz() {
    const [rows] = await pool.query(quiz.getTenQuiz);
    return rows;
  }
}

export default Quiz;
