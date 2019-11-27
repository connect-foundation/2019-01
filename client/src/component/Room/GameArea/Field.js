import React, { useState, useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';
import Canvas from './Canvas';

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
  const [characterInfos, setCharacterInfos] = useState([]);
  const getCharacters = (data) => {
    data.characterList.forEach(({
      url, indexX, indexY, isMine,
    }) => {
      const character = new Character(url, indexX, indexY, isMine);
      if (isMine) {
        window.addEventListener('keydown', (event) => keydownEventHandler(event, character));
      }
      setCharacterInfos((prev) => [...prev, character]);
    });
  };

  const getOtherCharacter = ({
    url, indexX, indexY, isMine,
  }) => {
    const character = new Character(url, indexX, indexY, isMine);
    setCharacterInfos((prev) => [...prev, character]);
  };

  useEffect(() => {
    socket.onEnterRoom(getCharacters);
    socket.onEnterNewUser(getOtherCharacter);
  }, []);

  const getCanvasList = (characters) => characters.map((character, i) => <Canvas key={i} character={character} />);

  return (
    <div style={{ backgroundImage: `url('${FIELD.BACKGROUND}')`, width: FIELD.getWidth(), height: FIELD.getHeight() }}>
      {getCanvasList(characterInfos)}
    </div>
  );
};

export default Field;
