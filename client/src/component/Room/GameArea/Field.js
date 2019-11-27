import React, { useEffect, useState } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';

const keydownEventHandler = (event, character) => {
  if ((character instanceof Character) === false) return;
  if (character.isMoving()) return;

  const directionMap = {
    [KEYCODE.LEFT]: CHARACTER.DIRECTION.LEFT,
    [KEYCODE.UP]: CHARACTER.DIRECTION.UP,
    [KEYCODE.RIGHT]: CHARACTER.DIRECTION.RIGHT,
    [KEYCODE.DOWN]: CHARACTER.DIRECTION.DOWN,
  };

  const direction = directionMap[event.keyCode];
  if (direction !== undefined) socket.emitMove(direction);
};

const Field = () => {
  const canvasRef = React.useRef();
  const [characters, setCharacters] = useState([]);

  const moveCharacter = (data) => {
    const matchedCharacter = characters.find((character) => character.getNickname() === data.nickname);
    matchedCharacter.move(data.direction);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const getCharacters = (data) => {
      data.characterList.forEach(({
        url, indexX, indexY, isMine, nickname,
      }) => {
        const character = new Character(ctx, url, indexX, indexY, nickname, isMine);
        setCharacters(characters.push(character));
        if (isMine) {
          window.addEventListener('keydown', (event) => keydownEventHandler(event, character));
        }
      });
    };

    socket.onEnterRoom(getCharacters);
    socket.onEnterNewUser(getCharacters);
    socket.onMove(moveCharacter);
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
