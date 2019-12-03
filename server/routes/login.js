import express from 'express';
import githubOauth from '../middlewares/oauth';

const router = express.Router();

router.use(githubOauth);

router.get('/', async (req, res) => {
  res.redirect('http://localhost:3006/lobby');
});

export default router;
