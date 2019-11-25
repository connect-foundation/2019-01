import React, { useState, useEffect } from 'react';

import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText,
} from './style';
import { DASHBOARD } from '../../../constants/room';
import socket from '../../../class/socket';

const changeNumberToTwoDigitString = (num) => num.toString().padStart(2, '0');
const colorArray = ['red', 'red', 'orange', 'orange', 'green', 'green', 'blue'];
const getCounterColor = (counter) => (counter >= colorArray.length ? 'black' : colorArray[counter]);

const DashBoard = () => {
  const [quiz, setQuiz] = useState('');
  const [counter, setCounter] = useState('--');
  const [time, setTime] = useState();
  const [GameStarted, setGameStarted] = useState(false);
  const [owner, setOwner] = useState(true);

  const quizListHandler = (data) => {
    const getNextQuiz = () => data.shift().question;
    const showNextQuiz = () => {
      if (data.length === 0) return;
      setQuiz(getNextQuiz);
      setTimeout(showNextQuiz, 1000);
    };
    return setTimeout(showNextQuiz, 1000);
  };

  useEffect(() => {
    setCounter('--');
    setTime(10);
    socket.onQuizList(quizListHandler);
  }, []);

  const counterHandler = () => {
    setCounter((_counter) => {
      if (_counter > 1) {
        setTimeout(counterHandler, 1000);
        return _counter - 1;
      }
      // 여기서 카운트 끝났을 떄 로직 작성하면 됨.
      console.log('end!');
      return 0;
    });
  };

  const startCounter = () => {
    setCounter(time);
    setTimeout(counterHandler, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    socket.emitStartGame();
    startCounter();
  };

  const endGame = () => {
    setGameStarted(false);
    setCounter('--');
  };

  const Greeting = () => (
    owner
      ? <GameStartButton onClick={startGame}>start( );</GameStartButton>
      : <WaitingText>waiting...</WaitingText>
  );

  const QuizOrGreeting = () => (
    GameStarted
      ? <QuizWrapper onClick={endGame}>{quiz}</QuizWrapper>
      : <Greeting />
  );

  // TODO: 카운트 시작하는 방법이 전광판 클릭하는 것. 추후 서버 통신에 의해 시작되도록 변경해야함.
  return (
    <DashBoardWrapper style={{ backgroundImage: `url("${DASHBOARD.BACKGROUND}")` }}>
      <QuizOrGreeting />
      <CounterWrapper style={{ color: getCounterColor(counter) }}>
        {changeNumberToTwoDigitString(counter)}
      </CounterWrapper>
    </DashBoardWrapper>
  );
};

export default DashBoard;
