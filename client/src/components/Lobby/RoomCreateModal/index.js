import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  ModalWrapper, ModalHeader, ModalTitle, ModalCloseButton, ModalInputWrapper,
  ModalInput, ModalInputLength, ModalCreateRoomButton,
} from './style';
import { ROOM_INFO } from '../../../constants/lobby';
import socket from '../../../modules/socket';

const RoomCreateModal = ({ setOpen }) => {
  const [roomName, setRoomName] = useState('');

  const keyInputHandler = (e) => {
    const roomNameText = e.target.value;
    const newRoomName = (
      roomNameText.length > ROOM_INFO.NAME_MAXLENGTH
        ? roomNameText.slice(0, ROOM_INFO.NAME_MAXLENGTH)
        : roomNameText
    );
    setRoomName(newRoomName);
  };
  const closeHandler = () => setOpen(false);
  const createRoomHandler = () => {
    const trimmedName = roomName.trim();
    if (trimmedName.length === 0) setRoomName('');
    else socket.emitCreateRoom(roomName);
  };

  return (
    <ModalWrapper>
      <ModalHeader>
        <ModalTitle>Create Room...</ModalTitle>
        <ModalCloseButton onClick={closeHandler}> close </ModalCloseButton>
      </ModalHeader>
      <ModalInputWrapper>
        <ModalInput type="text" value={roomName} onChange={keyInputHandler} placeholder="input room name" />
        <ModalInputLength>{roomName.length}/{ROOM_INFO.NAME_MAXLENGTH}</ModalInputLength>
      </ModalInputWrapper>
      <ModalCreateRoomButton onClick={createRoomHandler}>create();</ModalCreateRoomButton>
    </ModalWrapper>
  );
};

RoomCreateModal.propTypes = propTypes.shape({
  setOpen: propTypes.func.isRequired,
}).isRequired;

export default RoomCreateModal;
