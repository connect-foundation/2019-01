import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RoomInfoWrapper, RoomName, RoomCount } from './style';
import { ROOM_INFO } from '../../../constants/lobby';

const RoomInfoButton = ({
  roomId, name, numOfUsers, enterable,
}) => {
  const history = useHistory();

  const clickHandler = () => {
    if (enterable) history.replace(`/room/${roomId}`);
  };

  return (
    <RoomInfoWrapper enterable={enterable} onClick={clickHandler}>
      <RoomName>{name}</RoomName>
      <RoomCount>{numOfUsers}/{ROOM_INFO.CAPACITY}</RoomCount>
    </RoomInfoWrapper>
  );
};

RoomInfoButton.propTypes = PropTypes.shape({
  roomId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numOfUsers: PropTypes.number.isRequired,
  enterable: PropTypes.bool.isRequired,
}).isRequired;

export default RoomInfoButton;
