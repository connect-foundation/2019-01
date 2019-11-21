import getDataFromDB from './util';
/* eslint-disable */
export default {
    getRandomCharacter: async() => await getDataFromDB(`SELECT * FROM Image WHERE category='character' ORDER BY RAND() LIMIT 1;`)
};
