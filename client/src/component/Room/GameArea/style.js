import styled from 'styled-components';
import {
  DASHBOARD, QUIZ, COUNTER, GAME_START_BUTTON,
} from '../../../constants/room';

const GameAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: fit-content;
    height: 100%;
    box-sizing: border-box;
`;

const DashBoardWrapper = styled.div`
    position: relative;
    margin: auto;
    width: ${DASHBOARD.WIDTH}px;
    height: ${DASHBOARD.HEIGHT}px;
    border: 2px solid gray;
    border-radius: 0.8rem;
    box-sizing: border-box;
    background-size: 100% 100%;
`;

const QuizWrapper = styled.div`
    position: absolute;
    width: ${QUIZ.WIDTH}px;
    top: 50%;
    left: ${QUIZ.LEFT}px;
    transform: translateY(-50%);
    font-size: ${QUIZ.FONTSIZE}px;
`;

const CounterWrapper = styled.div`
    position: absolute;
    width: ${COUNTER.WIDTH}px;
    padding: ${COUNTER.PADDING};
    top: 50%;
    right: ${COUNTER.RIGHT}px;
    transform: translateY(-50%);
    text-align: center;
    border: 1px solid black;
    border-radius: 0.8rem;
    background-color: white;
    font-size: ${COUNTER.FONTSIZE}px;
`;

const GameStartButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${GAME_START_BUTTON.PADDING};
    font-size: ${GAME_START_BUTTON.FONTSIZE}px;
    border-radius: 0.8rem;
    background-color: ${GAME_START_BUTTON.BACKGROUND_COLOR};
    border: 0;
    box-shadow: ${GAME_START_BUTTON.BOX_SHADOW};
    cursor: pointer;
`;

const WaitingText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${GAME_START_BUTTON.FONTSIZE}px;
`;

const GameEndText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${GAME_START_BUTTON.FONTSIZE}px;
`;

export {
  GameAreaWrapper, DashBoardWrapper, QuizWrapper, CounterWrapper,
  GameStartButton, WaitingText, GameEndText,
};
