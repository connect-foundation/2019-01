import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchData } from '../../../util';
import URL from '../../../constants/url';

const Row = ({
  id, type, nickname, openSnackbar,
}) => {
  const [currentNickname, setNickname] = useState(nickname);

  const deleteButtonHandler = () => {
    fetchData('delete', `${URL.ADMIN.NICKNAME}${type}`, { id })
      .then(({ result }) => openSnackbar(result));
  };

  const updateButtonHandler = () => {
    const data = { id, type: currentNickname };
    fetchData('put', `${URL.ADMIN.NICKNAME}${type}`, data)
      .then(({ result }) => openSnackbar(result));
  };

  const updateNickname = (e) => setNickname(e.target.value);

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <TextField onChange={updateNickname} value={currentNickname} />
      </TableCell>
      <TableCell align="right" style={{ width: '200px' }}>
        <Button
          variant="contained"
          onClick={updateButtonHandler}>
            수정
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteButtonHandler}>
            삭제
        </Button>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default Row;
