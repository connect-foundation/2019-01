import express from 'express';
import axios from 'axios';
import userFinder from '../database/user';

const router = express.Router();

router.get('/', async (req, res) => {
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

  console.log(data);
  const userId = userFinder.fetchUserInfo(data.id).gitnub_id;
  if (userId === undefined) {
    userFinder.registerUser(data.id, data.name);
  }

  res.redirect('http://localhost:3006/lobby');
});

export default router;
