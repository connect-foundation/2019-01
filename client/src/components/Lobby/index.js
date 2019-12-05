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
// 아래는 서버 연결 전 더미 데이터임.
const dummyRoomInfos = [
  {
    id: '1', name: '보현님 언능 들어오세요', numOfUsers: 2, isEnterable: true,
  },
  {
    id: '2', name: '형규님 그만 주무세요', numOfUsers: 2, isEnterable: false,
  },
  {
    id: '3', name: '희선님... 말 잘들을게요 충성^^7', numOfUsers: 2, isEnterable: true,
  },
];

const Lobby = () => {
  const [userName, setUserName] = useState('guest');
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const RoomInfoButtons = () => dummyRoomInfos.map(({
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
