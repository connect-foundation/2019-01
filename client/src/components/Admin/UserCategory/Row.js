import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  UserTd, UserTr, DeleteButton, UpdateButton,
} from './style';
import fetchData from '../util';

const Row = ({ user }) => {
  const [isAdmin, githubId] = [user.is_admin, user.github_id];
  const [userAuthority, setAuthority] = useState(isAdmin);

  const deleteButtonHandler = () => {
    fetchData('delete', '/admin/user', { githubId });
  };

  const updateButtonHandler = () => {
    const action = userAuthority ? 'authorize' : 'deauthorize';
    fetchData('put', '/admin/user', { githubId, action });
  };

  const setUserAuthority = () => {
    setAuthority((currentAuthority) => !currentAuthority);
  };

  return (
    <UserTr>
      <UserTd>{githubId}</UserTd>
      <UserTd>
        <input type="checkbox" onClick={() => setUserAuthority()} checked={userAuthority} />
      </UserTd>
      <UpdateButton onClick={() => updateButtonHandler()}>수정</UpdateButton>
      <DeleteButton onClick={() => deleteButtonHandler()}>삭제</DeleteButton>
    </UserTr>
  );
};

Row.propTypes = propTypes.shape({
  user: propTypes.Object,
}).isRequired;

export default Row;
