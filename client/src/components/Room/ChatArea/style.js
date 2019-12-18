import styled from 'styled-components';
import {
  CHAT_AREA, ROOM, QUIZ, ROOM_NAME,
} from '../../../constants/room';
import {
  setSize, setBorderAndRadius, setPercentSize, setFlex,
} from '../../Style/util';

export const ChatAreaWrapper = styled.div`
    box-sizing: border-box;
    padding: 1%;
    background-color: ${CHAT_AREA.BG_COLOR};
    ${setSize(CHAT_AREA)}
    ${setBorderAndRadius(CHAT_AREA)}
    ${setFlex('column', 'space-between')}
`;

export const ChatHeader = styled.div`
    box-sizing: border-box;
    margin: ${ROOM_NAME.WRAPPER_MARGIN};
    ${setPercentSize(CHAT_AREA.CHAT_HEADER)}
    ${setFlex('row', 'space-between')}
`;

export const RoomInfo = styled.div`
    ${setPercentSize(CHAT_AREA.ROOM_INFO)}
    ${setFlex('row', 'space-between')}
`;

export const PlayerInfo = styled.div`
    align-items: center;
    font-size: ${QUIZ.FONT_SIZE}px;
    ${setPercentSize(CHAT_AREA.PLAYER_INFO)}
    ${setFlex('row', 'space-between')}
`;

export const Emoji = styled.div.attrs((props) => ({
  style: { backgroundImage: `url(${props.url})` },
}))`
    background-size: 100% 100%;
    margin-left: 10%;
    ${setPercentSize(CHAT_AREA.EMOJI)}
`;

const buttonStyle = styled.button`
    :active {
        box-shadow: none;
        color: gray;
    }
    :hover {
        background-image: ${ROOM.BUTTON_HOVER_EFFECT};
    }
    :focus {
        outline: none;
    }
    background-color: ${CHAT_AREA.BUTTON_COLOR};
    box-shadow: ${CHAT_AREA.BOX_SHADOW};
    color: black;
    cursor: pointer;
    box-sizing: border-box;
    font-size: ${QUIZ.FONT_SIZE}px;
    text-align: center;
    align-items: center;
    font-family: ${ROOM.FONT_FAMILY};
    ${setFlex('row', 'center')}
    ${setBorderAndRadius(CHAT_AREA)}
`;

export const ExitButton = styled(buttonStyle).attrs({
  disabled: (props) => (props.isGameStarted ? 'disabled' : ''),
})`
    color: ${(props) => (props.isGameStarted ? 'gray' : 'black')};
    cursor: ${(props) => (props.isGameStarted ? 'default' : 'pointer')};
    background-image: ${(props) => (props.isGameStarted ? ROOM.BUTTON_HOVER_EFFECT : 'none')};
    box-shadow: ${(props) => (props.isGameStarted ? 'none' : CHAT_AREA.BOX_SHADOW)};
    ${setPercentSize(CHAT_AREA.EXIT_BUTTON)}
`;

export const ChatCanvas = styled.canvas`
    display: none;
`;

export const ChatLog = styled.div`
    max-width: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 3%;
    margin: 8% 0;
    ${setPercentSize(CHAT_AREA.CHAT_LOG)}
`;

export const ChatNotice = styled.div`
    text-align: center;
    color: coral;
    font-weight: bold;
    margin-bottom: 10%;
`;

export const Chat = styled.div`
    width: 100%;
    margin-bottom: 1%;
`;

export const ChatNickname = styled.span`
    font-weight: bold;
`;

export const ChatMessage = styled.span`
    max-width: 100%;
    word-wrap: break-word;
    line-height: ${QUIZ.FONT_SIZE}px;
`;

export const ChatInput = styled.div`
    ${setPercentSize(CHAT_AREA.CHAT_INPUT)}
    ${setFlex('row', 'space-between')}
`;

export const InputBox = styled.input.attrs({
  type: 'text',
  maxLength: CHAT_AREA.MAX_MESSAGE_LENGTH,
})`
    box-sizing: border-box;
    padding: 0 3%;
    font-size: ${CHAT_AREA.FONT_SIZE}px;
    box-shadow: ${CHAT_AREA.BOX_SHADOW};
    font-family: ${ROOM.FONT_FAMILY};
    &:focus {
        outline: none;
    };
    ${setPercentSize(CHAT_AREA.CHAT_INPUT_BOX)}
    ${setBorderAndRadius(CHAT_AREA)}
`;

export const SendButton = styled(buttonStyle)`
    ${setPercentSize(CHAT_AREA.SEND_BUTTON)}
`;
