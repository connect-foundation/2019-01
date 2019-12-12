import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../modules/socket';
import URL from '../../constants/url';

const Room = () => {
  const { roomId } = useParams();
  const backgroundMusic = new Audio(URL.BACKGROUND_MUSIC);
  const history = useHistory();

  useEffect(() => {
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;

    if (socket.isConnected() === false) history.replace('/');
    socket.emitEnterRoom(roomId);
    socket.onEndGame(({ isOwner }) => {
      if (isOwner) socket.emitEndGame(roomId);
    });
    return () => {
      socket.emitLeaveRoom();
      backgroundMusic.pause();
    };
  }, []);

  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
