import React from 'react';
import PropTypes from 'prop-types';
import { AlertWrapper, AlertMessage, AlertOkButton } from './style';

const RoomEnterAlert = ({ message, closeAlert }) => (
  <AlertWrapper>
    <AlertMessage>{message}</AlertMessage>
    <AlertOkButton onClick={closeAlert}>ok</AlertOkButton>
  </AlertWrapper>
);

RoomEnterAlert.propTypes = {
  message: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

export default RoomEnterAlert;
