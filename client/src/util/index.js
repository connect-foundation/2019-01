/* eslint-disable no-param-reassign */
import { CHAT_BALLOON } from '../constants/room';
import URL from '../constants/url';

const API_SERVER = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_API_SERVER : URL.LOCAL_API_SERVER;

/**
 * @param {function} callback
 * @returns {boolean}
 */
export const isFunction = (callback) => typeof callback === 'function';

/**
 *
 * @param {number} number
 * @returns {string}
 */
export const makeWithTwoDigits = (number) => number.toString().padStart(2, '0');

/**
 *
 * @param {string} method
 * @param {string} path
 * @param {Object} body
 * @returns {object}
 */
export const fetchData = async (method, path, body) => {
  const options = method === 'get' ? { credentials: 'include' } : {
    method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  const data = await fetch(`${API_SERVER}${path}`, options);
  return data.json();
};

/**
 * @returns {boolean}
 */
export const amIAdmin = async () => {
  const { result } = await fetchData('get', URL.ADMIN.IAM);
  return result;
};

/**
 * @param {string} chatText
 * @param {CanvasRenderingContext2D} ctx
 * @returns {number}
 */
export const measureTextWidth = (chatText, ctx) => {
  const { width } = ctx.measureText(chatText);
  return width;
};

/**
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
