import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  NicknameTh, NicknameTr, NicknameButton, NicknameInput,
} from './style';
import fetchData from '../util';
import URL from '../../../constants/url';

const Row = ({ id, type, nickname }) => {
  const [currentNickname, setNickname] = useState(nickname);

  const deleteButtonHandler = () => {
    fetchData('delete', `${URL.ADMIN.NICKNAME}${type}`, { id });
  };

  const updateButtonHandler = () => {
    const data = { id };
    data[type] = currentNickname;
    fetchData('put', `${URL.ADMIN.NICKNAME}${type}`, data);
  };

  const updateNickname = (e) => setNickname(e.target.value);

  return (
    <NicknameTr>
      <NicknameTh>{id}</NicknameTh>
      <NicknameInput onChange={updateNickname} value={currentNickname} />
      <NicknameButton onClick={updateButtonHandler}>수정</NicknameButton>
      <NicknameButton onClick={deleteButtonHandler}>삭제</NicknameButton>
    </NicknameTr>
  );
};

Row.propTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export default Row;
