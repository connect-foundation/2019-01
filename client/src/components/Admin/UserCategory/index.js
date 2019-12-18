import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserRow from './Row';
import CustomSnackbar from '../CustomSnackbar';
import fetchData from '../util';
import URL from '../../../constants/url';

const UserCategory = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const timerId = useRef(null);
  const SNACKBAR_TIME_MS = 3000;

  const openSnackbar = (result) => {
    setOpen(true);
    setMessage(result ? '반영 성공' : '반영 실패');
    timerId.current = setTimeout(() => setOpen(false), SNACKBAR_TIME_MS);
  };

  const makeNewRow = (userList) => {
    const userTagList = userList.map((user) => (
      <UserRow key={user.github_id} user={user} openSnackbar={openSnackbar} />));
    setUserData(userTagList);
  };

  useEffect(() => {
    fetchData('get', URL.ADMIN.USER_LIST)
      .then((res) => makeNewRow(res.userList));
    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>GitHub ID</TableCell>
            <TableCell>ADMIN</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{userData}</TableBody>
      </Table>
      <CustomSnackbar open={open} message={message} />
    </>
  );
};

export default UserCategory;
