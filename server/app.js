import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import socketio from 'socket.io';
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config';
import indexRouter from './routes/index';
import loginRouter from './routes/login';
import adminRouter from './routes/admin';
import controller from './controller';

const app = express();
const socketIo = socketio();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/oauth', loginRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ result: false, message: err.message });
});

socketIo.on('connection', (socket) => {
  console.log('a user connected');
  controller.connectUser(socket);
});

export default { app, socketIo };
