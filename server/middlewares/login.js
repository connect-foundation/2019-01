import axios from 'axios';
import jwt from 'jsonwebtoken';
import userFinder from '../database/user';
import { getTimeOneDayLater } from '../util';
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

  const githubId = await axios({
    method: 'get',
    url: URL.GET_USER_INFO,
    headers: {
      Authorization: `token ${accessToken}`,
    },
  }).then((response) => response.data.login);

  const [user] = await userFinder.fetchUser(githubId);
  if (user === undefined) userFinder.registerUser(githubId);

  const token = jwt.sign({ githubId }, privateKey, { algorithm });
  res.cookie('_jwt', token, { expires: getTimeOneDayLater() });

  next();
};

export default githubOauth;
