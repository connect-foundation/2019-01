import styled from 'styled-components';
import { DASH_BOARD } from '../../../constants/room';

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
    width: ${DASH_BOARD.WIDTH}px;
    height: ${DASH_BOARD.HEIGHT}px;
    border-radius: 0.8rem;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-image: url("https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png");
`;

const QuizWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 20px 0px 20px 40px;
    margin-right: 147px;
    box-sizing: border-box;
    font-size: 24px;
    font-family: 'Nanum Gothic', sans-serif;
`;

const CounterWrapper = styled.div`
    position: absolute;
    width: 80px;
    padding: 10px 0px;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    text-align: center;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
    font-size: 28px;
`;

export {
  GameAreaWrapper, DashBoardWrapper, QuizWrapper, CounterWrapper,
};
