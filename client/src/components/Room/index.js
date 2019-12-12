import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import {
  Wrapper, RoomWrapper, SoundToggleWrapper, SoundToggle,
} from './style';
import socket from '../../modules/socket';
import URL from '../../constants/url';

const Room = () => {
  const [backgroundMusic] = useState(new Audio(URL.BACKGROUND_MUSIC));
  const [musicPlaying, setMusicPlaying] = useState(true);
  const { roomId } = useParams();
  const history = useHistory();

  const toggleMusic = () => setMusicPlaying((prevMusicPlaying) => {
    if (prevMusicPlaying) {
      backgroundMusic.pause();
      return false;
    }

    backgroundMusic.play();
    return true;
  });

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
      <SoundToggleWrapper>
        <SoundToggle onClick={toggleMusic}>{musicPlaying ? 'sound on' : 'sound off'}</SoundToggle>
      </SoundToggleWrapper>
      <RoomWrapper>
        <GameArea />
        <ChatArea />
      </RoomWrapper>
    </Wrapper>
  );
};

export default Room;
