import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarMessageWrapper } from '../style';
import ADMIN from '../../../constants/admin';

const CustomSnackbar = ({ open, result }) => (
  <Snackbar
    open={open}
    message={(
      <SnackbarMessageWrapper>
        {result ? ADMIN.MESSAGE.SUCCESS : ADMIN.MESSAGE.FAILURE}
      </SnackbarMessageWrapper>
    )}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
);

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  result: PropTypes.bool.isRequired,
};

export default CustomSnackbar;
