import styled from 'styled-components';
import { setSize, setFlex } from '../Style/util';
import { ROOM, SOUND_TOGGLE } from '../Style/Room';

export const Wrapper = styled.div`
    position: absolute;
    width: ${ROOM.getWidth()}px;
    height: ${ROOM.getHeight() + SOUND_TOGGLE.HEIGHT}px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
    ${setFlex('column', 'space-between')}
`;

export const RoomWrapper = styled.div`
    ${setSize(ROOM)}
    ${setFlex('row', 'space-between')}
`;

export const SoundToggleWrapper = styled.div`
    height: ${SOUND_TOGGLE.HEIGHT}px;
    width: 100%;
    box-sizing: border-box;
    padding-right: ${SOUND_TOGGLE.PADDING_RIGHT}px;
    ${setFlex('row-reverse')}
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
