import React, { useState, useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../class/character';
import socket from '../../../class/socket';
import Canvas from './Canvas';

const Field = () => {
  const [characters, setCharacters] = useState(new Map());
  const [myCharacter, setMyCharacter] = useState(null);

  const keydownEventHandler = (event) => {
    if ((myCharacter instanceof Character) === false) return;
    if (myCharacter.isMoving()) return;

    const directionMap = {
      [KEYCODE.LEFT]: CHARACTER.DIRECTION.LEFT,
      [KEYCODE.UP]: CHARACTER.DIRECTION.UP,
      [KEYCODE.RIGHT]: CHARACTER.DIRECTION.RIGHT,
      [KEYCODE.DOWN]: CHARACTER.DIRECTION.DOWN,
    };

    const direction = directionMap[event.keyCode];
    if (direction !== undefined) socket.emitMove(direction);
  };

  const addCharacters = ({ characterList }) => {
    const changeCharactersImmutable = (prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({
        url, indexX, indexY, isMine, nickname,
      }) => {
        const character = new Character(url, indexX, indexY, nickname, isMine);
        if (isMine) setMyCharacter(() => character);
        newCharacters.set(nickname, character);
      });
      return newCharacters;
    };

    setCharacters(changeCharactersImmutable);
  };

  const updateCharacters = ({ characterList }) => {
    setCharacters(() => new Map());
    addCharacters({ characterList });
  };

  const moveCharacter = ({ canMove, nickname, direction }) => {
    const changeCharactersImmutable = (prevCharacters) => {
      const matchedCharacter = prevCharacters.get(nickname);
      if (matchedCharacter === undefined) return new Map(prevCharacters);

      if (canMove === false) {
        matchedCharacter.turn(direction);
        return new Map(prevCharacters);
      }

      matchedCharacter.move(direction);
      return new Map(prevCharacters);
    };

    setCharacters(changeCharactersImmutable);
  };

  const deleteCharacter = ({ characterList }) => {
    const changeCharactersImmutable = (prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({ nickname }) => {
        newCharacters.delete(nickname);
        setMyCharacter(() => null);
      });
      return newCharacters;
    };

    setCharacters(changeCharactersImmutable);
  };

  useEffect(() => {
    socket.onEnterRoom(addCharacters);
    socket.onEnterNewUser(addCharacters);
    socket.onMove(moveCharacter);
    socket.onEndRound(deleteCharacter);
    socket.onLeaveUser(deleteCharacter);
    socket.onEndGame(updateCharacters);
  }, []);

  useEffect(() => {
    window.onkeydown = keydownEventHandler;
  }, [myCharacter]);

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
