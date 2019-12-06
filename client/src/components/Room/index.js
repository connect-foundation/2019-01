import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../modules/socket';
import { ROOM } from '../../constants/room';

const Room = () => {
  const { roomId } = useParams();
  if (socket.isConnected() === false) {
    socket.connect({});
  }

  useEffect(() => {
    socket.emitEnterRoom(roomId);
    socket.onEndGame(({ isOwner }) => {
      if (isOwner) {
        setTimeout(() => socket.emitEndGame(roomId), ROOM.WAITING_TIME_MS);
      }
    });
  }, []);

  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
