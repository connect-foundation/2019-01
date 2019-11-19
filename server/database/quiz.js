/* eslint-disable */
export default {
    getAllQuiz: `SELECT * FROM Quiz;`,
    getTenQuiz: `SELECT * FROM Quiz ORDER BY RAND() LIMIT 20;`
};
