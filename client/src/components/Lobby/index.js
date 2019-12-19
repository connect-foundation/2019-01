/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import socket from '../../modules/socket';
import RoomInfoButton from './RoomInfoButton';
import GitHubLoginButton from './GitHubLoginButton';
import RoomCreateModal from './RoomCreateModal';
import Alert from '../Alert';
import {
  LobbyWrapper, LobbyHeader, LobbyBody, LobbyNickname, CreateRoomButton,
} from './style';

const privateKey = process.env.REACT_APP_JWT_SECRET_KEY;
const algorithm = process.env.REACT_APP_JWT_ALGORITHM;

const Lobby = () => {
  const [userName, setUserName] = useState('guest');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [roomInfoButtons, setRoomInfoButtons] = useState([]);
  const history = useHistory();
  const roomInfos = new Map();

  const openCreateRoomModal = () => setModalOpen(true);

  /**
   * @param {string} roomId
   */
  const enterCreatedRoom = (roomId) => {
    history.push(`/room/${roomId}`);
  };

  /**
   * @param {object} param0
   *  @param {boolean} param0.isEnterable
   *  @param {string} param0.roomId
   *  @param {string} param0.message
   */
  const enterRoom = ({ isEnterable, roomId, message }) => {
    if (isEnterable) {
      history.push(`/room/${roomId}`);
      return;
    }
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const makeRoomInfoButton = ({
    id, name, numOfUsers, isEnterable,
  }) => {
    const onClick = () => socket.emitKnockRoom(id);
    return (
      <RoomInfoButton
        key={id}
        name={name}
        numOfUsers={numOfUsers}
        enterable={isEnterable}
        onClick={onClick} />
    );
  };

  /**
   * @param {object} newRoomInfo
   */
  const addRoom = (newRoomInfo) => {
    roomInfos.set(newRoomInfo.id, newRoomInfo);
    setRoomInfoButtons((currentRoomButtons) => [
      ...currentRoomButtons,
      makeRoomInfoButton(newRoomInfo),
    ]);
  };

  /**
   * @param {object} currentRoomInfos
   */
  const updateCurrentRoomInfos = (currentRoomInfos) => {
    currentRoomInfos.forEach((roomInfo) => roomInfos.set(roomInfo.id, roomInfo));
    setRoomInfoButtons(currentRoomInfos.map((roomInfo) => makeRoomInfoButton(roomInfo)));
  };

  /**
   * @param {object} param0
   *  @param {string} roomId
   *  @param {object} roomInfo
   */
  const updateRoomInfo = ({ roomId, roomInfo }) => {
    const { numOfUsers } = roomInfo;
    roomInfos.set(roomId, roomInfo);
    if (numOfUsers === 0) roomInfos.delete(roomId);
    setRoomInfoButtons(() => {
      const _roomInfoButtons = [];
      roomInfos.forEach((roominfo) => _roomInfoButtons.push(makeRoomInfoButton(roominfo)));
      return _roomInfoButtons;
    });
  };

  const decodeGithubIdFromJwt = () => {
    const { _jwt } = cookie.parse(document.cookie);
    if (_jwt === undefined) return undefined;
    const userInfo = jwt.verify(_jwt, privateKey, { algorithm });
    if (userInfo === undefined) return undefined;
    return userInfo.githubId;
  };

  useEffect(() => {
    const githubId = socket.isGuest() ? undefined : decodeGithubIdFromJwt();
    if (githubId !== undefined) setUserName(githubId);

    if (socket.isConnected() === false) {
      socket.connect(githubId === undefined ? {} : { githubId });
      socket.onDisconnect(() => history.replace('/'));
    }

    socket.emitEnterLobby();
    socket.onEnterLobby(updateCurrentRoomInfos);
    socket.onKnockRoom(enterRoom);
    socket.onRoomIsCreated(addRoom);
    socket.onCreateRoom(enterCreatedRoom);
    socket.onUpdateRoomInfo(updateRoomInfo);

    return () => {
      socket.offEnterLobby();
      socket.offKnockRoom();
      socket.offRoomIsCreated();
      socket.offCreateRoom();
      socket.offUpdateRoomInfo();
    };
  }, []);

  return (
    <>
      <LobbyWrapper>
        <LobbyHeader>
          <LobbyNickname>hello, {userName}</LobbyNickname>
          <GitHubLoginButton userName={userName} />
        </LobbyHeader>
        <LobbyBody>
          <CreateRoomButton onClick={openCreateRoomModal}>+ new Room();</CreateRoomButton>
          {roomInfoButtons}
        </LobbyBody>
      </LobbyWrapper>
      {isModalOpen ? <RoomCreateModal setOpen={setModalOpen} /> : ''}
      {isAlertOpen
        ? <Alert message={alertMessage} closeCallback={() => setAlertOpen(false)} />
        : ''}
    </>
  );
};

export default Lobby;
