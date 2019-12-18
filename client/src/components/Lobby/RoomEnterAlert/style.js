import styled from 'styled-components';
import {
  MODAL, CREATE_ROOM_BUTTON, TITLE, HEADER,
} from '../../../constants/modal';
import { LOBBY, BUTTON_EFFECT } from '../../Style/Lobby/constants';

export const AlertWrapper = styled.div`
  ${LOBBY.LOCATE_CENTER};
  width: ${MODAL.WIDTH}px;
  background: ${MODAL.BACKGROUND_COLOR};
  padding: ${MODAL.PADDING};
  border: ${MODAL.BORDER};
  border-radius: ${MODAL.BORDER_RADIUS}px;
`;

export const AlertMessage = styled.div`
  font-size: ${TITLE.FONT_SIZE}px;
  text-align: center;
  margin-bottom: ${HEADER.MARGIN_BOTTOM / 2}px;
`;

export const AlertOkButton = styled.div`
  width: ${CREATE_ROOM_BUTTON.WIDTH}px;
  padding: ${CREATE_ROOM_BUTTON.PADDING};
  margin: 0 auto;
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
