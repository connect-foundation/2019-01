import React from 'react';
import propTypes from 'prop-types';
import { AlertWrapper, AlertMessage, AlertOkButton } from './style';

const RoomEnterAlert = ({ message, closeAlert }) => (
  <AlertWrapper>
    <AlertMessage>{message}</AlertMessage>
    <AlertOkButton onClick={closeAlert}>ok</AlertOkButton>
  </AlertWrapper>
);

RoomEnterAlert.propTypes = propTypes.shape({
  message: propTypes.string.isRequired,
  closeAlert: propTypes.func.isRequired,
}).isRequired;

export default RoomEnterAlert;
