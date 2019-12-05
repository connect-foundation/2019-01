import React, { useState } from 'react';
import { KEYCODE, CHAT_AREA } from '../../../constants/room';
import { ChatInput, InputBox, SendButton } from './style';
import socket from '../../../modules/socket';

const Input = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message === '') return;
    if (message.length > CHAT_AREA.MAX_MESSAGE_LENGTH) {
      setMessage(message.slice(0, CHAT_AREA.MAX_MESSAGE_LENGTH));
    }

    socket.emitChatMessage(message);
    setMessage('');
  };

  const sendMessageWithEnter = (event) => {
    if (event.keyCode === KEYCODE.ENTER) {
      sendMessage();
    }
  };

  const updateMessage = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  return (
    <ChatInput>
      <InputBox
        value={message}
        onChange={updateMessage}
        onKeyUp={sendMessageWithEnter} />
      <SendButton
        onClick={sendMessage}>send
      </SendButton>
    </ChatInput>
  );
};

export default Input;
