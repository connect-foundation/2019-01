import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UserTd, UserTr, CustomButton,
} from './style';
import fetchData from '../util';
import URL from '../../../constants/url';

const Row = ({ user }) => {
  const [isAdmin, githubId] = [user.is_admin, user.github_id];
  const [userAuthority, setAuthority] = useState(isAdmin);

  const deleteButtonHandler = () => {
    fetchData('delete', URL.ADMIN.USER, { githubId });
  };

  const updateButtonHandler = () => {
    const action = userAuthority ? 'authorize' : 'deauthorize';
    fetchData('put', URL.ADMIN.USER, { githubId, action });
  };

  const updateUserAuthority = () => {
    setAuthority((currentAuthority) => !currentAuthority);
  };

  return (
    <UserTr>
      <UserTd>{githubId}</UserTd>
      <UserTd>
        <input type="checkbox" onClick={updateUserAuthority} checked={userAuthority} />
      </UserTd>
      <CustomButton onClick={() => updateButtonHandler()}>수정</CustomButton>
      <CustomButton onClick={() => deleteButtonHandler()}>삭제</CustomButton>
    </UserTr>
  );
};

Row.propTypes = PropTypes.shape({
  user: PropTypes.Object,
}).isRequired;

export default Row;
