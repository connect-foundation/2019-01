import getDataFromDB from './util';
/* eslint-disable */
export default {
    fetchQuizList: async() => await getDataFromDB(`SELECT * FROM Quiz ORDER BY RAND() LIMIT 10;`)
};
