import express from 'express';
import githubOauth from '../middlewares/login';
import githubLogout from '../middlewares/logout';
import URL from '../constants/url';

const router = express.Router();
const oauthUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_REACT_OAUTH : URL.LOCAL_REACT_OAUTH;
const lobbyUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_REACT_LOBBY : URL.LOCAL_REACT_LOBBY;

router.get('/github', githubOauth, (req, res) => {
  res.redirect(oauthUrl);
});

router.get('/github/logout', githubLogout, (req, res) => {
  res.redirect(lobbyUrl);
});

export default router;
