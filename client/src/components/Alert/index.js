import React from 'react';
import PropTypes from 'prop-types';
import { AlertWrapper, AlertMessage, AlertOkButton } from './style';

const Alert = ({ message, closeCallback }) => (
  <AlertWrapper>
    <AlertMessage>{message}</AlertMessage>
    <AlertOkButton onClick={closeCallback}>ok</AlertOkButton>
  </AlertWrapper>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default Alert;
