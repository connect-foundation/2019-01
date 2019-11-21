import getDataFromDB from './util';
/* eslint-disable */
export default {
    getQuizList: async() => await getDataFromDB(`SELECT * FROM Quiz ORDER BY RAND() LIMIT 10;`)
};
