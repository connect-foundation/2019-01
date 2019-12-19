const clientID = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_ID : process.env.LOCAL_CLIENT_ID;
const clientSecret = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_SECRET : process.env.LOCAL_CLIENT_SECRET;

const URL = {
  LOCAL_ORIGIN: 'http://localhost:3006/',
  LOCAL_REACT_OAUTH: 'http://localhost:3006/oauth',
  PRODUCTION_REACT_OAUTH: '/oauth',
  LOCAL_REACT_LOBBY: 'http://localhost:3006/lobby',
  PRODUCTION_REACT_LOBBY: '/lobby',
  GET_ACCESS_TOKEN: (requestToken) => `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
  GET_USER_INFO: 'https://api.github.com/user',
};

export default URL;
