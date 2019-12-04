const URL = {
  LOCAL_REACT_LOBBY: 'http://localhost:3006/lobby',
  PRODUCTION_REACT_LOBBY: 'http://45.119.146.251:3006/lobby',
  GET_ACCESS_TOKEN: (requestToken) => `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
  GET_USER_INFO: 'https://api.github.com/user',
};

export default URL;
