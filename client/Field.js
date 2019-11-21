import React, { useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';

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

    const getMyCharacter = ({ character, otherCharacters }) => {
      new Character(ctx, character.url, character.indexX, character.indexY);
      otherCharacters.forEach((c) => {
        new Character(ctx, c.url, c.indexX, c.indexY);
      });
    };
    socket.onEnterRoom(getMyCharacter);

    const getOtherCharacter = (character) => new Character(ctx, character.url, character.indexX, character.indexY);
    socket.onEnterPlayer(getOtherCharacter);


    // window.addEventListener('keydown', (event) => keydownEventHandler(event, myCharacter));
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
