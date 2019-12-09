const githubLogout = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3006');
  res.header('Access-Control-Allow-Credentials', true);
  res.clearCookie('jwt');
  return next();
};

export default githubLogout;
