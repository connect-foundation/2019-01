import React, { useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';

let ctx = '';
const keydownEventHandler = (event, character) => {
  if (character === null) return;

  const direction = {
    [KEYCODE.LEFT]: CHARACTER.DIRECTION.LEFT,
    [KEYCODE.UP]: CHARACTER.DIRECTION.UP,
    [KEYCODE.RIGHT]: CHARACTER.DIRECTION.RIGHT,
    [KEYCODE.DOWN]: CHARACTER.DIRECTION.DOWN,
  };

  character.move(direction[event.keyCode]);
};

const getMyCharacter = ({ character, otherCharacters }) => {
  const newCharacter = new Character(ctx, character.url, character.indexX, character.indexY);
  window.addEventListener('keydown', (event) => keydownEventHandler(event, newCharacter));
  otherCharacters.forEach((c) => new Character(ctx, c.url, c.indexX, c.indexY));
};

const getOtherCharacter = (character) => new Character(ctx, character.url, character.indexX, character.indexY);

const Field = () => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');

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
