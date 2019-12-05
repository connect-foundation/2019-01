import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';
import socket from '../../modules/socket';

const Room = () => {
  const { roomId } = useParams();
  if (socket.isConnected() === false) {
    // 빈 객체로 접속해도 query 오류가 나는지 확인해야함
    // 게임이 시작된 상태면 socket 연결은 하지만 캐릭터가 안나타나게 해야함
    // 게임이 시작된 상태에서 들어가면 이미 죽은 캐릭터가 나타나는 이슈 해결해야함
    socket.connect({});
  }

  useEffect(() => {
    socket.emitEnterRoom(roomId);
  }, []);

  return (
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  );
};

export default Room;
