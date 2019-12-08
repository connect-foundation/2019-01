import express from 'express';
import githubOauth from '../middlewares/oauth';
import githubLogout from '../middlewares/logout';
import URL from '../constants/url';

const router = express.Router();

router.get('/github', githubOauth, async (req, res) => {
  const lobbyUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_REACT_LOBBY : URL.LOCAL_REACT_LOBBY;
  res.redirect(lobbyUrl);
});

router.get('/github/logout', githubLogout, async (req, res) => {
  res.send(true);
});

export default router;
