import pool from '../database/connection';
import quizFinder from '../database/quiz';

/**
* @returns {Array.<id,category,level,question,comment,answer>}:quiz object 10개를 return함
*/
const getQuizList = async () => {
  const [rows] = await pool.query(quizFinder.getTenQuiz);
  const QuizList = rows;
  console.log(QuizList);
  return QuizList;
};

export default getQuizList;
