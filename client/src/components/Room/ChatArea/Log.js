import React, { useState, useEffect, useRef } from 'react';
import {
  ChatLog, Chat, ChatNickname, ChatMessage, ChatNotice,
} from './style';
import { CHAT_AREA } from '../../../constants/room';
import socket from '../../../modules/socket';

const Log = () => {
  const [chatList, setChatList] = useState([]);
  const logRef = useRef();

  const makeChat = (nickname, message, index) => (
    <Chat key={index}>
      <ChatNickname>{nickname}: </ChatNickname>
      <ChatMessage>{message}</ChatMessage>
    </Chat>
  );

  const addChat = ({ nickname, message }) => {
    setChatList((prevChatList) => {
      const newChat = makeChat(nickname, message, prevChatList.length);
      return [...prevChatList, newChat];
    });
  };

  useEffect(() => {
    socket.onChatMessage(addChat);

    return () => socket.offChatMessage();
  }, []);

  useEffect(() => {
    const log = logRef.current;
    log.scrollTop = log.scrollHeight;
  }, [chatList]);

  return (
    <ChatLog ref={logRef}>
      <ChatNotice>{CHAT_AREA.NOTICE_MESSAGE}</ChatNotice>
      {chatList}
    </ChatLog>
  );
};

export default Log;
