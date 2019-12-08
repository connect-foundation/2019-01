/* eslint-disable no-underscore-dangle */
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
import { LOBBY } from '../../constants/lobby';

const privateKey = process.env.REACT_APP_JWT_SECRET_KEY;
const algorithm = process.env.REACT_APP_JWT_ALGORITHM;

const Lobby = () => {
  const [userName, setUserName] = useState('guest');
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomInfoButtons, setRoomInfoButtons] = useState([]);
  const history = useHistory();
  const roomInfos = new Map();

  const makeRoomInfoButton = ({
    // eslint-disable-next-line react/prop-types
    id, name, numOfUsers, isEnterable,
  }) => (
    <RoomInfoButton
      key={id}
      roomId={id}
      name={name}
      numOfUsers={numOfUsers}
      enterable={isEnterable} />
  );

  const openRoomCreateModal = () => setModalOpen(true);

  const getNicknameFromJwt = () => {
    const cookies = cookie.parse(document.cookie);
    if (cookies.jwt === undefined) return undefined;
    const userInfo = jwt.verify(cookies.jwt, privateKey, { algorithm });
    if (userInfo === undefined || userInfo.id === undefined) return undefined;
    return userInfo.id;
  };

  const enterCreatedRoom = (roomId) => {
    history.push(`/room/${roomId}`);
  };

  const updateCreatedRoom = (createdRoomInfo) => {
    roomInfos.set(createdRoomInfo.id, createdRoomInfo);
    setRoomInfoButtons((currentRoomButtons) => [
      ...currentRoomButtons,
      makeRoomInfoButton(createdRoomInfo),
    ]);
  };

  const updateCurrentRoomInfos = (currentRoomInfos) => {
    currentRoomInfos.forEach((roomInfo) => roomInfos.set(roomInfo.id, roomInfo));
    setRoomInfoButtons(currentRoomInfos.map((roomInfo) => makeRoomInfoButton(roomInfo)));
  };

  const updateRoomInfo = ({ roomId, action }) => {
    const {
      id, name, numOfUsers, isEnterable,
    } = roomInfos.get(roomId);
    switch (action) {
      case LOBBY.ACTION.USER_ENTERED:
        roomInfos.set(id, {
          id, name, numOfUsers: numOfUsers + 1, isEnterable,
        });
        break;
      case LOBBY.ACTION.USER_LEAVED:
        roomInfos.set(id, {
          id, name, numOfUsers: numOfUsers - 1, isEnterable,
        });
        break;
      case LOBBY.ACTION.GAME_STARTED:
        roomInfos.set(id, {
          id, name, numOfUsers, isEnterable: false,
        });
        break;
      case LOBBY.ACTION.GAME_ENDED:
        roomInfos.set(id, {
          id, name, numOfUsers, isEnterable: true,
        });
        break;
      case LOBBY.ACTION.NO_USERS:
        roomInfos.delete(id);
        break;
      default:
    }
    setRoomInfoButtons(() => {
      const _roomInfoButtons = [];
      roomInfos.forEach((roominfo) => {
        _roomInfoButtons.push(makeRoomInfoButton(roominfo));
      });
      return _roomInfoButtons;
    });
  };

  useEffect(() => {
    const githubId = getNicknameFromJwt();

    if (socket.isConnected() === false) {
      setUserName(githubId === undefined ? 'guest' : githubId);
      socket.connect(githubId === undefined ? {} : { githubId });
      socket.onDisconnect(() => history.push('/'));
    }

    socket.onEnterLobby(updateCurrentRoomInfos);
    socket.emitEnterLobby();
    socket.onCreateRoom(enterCreatedRoom);
    socket.onRoomIsCreated(updateCreatedRoom);
    socket.onUpdateRoomInfo(updateRoomInfo);
  }, []);

  return (
    <div>
      <LobbyWrapper>
        <LobbyHeader>
          <LobbyNickname>hello, {userName}</LobbyNickname>
          <GitHubLoginButton setUserName={setUserName} userName={userName} />
        </LobbyHeader>
        <LobbyBody>
          <CreateRoomButton onClick={openRoomCreateModal}>+ new Room();</CreateRoomButton>
          {roomInfoButtons}
        </LobbyBody>
      </LobbyWrapper>
      {isModalOpen ? <RoomCreateModal setOpen={setModalOpen} /> : ''}
    </div>
  );
};

export default Lobby;
