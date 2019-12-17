/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { CHAT_BALLOON } from '../constants/room';

const _measureText = (chatText, ctx) => {
  const { width } = ctx.measureText(chatText);
  return width;
};

export const parseChat = (chatText, ctx) => {
  if (_measureText(chatText, ctx) <= CHAT_BALLOON.getTextWidth()) return [chatText];

  return chatText.split('').reduce((parsedChat, char) => {
    const lastIndex = parsedChat.length - 1;
    const [lastSentence] = parsedChat[lastIndex];
    if (_measureText(lastSentence + char, ctx) > CHAT_BALLOON.getTextWidth()) {
      parsedChat = [...parsedChat, [char]];
      return parsedChat;
    }

    parsedChat[lastIndex] = [lastSentence + char];
    return parsedChat;
  }, [['']]);
};
