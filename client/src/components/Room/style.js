import styled from 'styled-components';
import { ROOM, SOUND_TOGGLE } from '../../constants/room';

export const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: ${ROOM.getWidth()}px;
    height: ${ROOM.getHeight() + SOUND_TOGGLE.HEIGHT}px;
    justify-content: space-between;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
`;

export const RoomWrapper = styled.div`
    display: flex;
    width: ${ROOM.getWidth()}px;
    height: ${ROOM.getHeight()}px;
    justify-content: space-between;
`;

export const SoundToggleWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: ${SOUND_TOGGLE.HEIGHT}px;
    width: 100%;
    box-sizing: border-box;
    padding-right: ${SOUND_TOGGLE.PADDING_RIGHT}px;
`;

export const SoundToggle = styled.span`
    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
    font-size: ${SOUND_TOGGLE.FONT_SIZE}px;
    width: fit-content;
    height: 100%;
`;
