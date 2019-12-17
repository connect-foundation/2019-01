/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { CHAT_BALLOON } from '../constants/room';

const _measureText = (chatText, ctx) => {
  const { width } = ctx.measureText(chatText);
  return width;
};

/**
 *
 * @param {string} chatText
 * @param {CanvasRenderingContext2D} ctx
 * @returns {Array.<string>} ['글자길이에맞게반환하', '면됨한글로열글자길이']
 */
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
