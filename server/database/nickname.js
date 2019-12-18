import { query, preparedStatement } from './util';
/* eslint-disable */
export default {
    fetchNounList: async() => await query(`SELECT noun FROM Nickname_noun ORDER BY RAND() LIMIT 20;`),
    fetchAdjList: async() => await query(`SELECT adj FROM Nickname_adj ORDER BY RAND() LIMIT 20;`),
    fetchAllNouns: async() => await query(`SELECT id, noun FROM Nickname_noun;`),
    addNoun: async(noun) => await preparedStatement(`INSERT INTO Nickname_noun (noun) VALUES (?);`, noun),
    renameNoun: async(id, noun) => await preparedStatement(`UPDATE Nickname_noun SET noun = ? WHERE id = ?;`, noun, id),
    deleteNoun: async(id) => await preparedStatement(`DELETE FROM Nickname_noun WHERE id = ?;`, id),
    fetchAllAdjs: async() => await query(`SELECT id, adj FROM Nickname_adj;`),
    addAdj: async(adj) => await preparedStatement(`INSERT INTO Nickname_adj (adj) VALUES (?);`, adj),
    renameAdj: async(id, adj) => await preparedStatement(`UPDATE Nickname_adj SET adj = ? WHERE id = ?;`, adj, id),
    deleteAdj: async(id) => await preparedStatement(`DELETE FROM Nickname_adj WHERE id = ?;`, id),
};
