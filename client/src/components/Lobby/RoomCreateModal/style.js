import styled from 'styled-components';
import {
  MODAL, HEADER, TITLE, CLOSE_BUTTON, INPUT, CREATE_ROOM_BUTTON,
} from '../../Style/Modal';
import { setBorderAndRadius, setFlex } from '../../Style/util';
import { BUTTON_EFFECT } from '../../Style/Lobby';

export const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${MODAL.WIDTH}px;
    padding: ${MODAL.PADDING};
    transform: translate(-50%,-50%);
    background: ${MODAL.BACKGROUND_COLOR};
    ${setBorderAndRadius(MODAL)}
`;

export const ModalHeader = styled.div`
    width: 100%;
    align-items: baseline;
    margin-bottom: ${HEADER.MARGIN_BOTTOM}px;
    ${setFlex('row', 'space-between')}
`;

export const ModalTitle = styled.div`
    font-size: ${TITLE.FONT_SIZE}px;
`;

export const ModalCloseButton = styled.span`
    font-size: ${CLOSE_BUTTON.FONT_SIZE}px;
    cursor: pointer;
    ${BUTTON_EFFECT.HOVER}
`;

export const ModalInputWrapper = styled.div`
    width: 100%;
    align-items: baseline;
    box-sizing: border-box;
    padding: ${INPUT.WRAPPER.PADDING};
    margin-bottom: ${INPUT.WRAPPER.MARGIN_BOTTOM}px;
    box-shadow: ${INPUT.WRAPPER.BOX_SHADOW};
    background-color: ${INPUT.WRAPPER.BACKGROUND_COLOR};
    ${setFlex('row', 'space-between')}
    ${setBorderAndRadius(INPUT.WRAPPER)}
`;

export const ModalInput = styled.input.attrs({ autoFocus: true })`
    flex: 1;
    border: 0;
    outline: none;
    font-size: ${INPUT.FONT_SIZE}px;
    font-family: ${INPUT.FONT_FAMILY};
`;

export const ModalInputLength = styled.div`
    padding-left: ${INPUT.LENGTH.PADDING_LEFT}px;
    font-size: ${INPUT.LENGTH.FONT_SIZE}px;
`;

export const ModalCreateRoomButton = styled.div`
    width: ${CREATE_ROOM_BUTTON.WIDTH}px;
    padding: ${CREATE_ROOM_BUTTON.PADDING};
    margin: ${CREATE_ROOM_BUTTON.MARGIN};
    font-size: ${CREATE_ROOM_BUTTON.FONT_SIZE}px;
    text-align: center;
    box-sizing: border-box;
    box-shadow: ${CREATE_ROOM_BUTTON.BOX_SHADOW};
    background-color: ${CREATE_ROOM_BUTTON.BACKGROUND_COLOR};
    cursor: pointer;
    ${BUTTON_EFFECT.ACTIVE}
    ${BUTTON_EFFECT.HOVER}
    ${setBorderAndRadius(CREATE_ROOM_BUTTON)}
`;
