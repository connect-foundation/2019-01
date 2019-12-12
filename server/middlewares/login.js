import axios from 'axios';
import jwt from 'jsonwebtoken';
import userFinder from '../database/user';
import URL from '../constants/url';

const privateKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;

const githubOauth = async (req, res, next) => {
  const requestToken = req.query.code;
  const accessToken = await axios({
    method: 'post',
    url: URL.GET_ACCESS_TOKEN(requestToken),
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.data.access_token);

  const { data } = await axios(URL.GET_USER_INFO, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const userId = data.login;
  const [user] = await userFinder.fetchUserInfo(userId);

  if (user === undefined) {
    userFinder.registerUser(data.login);
  }

  const token = jwt.sign({ id: data.login }, privateKey, { algorithm });
  res.cookie('jwt', token);
  return next();
};

export default githubOauth;
