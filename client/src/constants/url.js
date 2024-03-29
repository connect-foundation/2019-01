const URL = {
  LOCAL_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_LOCAL_CLIENT_ID}`,
  LOCAL_API_SERVER: 'http://localhost:3000',
  PRODUCTION_API_SERVER: '/api',
  PRODUCTION_SOCKET_SERVER: '/socket.io',
  PRODUCTION_GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PRODUCTION_CLIENT_ID}`,
  LOCAL_GITHUB_LOGOUT: 'http://localhost:3000/oauth/github/logout',
  PRODUCTION_GITHUB_LOGOUT: '/api/oauth/github/logout',
  BACKGROUND_MUSIC: 'https://kr.object.ncloudstorage.com/connect-2019-01/music/backgound-groovyhiphop.mp3',
  BUTTON_CLICK_SOUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/music/soundeffect-buttonclick.ogg',
  GAME_START_SOUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/music/soundeffect-gamestart.mp3',
  GAME_END_SOUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/music/soundeffect-win.mp3',
  ADMIN_BACKGROUND: 'https://kr.object.ncloudstorage.com/connect-2019-01/image/boolean_avengers_logo2.png',
  ADMIN: {
    IAM: '/admin/iam',
    USER: '/admin/user',
    USER_LIST: '/admin/user/list',
    QUIZ: '/admin/quiz',
    QUIZ_LIST: '/admin/quiz/list',
    NICKNAME: '/admin/nickname',
    IMAGE: '/admin/image',
    IMAGE_LIST: '/admin/image/list',
  },
};

export default URL;
