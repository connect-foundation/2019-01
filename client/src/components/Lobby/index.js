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

    socket.onRoomIsCreated((createdRoomInfo) => {
      const {
        id, name, numOfUsers, isEnterable,
      } = createdRoomInfo;
      roomInfos.set(id, {
        id, name, numOfUsers, isEnterable,
      });
      roomInfos.set(createdRoomInfo.id, createdRoomInfo);
      setRoomInfoButtons(
        (currentRoomButtons) => [...currentRoomButtons, makeRoomInfoButton(createdRoomInfo)],
      );
    });

    socket.onEnterLobby((currentRoomInfos) => {
      currentRoomInfos.forEach(({
        id, name, numOfUsers, isEnterable,
      }) => {
        roomInfos.set(id, {
          id, name, numOfUsers, isEnterable,
        });
      });
      currentRoomInfos.forEach((roomInfo) => {
        roomInfos.set(roomInfo.id, roomInfo);
      });
      setRoomInfoButtons(currentRoomInfos.map((roomInfo) => makeRoomInfoButton(roomInfo)));
    });

    socket.emitEnterLobby();

    socket.onUpdateRoomInfo(({ roomId, action }) => {
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
    });
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
          {roomInfoButtons}
        </LobbyBody>
      </LobbyWrapper>
      {isModalOpen ? <RoomCreateModal setOpen={setModalOpen} /> : ''}
    </div>
  );
};

export default Lobby;
