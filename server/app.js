import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import socketio from 'socket.io';
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config';
import cors from 'cors';
import loginRouter from './routes/login';
import adminRouter from './routes/admin';
import controller from './controller';
import URL from './constants/url';
import ERROR_MSG from './constants/error-message';

const app = express();
const socketIo = socketio();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: URL.LOCAL_ORIGIN,
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use('/admin', adminRouter);
app.use('/oauth', loginRouter);

app.use((req, res, next) => {
  next(createError(404, ERROR_MSG.REQUEST_NOT_FOUND));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ result: false, message: err.message });
});

socketIo.on('connection', (socket) => controller.connectUser(socket));

export default { app, socketIo };
