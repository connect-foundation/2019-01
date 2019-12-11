const URL = {
  LOCAL_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_LOCAL_CLIENT_ID}`,
  LOCAL_API_SERVER: 'http://localhost:3000',
  PRODUCTION_API_SERVER: '/api',
  PRODUCTION_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PRODUCTION_CLIENT_ID}`,
  LOCAL_GITHUB_LOGOUT: 'http://localhost:3000/oauth/github/logout',
  PRODUCTION_GITHUB_LOGOUT: 'http://45.119.146.251:3000/api/oauth/github/logout',
  ADMIN_BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/boolean_avengers_logo2.png',
};

export default URL;
