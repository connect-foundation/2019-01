import styled from 'styled-components';
import { ROOM_NAME } from '../../../../constants/room';

export const RoomNameWrapper = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  margin: ${ROOM_NAME.WRAPPER_MARGIN};
  height: 8%;
`;

export const NameText = styled.div`
  width: ${ROOM_NAME.WIDTH}px;
  font-size: ${ROOM_NAME.FONT_SIZE}px;
  color: ${ROOM_NAME.COLOR};
`;
