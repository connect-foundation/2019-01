import styled from 'styled-components';
import { setSize, setBorderAndRadius, setFlex } from '../../Style/util';
import {
  DASHBOARD, QUIZ, COUNTER, GAME_START_BUTTON, ROOM,
} from '../../Style/Room/constants';

export const GameAreaWrapper = styled.div`
    width: fit-content;
    height: 100%;
    box-sizing: border-box;
    ${setFlex('column', 'space-between')}
`;

export const DashBoardWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    background-size: 100% 100%;
    ${setSize(DASHBOARD)}
    ${setBorderAndRadius(DASHBOARD)}
`;

export const QuizWrapper = styled.div`
    position: absolute;
    width: ${QUIZ.WIDTH}px;
    top: 50%;
    left: ${QUIZ.LEFT}px;
    transform: translateY(-50%);
    font-size: ${QUIZ.FONT_SIZE}px;
`;

export const CounterWrapper = styled.div`
    position: absolute;
    width: ${COUNTER.WIDTH}px;
    padding: ${COUNTER.PADDING};
    top: 50%;
    right: ${COUNTER.RIGHT}px;
    transform: translateY(-50%);
    text-align: center;
    background-color: white;
    font-size: ${COUNTER.FONT_SIZE}px;
    ${setBorderAndRadius(COUNTER)}
`;

export const GameStartButton = styled.div`
    :active {
        box-shadow: ${GAME_START_BUTTON.BOX_SHADOW_CLICKED};
    }
    :hover {
        background-image: ${ROOM.BUTTON_HOVER_EFFECT};
    }

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${GAME_START_BUTTON.PADDING};
    font-size: ${GAME_START_BUTTON.FONT_SIZE}px;
    border-radius: ${ROOM.BORDER_RADIUS_SMALL}px;
    background-color: ${GAME_START_BUTTON.BACKGROUND_COLOR};
    box-shadow: ${GAME_START_BUTTON.BOX_SHADOW};
    cursor: pointer;
`;

const DashboardText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${GAME_START_BUTTON.FONT_SIZE}px;
`;

export const WaitingText = DashboardText;
export const GameEndText = DashboardText;
