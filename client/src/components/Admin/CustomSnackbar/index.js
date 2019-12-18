import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const CustomSnackbar = ({ open, message }) => (
  <Snackbar
    open={open}
    message={<span style={{ fontWeight: 'bold' }}>{message}</span>}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
);

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomSnackbar;
