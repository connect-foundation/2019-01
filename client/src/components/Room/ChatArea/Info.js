import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROOM, CHAT_AREA } from '../../../constants/room';
import {
  ChatHeader, RoomInfo, ExitButton, PlayerInfo, Emoji,
} from './style';
import socket from '../../../modules/socket';

const Info = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [numOfPlayer, setNumOfPlayer] = useState(0);
  const [numOfViewer, setNumOfViewer] = useState(0);
  const history = useHistory();

  const initPlayer = ({ characterList }) => setNumOfPlayer(characterList.length);

  const addPlayer = () => setNumOfPlayer((prevNumOfPlayer) => prevNumOfPlayer + 1);

  const subUser = ({ characterList }) => {
    const { isAlive } = characterList[0];
    if (isAlive) {
      setNumOfPlayer((prevNumOfPlayer) => prevNumOfPlayer - 1);
      return;
    }
    setNumOfViewer((prevNumOfViewer) => prevNumOfViewer - 1);
  };

  const updateDropUser = ({ characterList }) => {
    const numOfDropUsers = characterList.length;
    setNumOfPlayer((prevNumOfPlayer) => prevNumOfPlayer - numOfDropUsers);
    setNumOfViewer((prevNumOfViewer) => prevNumOfViewer + numOfDropUsers);
  };

  const updateAliveUser = ({ characterList }) => {
    const numOfAliveUsers = characterList.length;
    setNumOfPlayer((prevNumOfPlayer) => {
      if (prevNumOfPlayer !== numOfAliveUsers) {
        setNumOfViewer((prevNumOfViewer) => prevNumOfViewer - numOfAliveUsers);
      }
      return numOfAliveUsers;
    });
  };

  const updateUser = ({ characterList }) => {
    setTimeout(() => {
      setNumOfPlayer(characterList.length);
      setNumOfViewer(0);
    }, ROOM.WAITING_TIME_MS);
  };

  const inactiveExitButton = () => setGameStarted(true);
  const activeExitButton = () => setTimeout(() => setGameStarted(false), ROOM.WAITING_TIME_MS);
  const exitRoom = () => {
    if (isGameStarted) return;
    socket.emitLeaveRoom();
  };

  const enterLobby = () => history.push('/lobby');

  useEffect(() => {
    socket.onStartGame(inactiveExitButton);
    socket.onEndGame(activeExitButton);
    socket.onEnterRoom(initPlayer);
    socket.onEnterNewUser(addPlayer);
    socket.onLeaveUser(subUser);
    socket.onEndRound(updateDropUser);
    socket.onStartRound(updateAliveUser);
    socket.onEndGame(updateUser);
    socket.onLeaveRoom(enterLobby);
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
