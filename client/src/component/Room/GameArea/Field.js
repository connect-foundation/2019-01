import React, { useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';

const keydownEventHandler = (event, character) => {
  if ((character instanceof Character) === false) return;

  const directionMap = {
    [KEYCODE.LEFT]: CHARACTER.DIRECTION.LEFT,
    [KEYCODE.UP]: CHARACTER.DIRECTION.UP,
    [KEYCODE.RIGHT]: CHARACTER.DIRECTION.RIGHT,
    [KEYCODE.DOWN]: CHARACTER.DIRECTION.DOWN,
  };

  const direction = directionMap[event.keyCode];
  if (direction !== undefined) character.move(direction);
};

const Field = () => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const getMyCharacter = ([character, otherCharacters]) => {
      const newCharacter = new Character(ctx, character.url, character.indexX, character.indexY);
      window.addEventListener('keydown', (event) => keydownEventHandler(event, newCharacter));
      otherCharacters.forEach((c) => new Character(ctx, c.url, c.indexX, c.indexY));
    };

    const getOtherCharacter = ({ url, indexX, indexY }) => new Character(ctx, url, indexX, indexY);

    socket.onEnterRoom(getMyCharacter);
    socket.onEnterPlayer(getOtherCharacter);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundImage: `url('${FIELD.BACKGROUND}')` }}
      width={FIELD.getWidth()}
      height={FIELD.getHeight()} />
  );
};

export default Field;
