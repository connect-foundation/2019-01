/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';

import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText,
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

  /**
   *
   * @param {object} roundInfo
   * @param {number} roundInfo.round
   * @param {string} roundInfo.question
   * @param {Array.<Array.<undefined|User>>} roundInfo.characterLocations
   * @param {number} roundInfo.timeLimit
   */
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

  const endGame = () => {
    setGameStarted(false);
    setCounter('--');
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
