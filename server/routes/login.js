import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const requestToken = req.query.code;
  const { data: { access_token } } = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
      accept: 'application/json',
    },
  });

  const accessToken = access_token;

  const { data } = await axios('https://api.github.com/user', {
    headers: {
      // Include the token in the Authorization header
      Authorization: `token ${accessToken}`,
    },
  });
  console.log(data);
});

export default router;
