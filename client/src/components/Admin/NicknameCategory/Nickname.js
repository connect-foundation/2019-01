import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  NicknameTable, NicknameTh, NicknameThead, NicknameTr, NicknameTbody, NicknameButton, NicknameInput,
} from './style';
import fetchData from '../util';
import Row from './Row';

const Nickname = ({ type }) => {
  const [nicknameList, setnicknameList] = useState([]);
  const [newNickname, setNewNickname] = useState('');

  const makeNewRow = (nicknameArray) => {
    const nicknameTagList = () => nicknameArray.map((nickname) => (
      <Row id={nickname.id} type={type} nickname={type === 'adj' ? nickname.adj : nickname.noun} />
    ));
    setnicknameList(nicknameTagList);
  };

  const updateNewNickname = (e) => setNewNickname(e.target.value);

  const addNickname = () => {
    const nicknameData = {};
    nicknameData[type] = newNickname;
    fetchData('post', `/admin/nickname/${type}`, nicknameData);
  };

  useEffect(() => {
    fetchData('get', `/admin/nickname/${type}/list`)
      .then((res) => makeNewRow(type === 'adj' ? res.adjList : res.nounList));
  }, []);

  return (
    <NicknameTable>
      <NicknameThead>
        <NicknameTr>
          <NicknameTh>id=</NicknameTh>
          <NicknameTh>{type}</NicknameTh>
        </NicknameTr>
      </NicknameThead>
      <NicknameTbody>
        {nicknameList}
        <NicknameTr>
          <NicknameTh />
          <NicknameInput onChange={updateNewNickname} />
          <NicknameButton onClick={addNickname}>추가</NicknameButton>
        </NicknameTr>
      </NicknameTbody>
    </NicknameTable>
  );
};

Row.propTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
}).isRequired;

export default Nickname;
