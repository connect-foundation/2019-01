import React, { useEffect } from 'react';
import CONSTANTS from './CONSTANTS';
import Character from './character';

const {
  CHARACTER, FIELD, TILE, KEYCODE,
} = CONSTANTS;
const NICK = 'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/nickfury.png';

const keydownEventHandler = (event, character) => {
  switch (event.keyCode) {
    case KEYCODE.LEFT:
      character.move(CHARACTER.DIRECTION.LEFT);
      break;
    case KEYCODE.UP:
      character.move(CHARACTER.DIRECTION.UP);
      break;
    case KEYCODE.RIGHT:
      character.move(CHARACTER.DIRECTION.RIGHT);
      break;
    case KEYCODE.DOWN:
      character.move(CHARACTER.DIRECTION.DOWN);
      break;
    default:
  }
};

const Field = () => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const myCharacter = new Character(ctx, NICK, 0, 0);

    window.addEventListener('keydown', (event) => keydownEventHandler(event, myCharacter));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundImage: `url('${FIELD.BACKGROUND}')` }}
      width={TILE.WIDTH * FIELD.COLUMN}
      height={TILE.HEIGHT * FIELD.ROW} />
  );
};

export default Field;
