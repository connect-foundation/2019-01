/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  CHARACTER, FIELD, KEYCODE, THANOS,
} from '../../../constants/room';
import Character from '../../../modules/character';
import socket from '../../../modules/socket';
import Canvas from './Canvas';
import Thanos from '../../../modules/thanos';

const Field = () => {
  const [characters, setCharacters] = useState(new Map());
  const [myCharacter, setMyCharacter] = useState(null);
  const thanosCanvasRef = React.useRef();
  const thanos = new Thanos();

  const killCharacters = (newCharacters) => ({ nickname }) => {
    const character = newCharacters.get(nickname);
    character.setAlive(false);
  };

  /**
   * @param {Object} param0
   *   @param {boolean} param0.canMove
   *   @param {string} param0.nickname
   *   @param {number} param0.direction
   *   @param {number} param0.newIndexX
   *   @param {number} param0.newIndexY
   */
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

  /**
   * @param {Object} param0
   *   @param {string} param0.nickname
   *   @param {string} param0.message
   */
  const chatCharacters = ({ nickname, message }) => {
    setCharacters((prevCharacters) => {
      const newCharacters = new Map(prevCharacters);
      const chatCharacter = newCharacters.get(nickname);
      if (chatCharacter.isAlive() === false) return newCharacters;
      chatCharacter.setCurrentChat(message);
      chatCharacter.chat();
      return newCharacters;
    });
  };

  /**
   * @param {Array} newCharacters
   * @returns {Function(
   * {
   * url: string,
   * indexX: number,
   * indexY: number,
   * isMine: boolean,
   * nickname: string
   * })}
   */
  const _addCharacter = (newCharacters) => ({
    url, indexX, indexY, isMine, nickname,
  }) => {
    const character = new Character(url, indexX, indexY, nickname, isMine);
    if (isMine) setMyCharacter(() => character);
    newCharacters.set(nickname, character);
  };

  /**
   * @param {Array} newCharacters
   * @returns {Function({nickname: string, indexX: number, indexY: number})}
   */
  const _teleportCharacter = (newCharacters) => ({ nickname, indexX, indexY }) => {
    const character = newCharacters.get(nickname);
    if (character === undefined) return;

    if (character.isAlive() === false) character.setAlive(true);
    character.clearMoveQueue();
    character.teleport(indexX, indexY);
  };

  /**
   * @param {Array} newCharacters
   * @returns {Function({nickname: string})}
   */
  const _deleteCharacter = (newCharacters) => ({ nickname }) => {
    const character = newCharacters.get(nickname);
    if (character === undefined) return;
    if (character.isMine()) setMyCharacter(() => null);
    newCharacters.delete(nickname);
  };

  const attachDataToFunction = (characterList, controlCharacter) => (prevCharacters) => {
    const newCharacters = new Map(prevCharacters);
    characterList.forEach(controlCharacter(newCharacters));
    return newCharacters;
  };

  const bindFunction = (controlCharacter) => ({ characterList }) => {
    setCharacters(attachDataToFunction(characterList, controlCharacter));
  };

  const appearThanos = (data) => {
    if (document.hidden === false) {
      thanos.setFieldXValue(data.answer ? THANOS.FALSE_X : THANOS.TRUE_X);
      thanos.draw(0);
    }
    bindFunction(killCharacters)(data);
  };

  const teleportCharacters = bindFunction(_teleportCharacter);

  const addCharacters = bindFunction(_addCharacter);

  const deleteCharacters = bindFunction(_deleteCharacter);

  const getCanvasList = (characterMap) => {
    const canvasList = [];
    characterMap.forEach((character) => {
      canvasList.push(<Canvas key={character.getNickname()} character={character} />);
    });
    return canvasList;
  };

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
    const isSkill = event.shiftKey;

    if (direction === undefined) return;
    if (isSkill) {
      socket.emitUseSkill(direction);
      return;
    }
    socket.emitMove(direction);
  };

  useEffect(() => {
    const canvas = thanosCanvasRef.current;
    const ctx = canvas.getContext('2d');
    thanos.injectCtx(ctx);

    socket.onEnterRoom(addCharacters);
    socket.onEnterNewUser(addCharacters);
    socket.onLeaveUser(deleteCharacters);
    socket.onEndGame(teleportCharacters);
    socket.onResetGame(teleportCharacters);
    socket.onStartRound(teleportCharacters);
    socket.onEndRound(appearThanos);
    socket.onMove(moveCharacter);
    socket.onChatMessage(chatCharacters);

    return () => {
      socket.offEnterRoom();
      socket.offEnterNewUser();
      socket.offLeaveUser();
      socket.offEndGame();
      socket.offResetGame();
      socket.offStartRound();
      socket.offEndRound();
      socket.offMove();
      socket.offChatMessage();
    };
  }, []);

  useEffect(() => {
    window.onkeydown = keydownEventHandler;
  }, [myCharacter]);

  return (
    <div
      style={{
        backgroundImage: `url('${FIELD.BACKGROUND}')`,
        width: FIELD.getWidth(),
        height: FIELD.getHeight(),
      }}>
      {getCanvasList(characters)}
      <canvas
        ref={thanosCanvasRef}
        style={{ position: 'absolute' }}
        width={FIELD.getWidth()}
        height={FIELD.getHeight()} />
    </div>
  );
};

export default Field;
