import React from 'react';
import { ChatAreaWrapper } from './style';
import Info from './Info';
import Log from './Log';
import Input from './Input';
import RoomName from './RoomName';

const ChatArea = () => (
  <ChatAreaWrapper>
    <RoomName />
    <Info />
    <Log />
    <Input />
  </ChatAreaWrapper>
);

export default ChatArea;
