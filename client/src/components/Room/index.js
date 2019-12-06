import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../modules/socket';
import { ROOM } from '../../constants/room';

const Room = () => {
  const { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (socket.isConnected() === false) history.push('/');
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
