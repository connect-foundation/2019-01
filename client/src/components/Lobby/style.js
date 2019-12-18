import styled from 'styled-components';
import { setSize, setFlex, setBorderAndRadius } from '../Style/util';
import {
  LOBBY, NICKNAME, HEADER, BODY, ROOM_INFO, CREATE_ROOM_BUTTON, BUTTON_EFFECT,
} from '../Style/Lobby/constants';


export const LobbyWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${LOBBY.PADDING};
    box-sizing: border-box;
    background-color: ${LOBBY.BACKGROUND_COLOR};
    font-size: ${LOBBY.FONT_SIZE}px; 
    ${setBorderAndRadius(LOBBY)}
    ${setSize(LOBBY)}
`;

export const LobbyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: ${HEADER.HEIGHT}px;
    padding: ${HEADER.PADDING};
    box-sizing: border-box;
`;

export const LobbyBody = styled.div`
    height: ${BODY.HEIGHT}px;
    padding: ${BODY.PADDING};
    box-sizing: border-box;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: ${BODY.SCROLLBAR.WIDTH}px;
    }
    ::-webkit-scrollbar-track {
        background: ${BODY.SCROLLBAR.TRACK_COLOR};
    }
    ::-webkit-scrollbar-thumb {
        background: ${BODY.SCROLLBAR.THUMB_COLOR};
        border-radius: ${BODY.SCROLLBAR.THUMB_BORDER_RADIUS}px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${BODY.SCROLLBAR.THUMB_COLOR_HOVER};
    }
`;

export const LobbyNickname = styled.div`
    font-size: ${NICKNAME.FONT_SIZE}px;
`;

export const CreateRoomButton = styled.div`
    :active {
        box-shadow: ${CREATE_ROOM_BUTTON.CLICKED_EFFECT};
    }

    text-align: center;
    margin-bottom: ${CREATE_ROOM_BUTTON.MARGIN_BOTTOM}px;
    padding: ${CREATE_ROOM_BUTTON.PADDING};
    background-color: ${CREATE_ROOM_BUTTON.BACKGROUND_COLOR};
    cursor: pointer;
    ${BUTTON_EFFECT.HOVER}
    ${setBorderAndRadius(CREATE_ROOM_BUTTON)}
`;

export const RoomInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${ROOM_INFO.PADDING};
    margin-bottom: ${ROOM_INFO.MARGIN_BOTTOM}px;
    ${setBorderAndRadius(ROOM_INFO)}
    background-color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BACKGROUND_COLOR : ROOM_INFO.BACKGROUND_COLOR)}; ;
    box-shadow: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.BOX_SHADOW : ROOM_INFO.BOX_SHADOW)};
    color: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.COLOR : ROOM_INFO.COLOR)};  
    cursor: ${(props) => (props.enterable ? ROOM_INFO.ENTERABLE.CURSOR : ROOM_INFO.CURSOR)};
`;
