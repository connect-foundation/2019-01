import styled from 'styled-components';
import { CHAT_AREA } from '../../../constants/room';

const ChatAreaWrapper = styled.div`
    width: ${CHAT_AREA.WIDTH}px;
    height: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    background-color: ${CHAT_AREA.BG_COLOR};
`;

export default ChatAreaWrapper;
