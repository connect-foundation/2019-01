import styled from 'styled-components';
import {
  MODAL, HEADER, TITLE, CLOSE_BUTTON, INPUT, CREATE_ROOM_BUTTON,
} from '../../../constants/modal';
import { BUTTON_EFFECT } from '../../../constants/lobby';

const ModalWrapper = styled.div`
    width: ${MODAL.WIDTH}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: ${MODAL.BACKGROUND_COLOR};
    padding: ${MODAL.PADDING};
    border: ${MODAL.BORDER};
    border-radius: ${MODAL.BORDER_RADIUS}px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    margin-bottom: ${HEADER.MARGIN_BOTTOM}px;
`;

const ModalTitle = styled.div`
    font-size: ${TITLE.FONT_SIZE}px;
`;

const ModalCloseButton = styled.span`
    font-size: ${CLOSE_BUTTON.FONT_SIZE}px;
    cursor: pointer;
    ${BUTTON_EFFECT.HOVER}
`;

const ModalInputWrapper = styled.div`
    width: 100%;
    padding: ${INPUT.WRAPPER.PADDING};
    margin-bottom: ${INPUT.WRAPPER.MARGIN_BOTTOM}px;
    box-sizing: border-box;
    background-color: ${INPUT.WRAPPER.BACKGROUND_COLOR};
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border: ${INPUT.WRAPPER.BORDER};
    border-radius: ${INPUT.WRAPPER.BORDER_RADIUS}px;
    box-shadow: ${INPUT.WRAPPER.BOX_SHADOW};
`;

const ModalInput = styled.input`
    flex: 1;
    border: 0;
    outline: none;
    font-size: ${INPUT.FONT_SIZE}px;
    font-family: ${INPUT.FONT_FAMILY};
`;

const ModalInputLength = styled.div`
    padding-left: ${INPUT.LENGTH.PADDING_LEFT}px;
    font-size: ${INPUT.LENGTH.FONT_SIZE}px;
`;

const ModalCreateRoomButton = styled.div`
    width: ${CREATE_ROOM_BUTTON.WIDTH}px;
    padding: ${CREATE_ROOM_BUTTON.PADDING};
    margin: ${CREATE_ROOM_BUTTON.MARGIN};
    font-size: ${CREATE_ROOM_BUTTON.FONT_SIZE}px;
    text-align: center;
    box-sizing: border-box;
    border: ${CREATE_ROOM_BUTTON.BORDER};
    border-radius: ${CREATE_ROOM_BUTTON.BORDER_RADIUS}px;
    box-shadow: ${CREATE_ROOM_BUTTON.BOX_SHADOW};
    background-color: ${CREATE_ROOM_BUTTON.BACKGROUND_COLOR};
    cursor: pointer;
    ${BUTTON_EFFECT.ACTIVE}
    ${BUTTON_EFFECT.HOVER}
`;

export {
  ModalWrapper, ModalHeader, ModalTitle, ModalCloseButton, ModalInputWrapper,
  ModalInput, ModalInputLength, ModalCreateRoomButton,
};
