import express from 'express';
import isAdmin from '../../middlewares/isAdmin';
import userRouter from './user';
import nicknameNounRouter from './nickname-noun';
import nicknameAdjRouter from './nickname-adj';
import quizRouter from './quiz';
import imageRouter from './image';
// 관리자인지 확인하기 위한 middleware
// 주석처리한 이유는 편하게 관리자 페이지 만들기 위해서...
// TODO: 추후 관리자 페이지 개발 완료 후 해당 주석처리 없앨 것!
// import isAdmin from '../../middlewares/isAdmin';

const router = express.Router();

router.use(isAdmin);
router.use('/user', userRouter);
router.use('/nickname/noun', nicknameNounRouter);
router.use('/nickname/adj', nicknameAdjRouter);
router.use('/quiz', quizRouter);
router.use('/image', imageRouter);

export default router;
