/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText, GameEndText,
} from './style';
import { DASHBOARD, ROOM } from '../../../constants/room';
import socket from '../../../modules/socket';
import { makeWithTwoDigits } from '../../../util';

const colorArray = DASHBOARD.CLOCK_COLOR_ARRAY;
const getCounterColor = (counter) => (counter >= colorArray.length ? 'black' : colorArray[counter]);

const DashBoard = ({ buttonClickSound }) => {
  const [notice, setNotice] = useState('');
  const [counter, setCounter] = useState('--');
  const [owner, setOwner] = useState(false);
  const [isGameEnded, setGameEnded] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  let lastTimerId;

  const counterHandler = () => {
    setCounter((_counter) => {
      if (_counter > 1) {
        lastTimerId = setTimeout(counterHandler, DASHBOARD.SECOND_MS);
        return _counter - DASHBOARD.SECOND;
      }
      return 0;
    });
  };

  const startCounter = () => {
    lastTimerId = setTimeout(counterHandler, DASHBOARD.SECOND_MS);
  };

  const startGame = () => {
    buttonClickSound.play();
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
    setGameEnded(true);
    setNotice(DASHBOARD.WIN_MESSAGE);
  };

  const resetGame = () => {
    setGameEnded(false);
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
        <div>
          <QuizOrGreeting />
          <CounterWrapper style={{ color: getCounterColor(counter) }}>
            {makeWithTwoDigits(counter)}
          </CounterWrapper>
        </div>
      )
  );

  const readyGame = () => {
    setGameStarted(true);
    setCounter(ROOM.WAITING_TIME_MS / DASHBOARD.SECOND_MS);
    setNotice(DASHBOARD.NOTICE_START_MESSAGE);
    startCounter();
  };

  useEffect(() => {
    socket.onEnterRoom(enterRoom);
    socket.onLeaveUser(leaveUser);
    socket.onStartRound(startRound);
    socket.onEndRound(endRound);
    socket.onEndGame(endGame);
    socket.onResetGame(resetGame);
    socket.onStartGame(readyGame);

    return () => {
      socket.offEnterRoom();
      socket.offLeaveUser();
      socket.offStartRound();
      socket.offEndRound();
      socket.offResetGame();
      socket.offEndGame();
      socket.offResetGame();
      socket.offStartGame();
      clearTimeout(lastTimerId);
    };
  }, []);

  // TODO: 카운트 시작하는 방법이 전광판 클릭하는 것. 추후 서버 통신에 의해 시작되도록 변경해야함.
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
