import { query, preparedStatement } from './util';
/* eslint-disable */
export default {
    fetchRandomCharacter: async() => await query(`SELECT url FROM Image WHERE category='character' ORDER BY RAND() LIMIT 1;`),
    fetchAllImages: async() => await query(`SELECT id, category, name, url FROM Image;`),
    add: async(category, name, url) => await preparedStatement(
        `INSERT INTO Image (category, name, url) VALUES (?,?,?);`, 
        category, name, url),
    updateImage: async(id, category, name, url) => {
        await preparedStatement(`UPDATE Image SET category = ?, name = ?, url = ? WHERE id = ?;`, category, name, url, id);
    },
    delete: async(id) => await preparedStatement(`DELETE FROM Image WHERE id = ?;`, id),
};
