import React from 'react';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { BackGround, Wrapper } from './style';

const Room = () => (
  <BackGround>
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  </BackGround>
);

export default Room;
