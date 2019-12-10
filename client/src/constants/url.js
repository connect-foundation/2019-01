const URL = {
  LOCAL_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_LOCAL_CLIENT_ID}`,
  LOCAL_API_SERVER: 'http://localhost:3000',
  PRODUCTION_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PRODUCTION_CLIENT_ID}`,
  LOCAL_GITHUB_LOGOUT: 'http://localhost:3000/oauth/github/logout',
  PRODUCTION_GITHUB_LOGOUT: 'http://45.119.146.251/api/oauth/github/logout',
};

export default URL;
