import React from 'react';
import { ChatAreaWrapper } from './style';
import Info from './Info';
import Log from './Log';
import Input from './Input';

const ChatArea = () => (
  <ChatAreaWrapper>
    <Info />
    <Log />
    <Input />
  </ChatAreaWrapper>
);

export default ChatArea;
