import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import cookie from 'cookie';
import socket from '../../modules/socket';
import RoomInfoButton from './RoomInfoButton';
import GitHubLoginButton from './GitHubLoginButton';
import RoomCreateModal from './RoomCreateModal';
import {
  LobbyWrapper, LobbyHeader, LobbyBody, LobbyNickname, CreateRoomButton,
} from './style';

const privateKey = process.env.REACT_APP_JWT_SECRET_KEY;
const algorithm = process.env.REACT_APP_JWT_ALGORITHM;

const Lobby = () => {
  const [userName, setUserName] = useState('guest');
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomInfos, setRoomInfos] = useState([]);
  const history = useHistory();

  const RoomInfoButtons = () => roomInfos.map(({
    id, name, numOfUsers, isEnterable,
  }) => (
    <RoomInfoButton
      key={id}
      roomId={id}
      name={name}
      numOfUsers={numOfUsers}
      enterable={isEnterable} />
  ));

  const openRoomCreateModal = () => setModalOpen(true);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    let id;

    if (cookies.jwt !== undefined) {
      const userInfo = jwt.verify(cookies.jwt, privateKey, { algorithm });
      id = userInfo.id;
      setUserName(id);
    }

    if (socket.isConnected() === false) {
      socket.connect(id !== undefined ? { githubId: id } : {});
    }

    const enterCreatedRoom = (roomId) => {
      history.push(`/room/${roomId}`);
    };
    socket.onCreateRoom(enterCreatedRoom);
    socket.onEnterLobby((TEMProomInfos) => {
      setRoomInfos(TEMProomInfos);
    });
    socket.emitEnterLobby();
  }, []);

  return (
    <div>
      <LobbyWrapper>
        <LobbyHeader>
          <LobbyNickname>hello, {userName}</LobbyNickname>
          <GitHubLoginButton />
        </LobbyHeader>
        <LobbyBody>
          <CreateRoomButton onClick={openRoomCreateModal}>+ new Room();</CreateRoomButton>
          {RoomInfoButtons()}
        </LobbyBody>
      </LobbyWrapper>
      {isModalOpen ? <RoomCreateModal setOpen={setModalOpen} /> : ''}
    </div>
  );
};

export default Lobby;
