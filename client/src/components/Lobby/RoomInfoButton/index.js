import React from 'react';
import propTypes from 'prop-types';
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

RoomInfoButton.propTypes = propTypes.shape({
  name: propTypes.string.isRequired,
  numOfUsers: propTypes.number.isRequired,
  enterable: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
}).isRequired;

export default RoomInfoButton;
