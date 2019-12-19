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
import { fetchData } from '../../../util';
import NicknameRow from './Row';
import URL from '../../../constants/url';
import ADMIN from '../../../constants/admin';

const Nickname = ({ type }) => {
  const [nicknameList, setnicknameList] = useState([]);
  const [newNickname, setNewNickname] = useState('');
  const [fetchResult, setFetchResult] = useState(false);
  const [open, setOpen] = useState(false);
  const timerId = useRef(null);

  const openSnackbar = (result) => {
    setOpen(true);
    setFetchResult(result);
    timerId.current = setTimeout(() => setOpen(false), ADMIN.SNACKBAR_TIME_MS);
  };

  /**
   * @param {Array} nicknameArray
   */
  const makeNewRow = (nicknameArray) => {
    setnicknameList(() => nicknameArray.map((nickname) => (
      <NicknameRow
        key={nickname.id}
        id={nickname.id}
        type={type}
        openSnackbar={openSnackbar}
        nickname={type === 'adj' ? nickname.adj : nickname.noun} />
    )));
  };

  const updateNewNickname = (event) => setNewNickname(event.target.value);

  const addNickname = () => {
    const nicknameData = {};
    nicknameData[type] = newNickname;
    fetchData('post', `${URL.ADMIN.NICKNAME}/${type}`, nicknameData)
      .then(({ result }) => openSnackbar(result));
  };

  useEffect(() => {
    fetchData('get', `${URL.ADMIN.NICKNAME}/${type}/list`)
      .then((res) => makeNewRow(type === 'adj' ? res.adjList : res.nounList));
    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{type.toUpperCase()}</TableCell>
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
      <CustomSnackbar open={open} result={fetchResult} />
    </>
  );
};

Nickname.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Nickname;
