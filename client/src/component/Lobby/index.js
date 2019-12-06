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
      socket.onDisconnect(() => history.push('/'));
    }

    const enterCreatedRoom = (roomId) => {
      history.push(`/room/${roomId}`);
    };

    socket.onCreateRoom(enterCreatedRoom);

    /**
     * - socket on 이벤트에 익명 함수들은 빠르게 따로 빼주려고 합니다!
     */
    socket.onRoomIsCreated((createdRoomInfo) => {
      roomInfos.set(createdRoomInfo.id, createdRoomInfo);
      setRoomInfoButtons(
        (currentRoomButtons) => [...currentRoomButtons, makeRoomInfoButton(createdRoomInfo)],
      );
    });

    socket.onEnterLobby((currentRoomInfos) => {
        currentRoomInfos.forEach((roomInfo) => {
        roomInfos.set(roomInfo.id, roomInfo);
      });
      setRoomInfoButtons(currentRoomInfos.map((roomInfo) => makeRoomInfoButton(roomInfo)));
    });

    socket.emitEnterLobby();

    /**
     * - switch문을 사용해줬는데 반복되는 부분들은 많고 수정할 부분은 적은 것 같아서 개선해보려고 합니다.
     *   - 딱히 방법이 떠오르지 않는데 case에 따라 numOfUsers와 isEnterable가 가져야할 값을 정하고 switch문을 탈출했을 때
     *     한번에 적용시키는 방법정도가 떠오르는 중인데, NO_USERS 케이스 때문에 바로 될 것 같지 않습니다. 더 생각해볼텐데
     *     좋은 방법이 있을까요?
     * - 마지막 setRoomInfoButtons에서 모든 Map을 돌면서 새로 컴포넌트 배열을 만들어서 반환하는 것이 아쉽습니다.
     *   변경된 내용만 찾아서 바꾸도록 하는 함수를 만드는 것이 좋을까요?
     */
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
