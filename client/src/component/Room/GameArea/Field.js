import React, { useEffect } from 'react';
import {
  CHARACTER, FIELD, TILE, KEYCODE,
} from '../../../constants/game-area';
import Character from '../../../class/character';

const NICK = 'https://kr.object.ncloudstorage.com/connect-2019-01/image/character/nickfury.png';

const keydownEventHandler = (event, character) => {
  const direction = {
    [KEYCODE.LEFT]: CHARACTER.DIRECTION.LEFT,
    [KEYCODE.UP]: CHARACTER.DIRECTION.UP,
    [KEYCODE.RIGHT]: CHARACTER.DIRECTION.RIGHT,
    [KEYCODE.DOWN]: CHARACTER.DIRECTION.DOWN,
  };
  character.move(direction[event.keyCode]);
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
