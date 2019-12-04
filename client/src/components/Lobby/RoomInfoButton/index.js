import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { RoomInfoWrapper, RoomName, RoomCount } from './style';
import { ROOM_INFO } from '../../../constants/lobby';

const RoomInfoButton = ({
  roomId, name, numOfUsers, enterable,
}) => {
  const history = useHistory();

  const clickHandler = () => {
    if (enterable) history.push(`/room/${roomId}`);
  };

  return (
    <RoomInfoWrapper enterable={enterable} onClick={clickHandler}>
      <RoomName>{name}</RoomName>
      <RoomCount>{numOfUsers}/{ROOM_INFO.CAPACITY}</RoomCount>
    </RoomInfoWrapper>
  );
};

RoomInfoButton.propTypes = propTypes.shape({
  roomId: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  numOfUsers: propTypes.number.isRequired,
  enterable: propTypes.bool.isRequired,
}).isRequired;

export default RoomInfoButton;
