const URL = {
  LOCAL_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_LOCAL_CLIENT_ID}`,
  LOCAL_API_SERVER: 'http://localhost:3000',
  PRODUCTION_API_SERVER: '/api',
  PRODUCTION_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PRODUCTION_CLIENT_ID}`,
  LOCAL_GITHUB_LOGOUT: 'http://localhost:3000/oauth/github/logout',
  PRODUCTION_GITHUB_LOGOUT: '/api/oauth/github/logout',
  ADMIN_BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/boolean_avengers_logo2.png',
  ADMIN: {
    USER: '/admin/user',
    USER_LIST: '/admin/user/list',
    QUIZ: '/admin/quiz',
    QUIZ_LIST: '/admin/quiz/list',
    NICKNAME: '/admin/nickname/',
  },
};

export default URL;
