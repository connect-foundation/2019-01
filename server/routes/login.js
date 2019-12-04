import express from 'express';
import githubOauth from '../middlewares/oauth';
import URL from '../constants/url';

const router = express.Router();

router.get('/', githubOauth, async (req, res) => {
  res.redirect(URL.REACT_LOBBY);
});

export default router;
