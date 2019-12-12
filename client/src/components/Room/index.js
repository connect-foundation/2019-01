import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import {
  Wrapper, RoomWrapper, SoundToggleWrapper, SoundToggle,
} from './style';
import socket from '../../modules/socket';
import URL from '../../constants/url';
import { DASHBOARD } from '../../constants/room';

const Room = () => {
  const [backgroundMusic] = useState(new Audio(URL.BACKGROUND_MUSIC));
  const [buttonClickSound] = useState(new Audio(URL.BUTTON_CLICK_SOUND));
  const [gameStartSound] = useState(new Audio(URL.GAME_START_SOUND));
  const [musicPlaying, setMusicPlaying] = useState(true);

  const { roomId } = useParams();
  const history = useHistory();

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    backgroundMusic.muted = !backgroundMusic.muted;
    buttonClickSound.muted = !buttonClickSound.muted;
    gameStartSound.muted = !gameStartSound.muted;
  };

  const playSoundEffect = () => {
    backgroundMusic.pause();
    gameStartSound.play();
  };

  const replayBackgroundMusic = () => setTimeout(() => backgroundMusic.play(), DASHBOARD.SECOND_MS);

  useEffect(() => {
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;
    gameStartSound.onended = replayBackgroundMusic;

    if (socket.isConnected() === false) history.replace('/');
    socket.emitEnterRoom(roomId);
    socket.onStartGame(playSoundEffect);
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
        <GameArea buttonClickSound={buttonClickSound} />
        <ChatArea />
      </RoomWrapper>
    </Wrapper>
  );
};

export default Room;
