import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CHAT_AREA } from '../../../constants/room';
import {
  ChatHeader, RoomInfo, ExitButton, PlayerInfo, Emoji,
} from './style';
import socket from '../../../modules/socket';

const Info = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [numOfPlayer, setNumOfPlayer] = useState(0);
  const [numOfViewer, setNumOfViewer] = useState(0);
  const history = useHistory();

  const inactiveExitButton = () => setGameStarted(true);
  const activeExitButton = () => setGameStarted(false);
  const exitRoom = () => {
    if (isGameStarted) return;
    socket.emitLeaveRoom();
  };

  const enterLobby = () => history.replace('/lobby');

  const updatePlayerNum = (data) => {
    setNumOfPlayer(data.numOfPlayer);
    setNumOfViewer(data.numOfViewer);
  };

  useEffect(() => {
    socket.onUpdatePlayerNum(updatePlayerNum);
    socket.onStartGame(inactiveExitButton);
    socket.onResetGame(activeExitButton);
    socket.onLeaveRoom(enterLobby);

    return () => {
      socket.offUpdatePlayerNum();
      socket.offStartGame();
      socket.offEndGame();
      socket.offLeaveRoom();
    };
  }, []);

  return (
    <ChatHeader>
      <RoomInfo>
        <PlayerInfo>
          <Emoji url={CHAT_AREA.EMOJI_URL_PLAYER} />
          <div>{numOfPlayer}</div>
        </PlayerInfo>
        <PlayerInfo>
          <Emoji url={CHAT_AREA.EMOJI_URL_VIEWER} />
          <div>{numOfViewer}</div>
        </PlayerInfo>
      </RoomInfo>
      <ExitButton onClick={exitRoom} isGameStarted={isGameStarted}>exit</ExitButton>
    </ChatHeader>
  );
};

export default Info;
