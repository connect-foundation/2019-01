import getDataFromDB from './util';
/* eslint-disable */
export default {
    getTenQuiz: async() => await getDataFromDB(`SELECT * FROM Quiz ORDER BY RAND() LIMIT 10;`)
};
