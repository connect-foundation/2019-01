const githubLogout = async (req, res, next) => {
  // 로컬 테스트용
  res.header('Access-Control-Allow-Origin', 'http://localhost:3006');

  res.header('Access-Control-Allow-Credentials', true);
  res.clearCookie('_jwt');
  return next();
};

export default githubLogout;
