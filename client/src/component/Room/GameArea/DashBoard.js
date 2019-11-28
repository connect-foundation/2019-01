import React, { useState, useEffect } from 'react';

import {
  DashBoardWrapper, QuizWrapper, CounterWrapper, GameStartButton, WaitingText, GameEndText,
} from './style';
import { DASHBOARD } from '../../../constants/room';
import socket from '../../../class/socket';

const changeNumberToTwoDigitString = (num) => num.toString().padStart(2, '0');
const colorArray = ['red', 'red', 'orange', 'orange', 'green', 'green', 'blue'];
const getCounterColor = (counter) => (counter >= colorArray.length ? 'black' : colorArray[counter]);

const DashBoard = () => {
  const [notice, setNotice] = useState('');
  const [counter, setCounter] = useState('--');
  const [time, setTime] = useState();
  const [GameStarted, setGameStarted] = useState(false);
  const [owner, setOwner] = useState(true);
  const [GameEnded, setGameEnded] = useState(false);

  const counterHandler = () => {
    setCounter((_counter) => {
      if (_counter > 1) {
        setTimeout(counterHandler, 1000);
        return _counter - DASHBOARD.A_SECOND;
      }
      // 여기서 카운트 끝났을 떄 로직 작성하면 됨.
      return 0;
    });
  };

  const startCounter = () => {
    setTimeout(counterHandler, 1000);
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
  const startRound = (roundInfo) => {
    const {
      round, question, timeLimit,
    } = roundInfo;

    if (round === 0) { setGameStarted(true); }

    setCounter(timeLimit);
    setNotice(question);
    startCounter();
  };

  const endRound = ({ round, comment, answer }) => {
    const answerText = `[정답 : ${answer ? 'TRUE' : 'FALSE'}]`;
    const noticeText = `${answerText} ${comment}`;
    setNotice(noticeText);
  };

  const endGame = () => {
    setGameEnded(true);
    setNotice('↓↓↓↓   우승   ↓↓↓↓');
    setTimeout(() => {
      setGameEnded(false);
    }, 3000);
  };

  const Greeting = () => (
    owner
      ? <GameStartButton onClick={startGame}>start( );</GameStartButton>
      : <WaitingText>waiting...</WaitingText>
  );

  const QuizOrGreeting = () => (
    GameStarted
      ? <QuizWrapper>{notice}</QuizWrapper>
      : <Greeting />
  );

  const QuizOrGreetingOrCounterWrapper = () => (
    GameEnded && GameStarted
      ? (
        <div>
          <GameEndText> {notice} </GameEndText>
        </div>
      )
      : (
        <div>
          <QuizOrGreeting />
          <CounterWrapper style={{ color: getCounterColor(counter) }}>
            {changeNumberToTwoDigitString(counter)}
          </CounterWrapper>
        </div>
      )
  );


  useEffect(() => {
    setCounter('--');
    socket.onStartRound(startRound);
    socket.onEndRound(endRound);
    socket.onEndGame(endGame);
  }, []);

  // TODO: 카운트 시작하는 방법이 전광판 클릭하는 것. 추후 서버 통신에 의해 시작되도록 변경해야함.
  return (
    <DashBoardWrapper style={{ backgroundImage: `url("${DASHBOARD.BACKGROUND}")` }}>
      <QuizOrGreetingOrCounterWrapper />
      {/* <QuizOrGreeting />
      <CounterWrapper style={{ color: getCounterColor(counter) }}>
        {changeNumberToTwoDigitString(counter)}
      </CounterWrapper> */}
    </DashBoardWrapper>
  );
};

export default DashBoard;
