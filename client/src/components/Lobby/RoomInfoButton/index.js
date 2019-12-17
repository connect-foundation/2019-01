import React from 'react';
import PropTypes from 'prop-types';
import { RoomInfoWrapper, RoomName, RoomCount } from './style';
import { ROOM_INFO } from '../../../constants/lobby';

const RoomInfoButton = ({
  name, numOfUsers, enterable, onClick,
}) => (
  <RoomInfoWrapper enterable={enterable} onClick={onClick}>
    <RoomName>{name}</RoomName>
    <RoomCount>{numOfUsers}/{ROOM_INFO.CAPACITY}</RoomCount>
  </RoomInfoWrapper>
);

RoomInfoButton.propTypes = {
  name: PropTypes.string.isRequired,
  numOfUsers: PropTypes.number.isRequired,
  enterable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RoomInfoButton;
