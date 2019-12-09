import { query, preparedStatement } from './util';
/* eslint-disable */
export default {
    fetchUserInfo: async(githubId) => await preparedStatement(`SELECT github_id FROM User WHERE github_id = ?;`,githubId),
    registerUser: async(githubId) => await preparedStatement(`INSERT INTO User VALUES (?, false);`,githubId),
    fetchAllUsers: async() => await query(`SELECT * FROM User;`),
    fetchUser: async(githubId) => await preparedStatement(`SELECT * FROM User WHERE github_id = ?;`, githubId),
    authorize: async(githubId) => await preparedStatement(`UPDATE User SET is_admin = TRUE WHERE github_id = ?;`, githubId),
    deauthorize: async(githubId) => await preparedStatement(`UPDATE User SET is_admin = FALSE WHERE github_id = ?;`, githubId),
    delete: async(githubId) => await preparedStatement(`DELETE FROM User WHERE github_id = ?;`, githubId),
};
