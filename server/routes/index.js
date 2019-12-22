import express from 'express';
import loginRouter from './login';
import adminRouter from './admin';

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/oauth', loginRouter);

export default router;
