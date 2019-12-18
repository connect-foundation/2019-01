/* eslint-disable no-param-reassign */
import { CHAT_BALLOON } from '../constants/room';

export const isFunction = (callback) => typeof callback === 'function';

export const changeNumberToTwoDigitString = (number) => number.toString().padStart(2, '0');

export const measureTextWidth = (chatText, ctx) => {
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
  if (measureTextWidth(chatText, ctx) <= CHAT_BALLOON.getTextWidth()) return [chatText];

  return chatText.split('').reduce((parsedChat, char) => {
    const lastIndex = parsedChat.length - 1;
    const [lastSentence] = parsedChat[lastIndex];
    if (measureTextWidth(lastSentence + char, ctx) > CHAT_BALLOON.getTextWidth()) {
      parsedChat = [...parsedChat, [char]];
      return parsedChat;
    }
    parsedChat[lastIndex] = [lastSentence + char];
    return parsedChat;
  }, [['']]);
};
