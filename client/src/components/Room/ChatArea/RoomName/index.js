import React, { useState, useEffect } from 'react';
import { RoomNameWrapper, NameText } from './style';
import { ROOM_NAME } from '../../../../constants/room';
import socket from '../../../../modules/socket';

const RoomName = () => {
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(0);
  const [requestId, setRequestId] = useState(null);
  const [roomNameText, setRoomNameText] = useState('');

  const move = () => {
    setPosition((prevPositon) => {
      if (prevPositon < -width) return ROOM_NAME.WRAPPER_WIDTH;
      return prevPositon - 1;
    });
    setRequestId(window.requestAnimationFrame(move));
  };

  const stop = () => {
    window.cancelAnimationFrame(requestId);
  };

  /**
   * @param {string} roomName
   */
  const calculateWidth = (roomName) => {
    const totalLength = roomName.length;
    const hangulLength = (roomName.match(ROOM_NAME.REGEX.HANGUL) || []).length;
    const emojiLength = (roomName.match(ROOM_NAME.REGEX.EMOJI) || []).length;
    const othersLength = totalLength - hangulLength - emojiLength;
    return (
      hangulLength * ROOM_NAME.FONT_WIDTH.HANGUL
      + emojiLength * ROOM_NAME.FONT_WIDTH.EMOJI
      + othersLength * ROOM_NAME.FONT_WIDTH.OTHERS
    );
  };

  /**
   * @param {Object} param0
   *  @param {string} roomName
   */
  const setupRoomName = ({ roomName }) => {
    const newRoomName = `🤔${roomName}`;
    setRoomNameText(newRoomName);
    setWidth(calculateWidth(newRoomName));
  };

  useEffect(() => {
    socket.onEnterRoom(setupRoomName);

    return () => {
      socket.offEnterRoom();
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
