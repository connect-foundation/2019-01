import React, { useState, useEffect } from 'react';
import { KEYCODE, CHAT_AREA, CHAT_BALLOON } from '../../../constants/room';
import {
  ChatInput, InputBox, SendButton, ChatCanvas,
} from './style';
import { parseChat } from '../../../util';
import socket from '../../../modules/socket';

const Input = () => {
  const [message, setMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState(() => {});
  const inputRef = React.useRef();
  const canvasRef = React.useRef();

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

  useEffect(() => {
    const chatCanvas = canvasRef.current;
    const ctx = chatCanvas.getContext('2d');

    setUpdateMessage(() => (event) => {
      const messageText = event.target.value;
      const parsedChat = parseChat(messageText, ctx);
      const balloonLineCount = parsedChat.length;
      let sliceIndex;

      if (balloonLineCount > CHAT_BALLOON.MAX_LINE_COUNT) {
        sliceIndex = parsedChat.slice(0, CHAT_BALLOON.MAX_LINE_COUNT).join('').length;
      }

      if (sliceIndex === undefined && messageText.length > CHAT_AREA.MAX_MESSAGE_LENGTH) {
        sliceIndex = CHAT_AREA.MAX_MESSAGE_LENGTH;
      }

      const newMessage = (
        sliceIndex
          ? messageText.slice(0, sliceIndex)
          : messageText);
      setMessage(newMessage);
    });
  }, []);

  return (
    <ChatInput>
      <ChatCanvas ref={canvasRef} />
      <InputBox
        ref={inputRef}
        value={message}
        onChange={updateMessage}
        onKeyDown={sendMessageWithEnter} />
      <SendButton
        onClick={sendMessage}>send
      </SendButton>
    </ChatInput>
  );
};

export default Input;
