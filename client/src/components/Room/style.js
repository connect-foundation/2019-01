import styled from 'styled-components';
import { ROOM } from '../../constants/room';

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

// eslint-disable-next-line import/prefer-default-export
export { Wrapper };
