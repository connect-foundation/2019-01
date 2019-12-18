import styled from 'styled-components';
import {
  MODAL, CREATE_ROOM_BUTTON, TITLE, HEADER,
} from '../../../constants/modal';
import { setBorderAndRadius } from '../../Style/util';
import { LOBBY, BUTTON_EFFECT } from '../../Style/Lobby/constants';

export const AlertWrapper = styled.div`
  width: ${MODAL.WIDTH}px;
  padding: ${MODAL.PADDING};
  background: ${MODAL.BACKGROUND_COLOR};
  ${LOBBY.LOCATE_CENTER};
  ${setBorderAndRadius(MODAL)}
`;

export const AlertMessage = styled.div`
  text-align: center;
  font-size: ${TITLE.FONT_SIZE}px;
  margin-bottom: ${HEADER.MARGIN_BOTTOM / 2}px;
`;

export const AlertOkButton = styled.div`
  width: ${CREATE_ROOM_BUTTON.WIDTH}px;
  margin: 0 auto;
  padding: ${CREATE_ROOM_BUTTON.PADDING};
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
