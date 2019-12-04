import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../class/socket';

const Room = () => {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emitEnterRoom(roomId);
  }, []);

  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
