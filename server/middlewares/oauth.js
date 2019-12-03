import axios from 'axios';
import jwt from 'jsonwebtoken';
import userFinder from '../database/user';

const privateKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;

const githubOauth = async (req, res, next) => {
  const requestToken = req.query.code;
  const accessToken = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.data.access_token);

  const { data } = await axios('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const [user] = await userFinder.fetchUserInfo(data.id);
  if (user.github_id === undefined) {
    userFinder.registerUser(data.id, data.name);
  }

  const token = jwt.sign({ id: data.id, name: data.name }, privateKey, { algorithm });
  res.cookie('jwt', token);
  return next();
};

export default githubOauth;
