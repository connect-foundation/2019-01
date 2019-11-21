import React from 'react';
import GameArea from './GameArea';
import ChatArea from './ChatArea';
import { Wrapper } from './style';

const Room = () => (
  <Wrapper>
    <GameArea />
    <ChatArea />
  </Wrapper>
);

export default Room;
