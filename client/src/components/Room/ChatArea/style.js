import styled from 'styled-components';
import {
  CHAT_AREA, ROOM, QUIZ, ROOM_NAME,
} from '../../../constants/room';

export const ChatAreaWrapper = styled.div`
    width: ${CHAT_AREA.WIDTH}px;
    height: ${ROOM.getHeight()}px;
    box-sizing: border-box;
    padding: 1%;
    border: ${CHAT_AREA.BORDER};
    border-radius: ${ROOM.BORDER_RADIUS_SMALL}px;
    background-color: ${CHAT_AREA.BG_COLOR};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ChatHeader = styled.div`
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin: ${ROOM_NAME.WRAPPER_MARGIN};
`;

export const RoomInfo = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
`;

export const PlayerInfo = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${QUIZ.FONT_SIZE}px;
`;

export const Emoji = styled.div.attrs((props) => ({
  style: { backgroundImage: `url(${props.url})` },
}))`
    background-size: 100% 100%;
    width: 40%;
    height: 50%;
    margin-left: 10%;
`;

const buttonStyle = `
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
    border: ${CHAT_AREA.BORDER};
    border-radius: ${ROOM.BORDER_RADIUS_SMALL}px;
    background-color: ${CHAT_AREA.BUTTON_COLOR};
    box-shadow: ${CHAT_AREA.BOX_SHADOW};
    color: black;
    cursor: pointer;
    box-sizing: border-box;
    font-size: ${QUIZ.FONT_SIZE}px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${ROOM.FONT_FAMILY};
`;

export const ExitButton = styled.button.attrs({
  disabled: (props) => (props.isGameStarted ? 'disabled' : ''),
})`
    width: 25%;
    height: 100%;
    ${buttonStyle}
    color: ${(props) => (props.isGameStarted ? 'gray' : 'black')};
    cursor: ${(props) => (props.isGameStarted ? 'default' : 'pointer')};
    background-image: ${(props) => (props.isGameStarted ? ROOM.BUTTON_HOVER_EFFECT : 'none')};
    box-shadow: ${(props) => (props.isGameStarted ? 'none' : CHAT_AREA.BOX_SHADOW)};
`;

export const ChatLog = styled.div`
    width: 100%;
    max-width: 100%;
    height: 75%;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 3%;
    margin: 8% 0;
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

export const ChatNinkname = styled.span`
    font-weight: bold;
`;

export const ChatMessage = styled.span`
    max-width: 100%;
    word-wrap: break-word;
    line-height: ${QUIZ.FONT_SIZE}px;
`;

export const ChatInput = styled.div`
    display: flex;
    width: 100%;
    height: 8%;
    justify-content: space-between;
`;

export const InputBox = styled.input.attrs({
  type: 'text',
  maxLength: CHAT_AREA.MAX_MESSAGE_LENGTH,
})`
    width: 72%;
    height: 100%;
    border-radius: ${ROOM.BORDER_RADIUS_SMALL}px;
    box-sizing: border-box;
    padding: 0 3%;
    font-size: ${CHAT_AREA.FONT_SIZE}px;
    box-shadow: ${CHAT_AREA.BOX_SHADOW};
    border: ${CHAT_AREA.BORDER};
    font-family: ${ROOM.FONT_FAMILY};
    &:focus {
        outline: none;
    };
`;

export const SendButton = styled.button`
    width: 25%;
    height: 100%;
    ${buttonStyle}
`;
