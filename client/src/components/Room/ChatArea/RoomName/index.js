import React, { useState, useEffect } from 'react';
import { RoomNameWrapper, NameText } from './style';
import { CHAT_AREA } from '../../../../constants/room';
import socket from '../../../../modules/socket';

const WRAPPER_WIDTH = CHAT_AREA.WIDTH - 30;
let requestId = null;

const RoomName = () => {
  const [roomNameText, setRoomNameText] = useState('');
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(0);

  const moveOnePixel = () => {
    setPosition((prevPositon) => {
      if (prevPositon < -width) return WRAPPER_WIDTH;
      return prevPositon - 1;
    });
    requestId = window.requestAnimationFrame(moveOnePixel);
  };
  const move = () => {
    requestId = window.requestAnimationFrame(moveOnePixel);
  };
  const stop = () => {
    window.cancelAnimationFrame(requestId);
  };
  const setup = ({ roomName }) => {
    setRoomNameText(`🤔${roomName}`);
    const totalLength = roomName.length + 1;
    const hangulLength = (roomName.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || []).length + 1;
    setWidth(hangulLength * 30 + (totalLength - hangulLength) * 16);
  };

  useEffect(() => {
    socket.onEnterRoom(setup);
    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <RoomNameWrapper onMouseOver={move} onMouseOut={stop} onFocus={move} onBlur={stop}>
      <NameText style={{ transform: `translateX(${position}px)` }}>
        {roomNameText}
      </NameText>
    </RoomNameWrapper>
  );
};

export default RoomName;
