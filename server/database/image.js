import { query, preparedStatement } from './util';
/* eslint-disable */
export default {
    fetchRandomCharacter: async() => await query(`SELECT url FROM Image WHERE category='character' ORDER BY RAND() LIMIT 1;`),
    fetchAllImages: async() => await query(`SELECT id, category, name, url FROM Image;`),
    add: async(category, name, url) => await preparedStatement(
        `INSERT INTO Image (category, name, url) VALUES (?,?,?);`, 
        category, name, url),
    updateCategory: async(id, category) => await preparedStatement(`UPDATE Image SET category = ? WHERE id = ?;`, category, id),
    updateName: async(id, name) => await preparedStatement(`UPDATE Image SET name = ? WHERE id = ?;`, name, id),
    updateUrl: async(id, url) => await preparedStatement(`UPDATE Image SET url = ? WHERE id = ?;`, url, id),
    delete: async(id) => await preparedStatement(`DELETE FROM Image WHERE id = ?;`, id),
};
