import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import Alert from '../Alert';
import {
  Wrapper, RoomWrapper, SoundToggleWrapper, SoundToggle,
} from './style';
import socket from '../../modules/socket';
import URL from '../../constants/url';
import { ROOM } from '../../constants/room';

const Room = () => {
  const [isSoundOn, setSoundOn] = useState(true);
  const [isExistRoom, setIsExistRoom] = useState(true);
  const [gameStartSound] = useState(new Audio(URL.GAME_START_SOUND));
  const [gameEndSound] = useState(new Audio(URL.GAME_END_SOUND));
  const [backgroundMusic] = useState(new Audio(URL.BACKGROUND_MUSIC));
  const [buttonClickSound] = useState(new Audio(URL.BUTTON_CLICK_SOUND));

  const history = useHistory();
  const timerId = useRef(null);
  const { roomId } = useParams();

  const goToLobby = () => history.goBack();

  const notifyEndGame = ({ isOwner }) => {
    if (isOwner) socket.emitReadyRoom(roomId);
  };

  const playStartSound = () => {
    backgroundMusic.pause();
    gameStartSound.play();
  };

  const playEndSound = () => {
    backgroundMusic.pause();
    gameEndSound.play();
  };

  const replayBackgroundMusic = () => {
    timerId.current = setTimeout(() => backgroundMusic.play(), ROOM.WAITING_SOUND_TIME_MS);
  };

  const toggleSound = () => {
    setSoundOn(!isSoundOn);
    backgroundMusic.muted = !backgroundMusic.muted;
    buttonClickSound.muted = !buttonClickSound.muted;
    gameStartSound.muted = !gameStartSound.muted;
    gameEndSound.muted = !gameEndSound.muted;
  };

  useEffect(() => {
    backgroundMusic.autoplay = true;
    backgroundMusic.loop = true;
    gameStartSound.onended = replayBackgroundMusic;
    gameEndSound.onended = replayBackgroundMusic;

    if (socket.isConnected() === false) history.replace('/');
    socket.emitEnterRoom(roomId);
    socket.onStartGame(playStartSound);
    socket.onEndGame(playEndSound);
    socket.onResetGame(notifyEndGame);
    socket.onGoToLobby(() => setIsExistRoom(false));

    return () => {
      backgroundMusic.pause();
      socket.offStartGame();
      socket.offEndGame();
      socket.offGoToLobby();
      socket.offResetGame();
      socket.emitLeaveRoom();
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <SoundToggleWrapper>
          <SoundToggle onClick={toggleSound}>{isSoundOn ? '🔊sound on' : '🔇sound off'}</SoundToggle>
        </SoundToggleWrapper>
        <RoomWrapper>
          <GameArea buttonClickSound={buttonClickSound} />
          <ChatArea />
        </RoomWrapper>
      </Wrapper>
      {isExistRoom ? '' : <Alert message={ROOM.MESSAGE.PATH_ERROR} closeCallback={goToLobby} />}
    </>
  );
};

export default Room;
