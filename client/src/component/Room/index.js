import React, { useEffect } from 'react';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../class/socket';

const Room = () => {
  useEffect(() => {
    const printRoomInfos = (roomInfos) => {
      roomInfos.forEach((roomInfo) => console.log(roomInfo));
    };
    socket.onRoomInfos(printRoomInfos);
    socket.emitEnterRoom(1);
  }, []);
  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
