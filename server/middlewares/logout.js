const githubLogout = (req, res, next) => {
  res.clearCookie('_jwt');
  next();
};

export default githubLogout;
