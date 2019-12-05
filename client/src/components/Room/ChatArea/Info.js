import React, { useState } from 'react';
import { CHAT_AREA } from '../../../constants/room';
import {
  ChatHeader, RoomInfo, ExitButton, PlayerInfo, Emoji,
} from './style';

const Info = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [numOfPlayer, setNumOfPlayer] = useState(0);
  const [numOfViewer, setNumOfViewer] = useState(0);

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
      <ExitButton isGameStarted={isGameStarted}>exit</ExitButton>
    </ChatHeader>
  );
};

export default Info;
