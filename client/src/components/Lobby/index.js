import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GitHubLoginButton from './GitHubLoginButton';
import RoomInfoButton from './RoomInfoButton';
import RoomCreateModal from './RoomCreateModal';
import socket from '../../class/socket';
import {
  LobbyWrapper, LobbyHeader, LobbyBody, LobbyNickname, CreateRoomButton,
} from './style';

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
    const enterCreatedRoom = (roomId) => {
      history.push(`/room/${roomId}`);
    };
    socket.onCreateRoom(enterCreatedRoom);
  }, []);

  return (
    <div>
      <LobbyWrapper>
        <LobbyHeader>
          <LobbyNickname>hello, guest</LobbyNickname>
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
