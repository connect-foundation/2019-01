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

  const addCharacters = ({ characterList }) => {
    const addCharactersImmutable = (prevCharacters) => {
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

    setCharacters(addCharactersImmutable);
  };

  const updateCharacters = ({ characterList }) => {
    setTimeout(() => {
      setCharacters(() => new Map());
      addCharacters({ characterList });
    }, 3000);
  };

  const moveCharacter = ({ canMove, nickname, direction }) => {
    const moveMatchedCharacter = (character) => {
      if (character === undefined) return;
      if (canMove) {
        character.move(direction);
        return;
      }
      character.turn(direction);
    };

    const moveCharactersImmutable = (prevCharacters) => {
      const matchedCharacter = prevCharacters.get(nickname);
      moveMatchedCharacter(matchedCharacter);
      return new Map(prevCharacters);
    };

    setCharacters(moveCharactersImmutable);
  };

  const deleteCharacter = ({ characterList }) => {
    const deleteCharactersImmutable = (prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({ nickname }) => {
        const character = newCharacters.get(nickname);
        if (character.isMine()) setMyCharacter(() => null);
        newCharacters.delete(nickname);
      });
      return newCharacters;
    };

    setCharacters(deleteCharactersImmutable);
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
