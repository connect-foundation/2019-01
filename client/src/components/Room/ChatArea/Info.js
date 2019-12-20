import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CHAT_AREA } from '../../../constants/room';
import {
  ChatHeader, RoomInfo, ExitButton, PlayerInfo, Emoji,
} from './style';
import socket from '../../../modules/socket';

const Info = () => {
  const [numOfPlayer, setNumOfPlayer] = useState(0);
  const [numOfViewer, setNumOfViewer] = useState(0);
  const [isGameStarted, setGameStarted] = useState(false);
  const history = useHistory();

  const goToLobby = () => history.goBack();

  const activeExitButton = () => setGameStarted(false);

  const inactiveExitButton = () => setGameStarted(true);

  const exitRoom = () => {
    if (isGameStarted) return;
    socket.emitLeaveRoom();
  };

  /**
   * @param {Object} data
   *  @param {number} roomName
   *  @param {number} numOfViewer
   */
  const updatePlayerNum = (data) => {
    setNumOfPlayer(data.numOfPlayer);
    setNumOfViewer(data.numOfViewer);
  };

  useEffect(() => {
    socket.onLeaveRoom(goToLobby);
    socket.onStartGame(inactiveExitButton);
    socket.onResetGame(activeExitButton);
    socket.onUpdatePlayerNum(updatePlayerNum);

    return () => {
      socket.offLeaveRoom();
      socket.offStartGame();
      socket.offResetGame();
      socket.offUpdatePlayerNum();
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
