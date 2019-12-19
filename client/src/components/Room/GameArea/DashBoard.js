/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '../../../modules/socket';
import { makeWithTwoDigits } from '../../../util';
import { DASHBOARD, ROOM } from '../../../constants/room';
import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText, GameEndText,
} from './style';

const DashBoard = ({ buttonClickSound }) => {
  const [notice, setNotice] = useState('');
  const [counter, setCounter] = useState('--');
  const [owner, setOwner] = useState(false);
  const [isGameEnded, setGameEnded] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  let lastTimerId;

  /**
   * @param {object} param0
   * @param {boolean} param0.isOwner
   */
  const leaveUser = ({ isOwner }) => {
    if (isOwner !== undefined) setOwner(isOwner);
  };

  const countDown = () => {
    setCounter((prevCounter) => {
      if (prevCounter > 1) {
        lastTimerId = setTimeout(countDown, DASHBOARD.SECOND_MS);
        return prevCounter - DASHBOARD.SECOND;
      }
      return 0;
    });
  };

  const startCountDown = () => {
    lastTimerId = setTimeout(countDown, DASHBOARD.SECOND_MS);
  };

  const readyGame = () => {
    setGameStarted(true);
    setCounter(ROOM.WAITING_TIME_MS / DASHBOARD.SECOND_MS);
    setNotice(DASHBOARD.NOTICE_START_MESSAGE);
    startCountDown();
  };

  const startGame = () => {
    buttonClickSound.play();
    socket.emitStartGame();
  };

  /**
   * @param {Object} param0
   *   @param {string} param0.question
   *   @param {number} param0.timeLimit
   */
  const startRound = ({ question, timeLimit }) => {
    if (question !== undefined) setNotice(question);
    if (timeLimit !== undefined) {
      setGameStarted(true);
      setCounter(timeLimit);
      startCountDown();
    }
  };

  /**
   * @param {*} param0
   *   @param {string} param0.comment
   *   @param {boolean} param0.answer
   */
  const endRound = ({ comment, answer }) => {
    const answerText = `[정답 : ${answer ? 'TRUE' : 'FALSE'}]`;
    const noticeText = `${answerText} ${comment}`;
    setNotice(noticeText);
  };

  const endGame = () => {
    setGameEnded(true);
    setNotice(DASHBOARD.WIN_MESSAGE);
  };

  const resetGame = () => {
    setGameEnded(false);
    setGameStarted(false);
    setCounter('--');
  };

  /**
   * @param {object} param0
   *   @param {string} param0.question
   *   @param {boolean} param0.isGameStarted
   *   @param {number} param0.timeLimit
   *   @param {boolean} param0.question
   */
  const enterRoom = ({
    question, isGameStarted, timeLimit, isOwner,
  }) => {
    if (question !== undefined) setNotice(question);
    if (isGameStarted !== undefined) setGameStarted(isGameStarted);
    if (isOwner !== undefined) setOwner(isOwner);
    if (isGameStarted && timeLimit > 0) {
      setCounter(timeLimit);
      startCountDown();
    }
  };


  const Greeting = () => (
    owner
      ? <GameStartButton onClick={startGame}>start( );</GameStartButton>
      : <WaitingText>pending...</WaitingText>
  );

  const QuizOrGreeting = () => (
    isGameStarted
      ? <QuizWrapper>{notice}</QuizWrapper>
      : <Greeting />
  );

  const DashBoardContents = () => (
    isGameEnded && isGameStarted
      ? <GameEndText> {notice} </GameEndText>
      : (
        <>
          <QuizOrGreeting />
          <CounterWrapper counter={counter}>
            {makeWithTwoDigits(counter)}
          </CounterWrapper>
        </>
      )
  );

  useEffect(() => {
    socket.onEnterRoom(enterRoom);
    socket.onLeaveUser(leaveUser);
    socket.onStartGame(readyGame);
    socket.onEndGame(endGame);
    socket.onResetGame(resetGame);
    socket.onStartRound(startRound);
    socket.onEndRound(endRound);

    return () => {
      socket.offEnterRoom();
      socket.offLeaveUser();
      socket.offStartGame();
      socket.offEndGame();
      socket.offResetGame();
      socket.offStartRound();
      socket.offEndRound();
      clearTimeout(lastTimerId);
    };
  }, []);

  return (
    <DashBoardWrapper style={{ backgroundImage: `url("${DASHBOARD.BACKGROUND}")` }}>
      <DashBoardContents />
    </DashBoardWrapper>
  );
};

DashBoard.propTypes = {
  buttonClickSound: PropTypes.shape({
    play: PropTypes.func.isRequired,
  }).isRequired,
};

export default DashBoard;
