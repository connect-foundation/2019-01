import React, { useEffect } from 'react';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../class/socket';

const Room = () => {
  useEffect(() => {
    const enterTestRoom = (roomInfos) => {
      roomInfos.forEach((roomInfo, index) => {
        console.log(roomInfo);
        if (index === 0) {
          socket.emitEnterRoom(roomInfo.id);
        }
      });
    };
    socket.onRoomInfos(enterTestRoom);
  }, []);
  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
