import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import socketIo from 'socket.io';

import indexRouter from './routes/index';
import quiz from './models/quiz';


const app = express();

app.io = socketIo();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const quizModel = new quiz();
quizModel.getTenQuiz();


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // only providing error in development
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500);
    res.send({ message: err.message });
  }
});

app.io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('init', (data) => {
    console.log(data.name);
    socket.emit('welcome', `hello! ${data.name}`);
  });
});

export default app;
