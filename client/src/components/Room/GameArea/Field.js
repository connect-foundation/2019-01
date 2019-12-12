import React, { useState, useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE,
} from '../../../constants/room';
import Character from '../../../modules/character';
import socket from '../../../modules/socket';
import Canvas from './Canvas';
import ThanosCanvas from './ThanosCanvas';

const Field = () => {
  const [characters, setCharacters] = useState(new Map());
  const [myCharacter, setMyCharacter] = useState(null);
  const [thanos, setThanos] = useState('');
  let lastTimerId = null;

  const addCharacters = ({ characterList }) => {
    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({
        url, indexX, indexY, isMine, nickname,
      }) => {
        const character = new Character(url, indexX, indexY, nickname, isMine);
        if (isMine) setMyCharacter(() => character);
        newCharacters.set(nickname, character);
      });
      return newCharacters;
    });
  };

  const moveCharacter = ({
    canMove, nickname, direction, newIndexX, newIndexY,
  }) => {
    const moveMatchedCharacter = (character) => {
      if (character === undefined) return;
      if (canMove) {
        character.move(direction, newIndexX, newIndexY);
        return;
      }
      character.turn(direction);
    };

    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      const matchedCharacter = newCharacters.get(nickname);
      moveMatchedCharacter(matchedCharacter);
      return newCharacters;
    });
  };

  const deleteCharacters = ({ characterList }) => {
    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({ nickname }) => {
        const character = newCharacters.get(nickname);
        if (character === undefined) return;
        if (character.isMine()) setMyCharacter(() => null);
        newCharacters.delete(nickname);
      });
      return newCharacters;
    });
  };

  const killCharacters = ({ characterList }) => {
    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({ nickname }) => {
        const character = newCharacters.get(nickname);
        character.setAlive(false);
      });
      return newCharacters;
    });
  };

  const teleportCharacters = ({ characterList }) => {
    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      characterList.forEach(({ nickname, indexX, indexY }) => {
        const character = newCharacters.get(nickname);
        if (character === undefined) return;

        if (character.isAlive() === false) character.setAlive(true);
        character.teleport(indexX, indexY);
      });
      return newCharacters;
    });
  };

  const updateCharacters = ({ characterList }) => {
    lastTimerId = setTimeout(() => {
      teleportCharacters({ characterList });
    }, 3000);
  };

  const appearThanos = (data) => {
    setThanos(<ThanosCanvas
      killCharacters={() => killCharacters(data)}
      fieldX={data.answer ? FIELD.FALSE_FIELD_X : FIELD.TRUE_FIELD_X} />);
  };

  const disappearThanos = (data) => {
    setThanos('');
    teleportCharacters(data);
  };

  useEffect(() => {
    socket.onStartRound(disappearThanos);
    socket.onEnterRoom(addCharacters);
    socket.onEnterNewUser(addCharacters);
    socket.onMove(moveCharacter);
    socket.onEndRound(appearThanos);
    socket.onLeaveUser(deleteCharacters);
    socket.onEndGame(updateCharacters);

    return () => {
      clearTimeout(lastTimerId);
    };
  }, []);

  useEffect(() => {
    const keydownEventHandler = (event) => {
      if (event.target.tagName === 'INPUT') return;
      if ((myCharacter instanceof Character) === false) return;
      if (myCharacter.isMoving()) return;
      if (myCharacter.isAlive() === false) return;

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
      {thanos}
    </div>
  );
};

export default Field;
