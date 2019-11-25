import query from './util';
/* eslint-disable */
export default {
    fetchQuizList: async() => await query(`SELECT * FROM Quiz ORDER BY RAND() LIMIT 10;`)
};
