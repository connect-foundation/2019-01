import query from './util';
/* eslint-disable */
export default {
    getRandomCharacter: async() => await query(`SELECT * FROM Image WHERE category='character' ORDER BY RAND() LIMIT 1;`)
};
