import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { fetchData } from '../../../util';
import URL from '../../../constants/url';

const Row = ({ user, openSnackbar }) => {
  const [isAdmin, githubId] = [Boolean(user.is_admin), user.github_id];
  const [userAuthority, setAuthority] = useState(isAdmin);

  const deleteButtonHandler = () => {
    fetchData('delete', URL.ADMIN.USER, { githubId })
      .then(({ result }) => openSnackbar(result));
  };

  const updateButtonHandler = () => {
    const action = userAuthority ? 'authorize' : 'deauthorize';
    fetchData('put', URL.ADMIN.USER, { githubId, action })
      .then(({ result }) => openSnackbar(result));
  };

  const updateUserAuthority = () => setAuthority(!userAuthority);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {user.github_id}
      </TableCell>
      <TableCell>
        <Checkbox
          checked={userAuthority}
          onChange={updateUserAuthority}
          value="primary" />
      </TableCell>
      <TableCell align="right" style={{ width: '200px' }}>
        <Button
          variant="contained"
          onClick={() => updateButtonHandler()}>
          수정
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteButtonHandler()}>
          삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  user: PropTypes.shape({
    is_admin: PropTypes.number.isRequired,
    github_id: PropTypes.string.isRequired,
  }).isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default Row;
