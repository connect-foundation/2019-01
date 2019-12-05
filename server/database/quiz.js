import { query, preparedStatement } from './util';

/* eslint-disable */
export default {
    fetchQuizList: async() => await query(`SELECT * FROM Quiz ORDER BY RAND() LIMIT 10;`),
    fetchAllQuizzes: async() => await query(`SELECT * FROM Quiz;`),
    add: async(category, level, question, comment, answer) => await preparedStatement(
        `INSERT INTO Quiz (category, level, question, comment, answer) VALUES (?,?,?,?,?);`,
        category, level, question, comment, answer),
    updateCategory: async(id, category) => await preparedStatement(`UPDATE Quiz SET category = ? WHERE id = ?;`, category, id),
    updateLevel: async(id, level) => await preparedStatement(`UPDATE Quiz SET level = ? WHERE id = ?;`, level, id),
    updateQuestion: async(id, question) => await preparedStatement(`UPDATE Quiz SET question = ? WHERE id = ?;`, question, id),
    updateAnswer: async(id, comment) => await preparedStatement(`UPDATE Quiz SET comment = ? WHERE id = ?;`, comment, id),
    updateComment: async(id, answer) => await preparedStatement(`UPDATE Quiz SET answer = ? WHERE id = ?;`, answer, id),
    delete: async(id) => await preparedStatement(`DELETE FROM Quiz WHERE id = ?;`, id),
};
