import React, { useState } from 'react';
import { KEYCODE, CHAT_AREA } from '../../../constants/room';
import { ChatInput, InputBox, SendButton } from './style';
import socket from '../../../modules/socket';

const Input = () => {
  const [message, setMessage] = useState('');
  const inputRef = React.useRef();

  const sendMessage = () => {
    if (message === '') {
      inputRef.current.blur();
      return;
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
    const messageText = event.target.value;
    const newMessage = (
      messageText.length > CHAT_AREA.MAX_MESSAGE_LENGTH
        ? messageText.slice(0, CHAT_AREA.MAX_MESSAGE_LENGTH)
        : messageText
    );
    setMessage(newMessage);
  };

  return (
    <ChatInput>
      <InputBox
        ref={inputRef}
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
