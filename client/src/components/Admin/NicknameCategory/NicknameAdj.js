import React, { useState, useEffect } from 'react';
import {
  NicknameTable, NicknameTh, NicknameTd, NicknameThead, NicknameTr, NicknameTbody, DeleteButton, UpdateButton,
} from './style';
import URL from '../../../constants/url';

const NicknameAdj = () => {
  const [adjData, setAdjData] = useState('');

  const deleteButtonHandler = (nicknameId) => {
    fetch('');
  };

  const updateButtonHandler = (nicknameId) => {
    fetch('');
  };

  const makeNewAdjRow = (NicknameAdjList) => {
    const nicknameTagList = () => NicknameAdjList.map((nicknameAdj) => (
      <NicknameTr>
        <NicknameTh>{nicknameAdj.id}</NicknameTh>
        <NicknameTd>{nicknameAdj.noun}</NicknameTd>
        <UpdateButton onClick={() => updateButtonHandler(nicknameAdj.id)}>update</UpdateButton>
        <DeleteButton onClick={() => deleteButtonHandler(nicknameAdj.id)}>X</DeleteButton>
      </NicknameTr>
    ));
    setAdjData(nicknameTagList);
  };

  useEffect(() => {
    // const QuizList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(QuizList);
    const testList1 = [{ id: 1, noun: 'aa' }];
    makeNewAdjRow(testList1);
  }, []);
  return (
    <NicknameTable>
      <NicknameThead>
        <NicknameTd>id</NicknameTd>
        <NicknameTd>adj</NicknameTd>
      </NicknameThead>
      <NicknameTbody>
        {adjData}
      </NicknameTbody>
    </NicknameTable>
  );
};

export default NicknameAdj;
