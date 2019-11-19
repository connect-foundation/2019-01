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
    margin: auto;
    width: ${DASH_BOARD.WIDTH}px;
    height: ${DASH_BOARD.HEIGHT}px;
    border-radius: 0.8rem;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-image: url("https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png");
`;

export { GameAreaWrapper, DashBoardWrapper };
