import styled from 'styled-components';
import { setBorderAndRadius, setFlex } from '../../Style/util';
import {
  ROOM_INFO, BUTTON_EFFECT,
} from '../../Style/Lobby/constants';

export const RoomInfoWrapper = styled.div`
    align-items: center;
    padding: ${ROOM_INFO.PADDING};
    margin-bottom: ${ROOM_INFO.MARGIN_BOTTOM}px;
    color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.COLOR : ROOM_INFO.COLOR)};  
    cursor: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.CURSOR : ROOM_INFO.CURSOR)};
    box-shadow: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BOX_SHADOW : ROOM_INFO.BOX_SHADOW)};
    background-color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BACKGROUND_COLOR : ROOM_INFO.BACKGROUND_COLOR)};
    ${BUTTON_EFFECT.ACTIVE}
    ${setFlex('row', 'space-between')};
    ${setBorderAndRadius(ROOM_INFO)}
    ${(props) => (props.enterable ? BUTTON_EFFECT.HOVER : '')}
`;

export const RoomName = styled.div`
    white-space: pre;
    font-size: ${ROOM_INFO.FONT_SIZE}px;
`;

export const RoomCount = styled.div`
    font-size: ${ROOM_INFO.FONT_SIZE}px;
`;
