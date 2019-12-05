import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../modules/socket';

const Room = () => {
  const { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (socket.isConnected() === false) history.push('/');
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
