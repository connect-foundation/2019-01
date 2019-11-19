import styled from 'styled-components';
import { ROOM } from '../../constants/room';

const BackGround = styled.div`
    position: relative;
    height: 100vh;
    background-image: url("https://i.imgur.com/MeTTcCQ.png");
`;

const Wrapper = styled.div`
    position: absolute; 
    display: flex;
    width: ${ROOM.getWidth()}px;
    height: ${ROOM.getHeight()}px;
    justify-content: space-between;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
`;

export { BackGround, Wrapper };
