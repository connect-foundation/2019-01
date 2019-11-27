import React, { useState, useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';
import Canvas from './Canvas';

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

const copyMap = (source) => {
  const target = new Map();
  source.forEach((value, key) => {
    target.set(key, value);
  });
  return target;
};

const Field = () => {
  const [characters, setCharacters] = useState(new Map());
  const updateCharacters = (data) => {
    data.characterList.forEach(({
      url, indexX, indexY, isMine, nickname,
    }) => {
      const character = new Character(url, indexX, indexY, nickname, isMine);
      if (isMine) {
        window.addEventListener('keydown', (event) => keydownEventHandler(event, character));
      }
      characters.set(nickname, character);
    });
    setCharacters(() => copyMap(characters));
  };

  const moveCharacter = ({ canMove, nickname, direction }) => {
    const matchedCharacter = characters.get(nickname);
    if (matchedCharacter === undefined) return;

    if (canMove === false) {
      matchedCharacter.turn(direction);
      return;
    }
    matchedCharacter.move(direction);
  };

  const deleteCharacter = (nicknameList) => {
    nicknameList.forEach((nickname) => {
      characters.delete(nickname);
    });
    setCharacters(() => copyMap(characters));
  };

  useEffect(() => {
    socket.onEnterRoom(updateCharacters);
    socket.onEnterNewUser(updateCharacters);
    socket.onMove(moveCharacter);
    socket.onLeaveUser(deleteCharacter);
  }, []);

  const getCanvasList = (characterMap) => {
    const canvasList = [];
    characterMap.forEach((character) => {
      canvasList.push(<Canvas key={character.getNickname()} character={character} />);
    });
    return canvasList;
  };

  return (
    <div
      style={{
        backgroundImage: `url('${FIELD.BACKGROUND}')`,
        width: FIELD.getWidth(),
        height: FIELD.getHeight(),
      }}>
      {getCanvasList(characters)}
    </div>
  );
};

export default Field;
