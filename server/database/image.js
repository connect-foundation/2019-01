import { query } from './util';
/* eslint-disable */
export default {
    fetchRandomCharacter: async() => await query(`SELECT url FROM Image WHERE category='character' ORDER BY RAND() LIMIT 1;`)
};
