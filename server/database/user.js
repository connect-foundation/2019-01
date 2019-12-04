import { preparedStatement } from './util';
/* eslint-disable */
export default {
    fetchUserInfo: async(githubId) => await preparedStatement(`SELECT github_id FROM User WHERE github_id = ? ;`,githubId),
    registerUser: async(githubId) => await preparedStatement(`INSERT INTO User VALUES (?, false);`,githubId)
};