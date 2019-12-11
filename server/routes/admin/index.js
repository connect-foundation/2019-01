import express from 'express';
import isAdmin from '../../middlewares/isAdmin';
import userRouter from './user';
import nicknameNounRouter from './nickname-noun';
import nicknameAdjRouter from './nickname-adj';
import quizRouter from './quiz';
import imageRouter from './image';

const router = express.Router();

router.use(isAdmin);
router.use('/user', userRouter);
router.use('/nickname/noun', nicknameNounRouter);
router.use('/nickname/adj', nicknameAdjRouter);
router.use('/quiz', quizRouter);
router.use('/image', imageRouter);

export default router;
