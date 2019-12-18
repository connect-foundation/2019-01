import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomSnackbar from '../CustomSnackbar';
import fetchData from '../util';
import NicknameRow from './Row';
import URL from '../../../constants/url';

const Nickname = ({ type }) => {
  const [nicknameList, setnicknameList] = useState([]);
  const [newNickname, setNewNickname] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const timerId = useRef(null);
  const SNACKBAR_TIME_MS = 3000;

  const openSnackbar = (result) => {
    setOpen(true);
    setMessage(result ? '반영 성공' : '반영 실패');
    timerId.current = setTimeout(() => setOpen(false), SNACKBAR_TIME_MS);
  };

  const makeNewRow = (nicknameArray) => {
    const nicknameTagList = () => nicknameArray.map((nickname) => (
      <NicknameRow
        key={nickname.id}
        id={nickname.id}
        type={type}
        openSnackbar={openSnackbar}
        nickname={type === 'adj' ? nickname.adj : nickname.noun} />
    ));
    setnicknameList(nicknameTagList);
  };

  const updateNewNickname = (e) => setNewNickname(e.target.value);

  const addNickname = () => {
    const nicknameData = {};
    nicknameData[type] = newNickname;
    fetchData('post', `${URL.ADMIN.NICKNAME}${type}`, nicknameData);
  };

  useEffect(() => {
    fetchData('get', `${URL.ADMIN.NICKNAME}${type}/list`)
      .then((res) => makeNewRow(type === 'adj' ? res.adjList : res.nounList));
    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell />
            <TableCell>
              <TextField onChange={updateNewNickname} />
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={addNickname}>
                추가
              </Button>
            </TableCell>
          </TableRow>
          {nicknameList}
        </TableBody>
      </Table>
      <CustomSnackbar open={open} message={message} />
    </>
  );
};

Nickname.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Nickname;
