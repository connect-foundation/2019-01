import React, { useEffect } from 'react';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../class/socket';

const Room = () => {
  // lobby에서 할 수도 있는 일을 임시로 Room에게 할당
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
