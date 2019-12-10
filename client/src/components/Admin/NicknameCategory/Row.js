import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  NicknameTh, NicknameTr, NicknameButton, NicknameInput,
} from './style';
import fetchData from '../util';

const Row = ({ id, type, nickname }) => {
  const [currentNickname, setNickname] = useState(nickname);

  const deleteButtonHandler = () => {
    fetchData('delete', `/admin/nickname/${type}`, { id });
  };

  const updateButtonHandler = () => {
    const data = { id };
    data[type] = currentNickname;
    fetchData('put', `/admin/nickname/${type}`, data);
  };

  const updateNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <NicknameTr>
      <NicknameTh>{id}</NicknameTh>
      <NicknameInput onChange={updateNickname} value={currentNickname} />
      <NicknameButton onClick={updateButtonHandler}><p>수정</p></NicknameButton>
      <NicknameButton onClick={deleteButtonHandler}><p>삭제</p></NicknameButton>
    </NicknameTr>
  );
};

Row.propTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export default Row;
