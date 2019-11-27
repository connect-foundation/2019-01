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
  const [characterList, setCharacterList] = useState([]);
  const getCharacters = (data) => {
    data.characterList.forEach(({
      url, indexX, indexY, isMine, nickname,
    }) => {
      const character = new Character(url, indexX, indexY, nickname, isMine);
      if (isMine) {
        window.addEventListener('keydown', (event) => keydownEventHandler(event, character));
      }
      setCharacterList((prevCharacterList) => [...prevCharacterList, character]);
    });
  };

  const getNewCharacter = ({
    url, indexX, indexY, isMine, nickname,
  }) => {
    const character = new Character(url, indexX, indexY, nickname, isMine);
    setCharacterList((prevCharacterList) => [...prevCharacterList, character]);
  };

  useEffect(() => {
    socket.onEnterRoom(getCharacters);
    socket.onEnterNewUser(getNewCharacter);
  }, []);

  const getCanvasList = (characters) => characters.map(
    (character) => <Canvas key={character.getNickname()} character={character} />,
  );

  return (
    <div
      style={{
        backgroundImage: `url('${FIELD.BACKGROUND}')`,
        width: FIELD.getWidth(),
        height: FIELD.getHeight(),
      }}>
      {getCanvasList(characterList)}
    </div>
  );
};

export default Field;
