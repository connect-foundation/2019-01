import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import {
  Wrapper, RoomWrapper, SoundToggleWrapper, SoundToggle,
} from './style';
import socket from '../../modules/socket';
import URL from '../../constants/url';
import { ROOM } from '../../constants/room';

const Room = () => {
  const [backgroundMusic] = useState(new Audio(URL.BACKGROUND_MUSIC));
  const [buttonClickSound] = useState(new Audio(URL.BUTTON_CLICK_SOUND));
  const [gameStartSound] = useState(new Audio(URL.GAME_START_SOUND));
  const [gameEndSound] = useState(new Audio(URL.GAME_END_SOUND));
  const [isSoundOn, setSoundOn] = useState(true);

  const { roomId } = useParams();
  const history = useHistory();

  const toggleSound = () => {
    setSoundOn(!isSoundOn);
    backgroundMusic.muted = !backgroundMusic.muted;
    buttonClickSound.muted = !buttonClickSound.muted;
    gameStartSound.muted = !gameStartSound.muted;
    gameEndSound.muted = !gameEndSound.muted;
  };

  const playStartSound = () => {
    backgroundMusic.pause();
    gameStartSound.play();
  };

  const playEndSound = () => {
    backgroundMusic.pause();
    gameEndSound.play();
  };

  const replayBackgroundMusic = () => setTimeout(
    () => backgroundMusic.play(), ROOM.WAITING_SOUND_TIME_MS,
  );

  useEffect(() => {
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;
    gameStartSound.onended = replayBackgroundMusic;
    gameEndSound.onended = replayBackgroundMusic;

    if (socket.isConnected() === false) history.replace('/');
    socket.emitEnterRoom(roomId);
    socket.onStartGame(playStartSound);
    socket.onEndGame(({ isOwner }) => {
      if (isOwner) socket.emitEndGame(roomId);
      playEndSound();
    });
    return () => {
      socket.emitLeaveRoom();
      backgroundMusic.pause();
    };
  }, []);

  return (
    <Wrapper>
      <SoundToggleWrapper>
        <SoundToggle onClick={toggleSound}>{isSoundOn ? 'sound on' : 'sound off'}</SoundToggle>
      </SoundToggleWrapper>
      <RoomWrapper>
        <GameArea buttonClickSound={buttonClickSound} />
        <ChatArea />
      </RoomWrapper>
    </Wrapper>
  );
};

export default Room;
