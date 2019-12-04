import styled from 'styled-components';
import { ROOM_INFO } from '../../../constants/lobby';

const RoomInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${ROOM_INFO.PADDING};
    margin-bottom: ${ROOM_INFO.MARGIN_BOTTOM}px;
    border: ${ROOM_INFO.BORDER};
    border-radius: ${ROOM_INFO.BORDER_RADIUS}px;
    background-color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BACKGROUND_COLOR : ROOM_INFO.BACKGROUND_COLOR)}; ;
    box-shadow: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BOX_SHADOW : ROOM_INFO.BOX_SHADOW)};
    color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.COLOR : ROOM_INFO.COLOR)};  
    cursor: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.CURSOR : ROOM_INFO.CURSOR)};
`;

const RoomName = styled.div`
    font-size: ${ROOM_INFO.FONT_SIZE}px;
`;

const RoomCount = styled.div`
    font-size: ${ROOM_INFO.FONT_SIZE}px;
`;

export { RoomInfoWrapper, RoomName, RoomCount };
