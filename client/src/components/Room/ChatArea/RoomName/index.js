import React, { useState, useEffect } from 'react';
import { RoomNameWrapper, NameText } from './style';
import { ROOM_NAME } from '../../../../constants/room';
import socket from '../../../../modules/socket';

const RoomName = () => {
  const [roomNameText, setRoomNameText] = useState('');
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState(0);
  const [requestId, setRequestId] = useState(null);

  const moveOnePixel = () => {
    setPosition((prevPositon) => {
      if (prevPositon < -width) return ROOM_NAME.WRAPPER_WIDTH;
      return prevPositon - 1;
    });
    setRequestId(window.requestAnimationFrame(moveOnePixel));
  };
  const move = () => {
    setRequestId(window.requestAnimationFrame(moveOnePixel));
  };
  const stop = () => {
    window.cancelAnimationFrame(requestId);
  };
  const setup = ({ roomName }) => {
    const newRoomName = `🤔${roomName}`;
    setRoomNameText(newRoomName);
    const totalLength = newRoomName.length;
    const hangulLength = (newRoomName.match(ROOM_NAME.REGEX.HANGUL) || []).length;
    const emojiLength = (newRoomName.match(ROOM_NAME.REGEX.EMOJI) || []).length;
    const othersLength = totalLength - hangulLength - emojiLength;
    const newWidth = (
      hangulLength * ROOM_NAME.FONT_WIDTH.HANGUL
      + emojiLength * ROOM_NAME.FONT_WIDTH.EMOJI
      + othersLength * ROOM_NAME.FONT_WIDTH.OTHERS);
    setWidth(newWidth);
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
