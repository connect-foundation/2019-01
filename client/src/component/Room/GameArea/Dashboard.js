/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';

import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText, GameEndText,
} from './style';
import { DASHBOARD } from '../../../constants/room';
import socket from '../../../class/socket';

const ONE_SECOND = 1000;
const changeNumberToTwoDigitString = (num) => num.toString().padStart(2, '0');
const colorArray = ['red', 'red', 'orange', 'orange', 'green', 'green', 'blue'];
const getCounterColor = (counter) => (counter >= colorArray.length ? 'black' : colorArray[counter]);

const DashBoard = () => {
  const [notice, setNotice] = useState('');
  const [counter, setCounter] = useState('--');
  const [GameEnded, setGameEnded] = useState(false);
  const [owner, setOwner] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const counterHandler = () => {
    setCounter((_counter) => {
      if (_counter > 1) {
        setTimeout(counterHandler, ONE_SECOND);
        return _counter - DASHBOARD.A_SECOND;
      }
      return 0;
    });
  };

  const startCounter = () => {
    setTimeout(counterHandler, ONE_SECOND);
  };

  const startGame = () => {
    socket.emitStartGame();
  };

  const startRound = ({ question, timeLimit }) => {
    if (question !== undefined) setNotice(question);
    if (timeLimit !== undefined) {
      setGameStarted(true);
      setCounter(timeLimit);
      startCounter();
    }
  };

  const endRound = ({ comment, answer }) => {
    const answerText = `[정답 : ${answer ? 'TRUE' : 'FALSE'}]`;
    const noticeText = `${answerText} ${comment}`;
    setNotice(noticeText);
  };

  /**
   * 코드 리뷰
   * setTimeout으로 setState를 호출하는 것은 괜찮나요?
   */
  const endGame = () => {
    setGameEnded(true);
    setNotice('↓↓↓↓   우승   ↓↓↓↓');
    setTimeout(() => {
      setGameEnded(false);
      setGameStarted(false);
      setCounter('--');
    }, 3000);
  };

  const enterRoom = ({
    question, isGameStarted, timeLimit, isOwner,
  }) => {
    if (question !== undefined) setNotice(question);
    if (isGameStarted !== undefined) setGameStarted(isGameStarted);
    if (isOwner !== undefined) setOwner(isOwner);
    if (isGameStarted && timeLimit > 0) {
      setCounter(timeLimit);
      startCounter();
    }
  };

  const leaveUser = ({ isOwner }) => {
    if (isOwner !== undefined) setOwner(isOwner);
  };

  /**
   * 코드 리뷰
   * 
   * Greeting, QuzOrGreeting, QuizOrGreetingOrCounterWrapper처럼 중첩되는 컴포넌트를 작성했는데요
   * 작동은 잘 되지만 왠지 꺼림칙한 면이 있어서 코드리뷰 요청합니다.
   */
  const Greeting = () => (
    owner
      ? <GameStartButton onClick={startGame}>start( );</GameStartButton>
      : <WaitingText>waiting...</WaitingText>
  );

  const QuizOrGreeting = () => (
    isGameStarted
      ? <QuizWrapper>{notice}</QuizWrapper>
      : <Greeting />
  );

  const QuizOrGreetingOrCounterWrapper = () => (
    GameEnded && isGameStarted
      ? <GameEndText> {notice} </GameEndText>
      : (
        <div>
          <QuizOrGreeting />
          <CounterWrapper style={{ color: getCounterColor(counter) }}>
            {changeNumberToTwoDigitString(counter)}
          </CounterWrapper>
        </div>
      )
  );
  const readyGame = () => {
    setGameStarted(true);
    setCounter(3);
    setNotice('게임이 곧 시작됩니다.');
    startCounter();
  };


  useEffect(() => {
    socket.onEnterRoom(enterRoom);
    socket.onLeaveUser(leaveUser);
    socket.onStartRound(startRound);
    socket.onEndRound(endRound);
    socket.onEndGame(endGame);
    socket.onStartGame(readyGame);
  }, []);

  return (
    <DashBoardWrapper style={{ backgroundImage: `url("${DASHBOARD.BACKGROUND}")` }}>
      <QuizOrGreetingOrCounterWrapper />
    </DashBoardWrapper>
  );
};

export default DashBoard;
