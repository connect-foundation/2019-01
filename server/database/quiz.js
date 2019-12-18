import { query, preparedStatement } from './util';

/* eslint-disable */
export default {
    fetchQuizList: async() => await query(`SELECT id, category, level, question, comment, answer FROM Quiz ORDER BY RAND() LIMIT 10;`),
    fetchAllQuizzes: async() => await query(`SELECT id, category, level, question, comment, answer FROM Quiz;`),
    add: async(category, level, question, comment, answer) => await preparedStatement(
        `INSERT INTO Quiz (category, level, question, comment, answer) VALUES (?,?,?,?,?);`,
        category, level, question, comment, answer),
    updateQuiz: async(id, category, level, question, comment, answer) => {
        await preparedStatement(`UPDATE Quiz SET category = ?, level = ?, question = ?, comment = ?,
        answer = ? WHERE id = ?;`, category, level, question, comment, answer, id);
    },
    delete: async(id) => await preparedStatement(`DELETE FROM Quiz WHERE id = ?;`, id),
};
