const URL = {
  REACT_LOBBY: 'http://localhost:3006/lobby',
  GET_ACCESS_TOKEN: (requestToken) => `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
  GET_USER_INFO: 'https://api.github.com/user',
};

export default URL;
