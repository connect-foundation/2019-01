import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {
  LobbyWrapper, LobbyHeader, LobbyBody, LobbyNickname, CreateRoomButton, RoomInfoButton,
} from './style';

const privateKey = process.env.REACT_APP_JWT_SECRET_KEY;
const algorithm = process.env.REACT_APP_JWT_ALGORITHM;

const Lobby = () => {
  const [userName, setUserName] = useState('guest');

  useEffect(() => {
    const query = window.location.search.substring(1);
    const token = query.split('userInfo=')[1];
    const userInfo = jwt.verify(token, privateKey, { algorithm });
    setUserName(userInfo.name);
  }, []);

  return (
    <LobbyWrapper>
      <LobbyHeader>
        <LobbyNickname>hello,{userName}</LobbyNickname>
        <div>login</div>
      </LobbyHeader>
      <LobbyBody>
        <CreateRoomButton>+ new Room();</CreateRoomButton>
        <RoomInfoButton enterable>
          <div>보현님 언능 들어오세요</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable={false}>
          <div>형규님 그만 주무세요</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable>
          <div>희선님... 말 잘들을게요 충성^^7</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable>
          <div>희선님... 말 잘들을게요 충성^^7</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable>
          <div>희선님... 말 잘들을게요 충성^^7</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable>
          <div>희선님... 말 잘들을게요 충성^^7</div>
          <div>2/20</div>
        </RoomInfoButton>
        <RoomInfoButton enterable>
          <div>희선님... 말 잘들을게요 충성^^7</div>
          <div>2/20</div>
        </RoomInfoButton>
      </LobbyBody>
    </LobbyWrapper>
  );
};

export default Lobby;
