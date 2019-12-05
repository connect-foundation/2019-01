import React, { useState } from 'react';
import {
  ChatLog, Chat, ChatNinkname, ChatMessage, ChatNotice,
} from './style';

const Log = () => {
  const [chatList, setChatList] = useState([]);

  const makeChat = (nickname, message, index) => (
    <Chat key={index}>
      <ChatNinkname>{nickname}: </ChatNinkname>
      <ChatMessage>{message}</ChatMessage>
    </Chat>
  );

  return (
    <ChatLog>
      <ChatNotice>** 매너채팅 해요 ^_^ **</ChatNotice>
      {chatList}
    </ChatLog>
  );
};

export default Log;
