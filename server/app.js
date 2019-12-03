import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import socketio from 'socket.io';
import {} from 'dotenv/config';
import indexRouter from './routes/index';
import loginRouter from './routes/login';
import controller from './controller';

const app = express();
const socketIo = socketio();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/githubLogin', loginRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500);
    res.send({ message: err.message });
  }
});

socketIo.on('connection', (socket) => {
  console.log('a user connected');
  controller.connectUser(socket);
});

export default { app, socketIo };
