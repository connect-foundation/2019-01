import { query } from './util';
/* eslint-disable */
export default {
    fetchNounList: async() => await query(`SELECT noun FROM Nickname_noun ORDER BY RAND() LIMIT 20;`),
    fetchAdjList: async() => await query(`SELECT adj FROM Nickname_adj ORDER BY RAND() LIMIT 20;`)
};