<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> e08b99446bd8ed73f081602c15260b32213668d9
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

const Field = () => {
  const [characters, setCharacters] = useState([]);
  const getCharacters = (data) => {
    data.characterList.forEach(({
      url, indexX, indexY, isMine, nickname,
    }) => {
      const character = new Character(url, indexX, indexY, nickname, isMine);
      if (isMine) {
        window.addEventListener('keydown', (event) => keydownEventHandler(event, character));
      }
      setCharacters((prevCharacters) => [...prevCharacters, character]);
    });
  };

  const getNewCharacter = ({
    url, indexX, indexY, isMine, nickname,
  }) => {
    const character = new Character(url, indexX, indexY, nickname, isMine);
    setCharacters((prevCharacters) => [...prevCharacters, character]);
  };

  const moveCharacter = (data) => {
    const matchedCharacter = characters.find((character) => character.getNickname() === data.nickname);
    matchedCharacter.move(data.direction);
  };

  useEffect(() => {
    socket.onEnterRoom(getCharacters);
    socket.onEnterNewUser(getNewCharacter);
    socket.onMove(moveCharacter);
  }, []);

  const getCanvasList = (characterList) => characterList.map(
    (character) => <Canvas key={character.getNickname()} character={character} />,
  );

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
