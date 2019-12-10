import React, { useState, useEffect } from 'react';
import {
  NicknameTable, NicknameTh, NicknameTd, NicknameThead, NicknameTr, NicknameTbody, DeleteButton, UpdateButton,
} from './style';
import URL from '../../../constants/url';

const NicknameNoun = () => {
  const [NounData, setNounData] = useState('');

  const deleteButtonHandler = (nicknameId) => {
    fetch('');
  };

  const updateButtonHandler = (nicknameId) => {
    fetch('');
  };

  const makeNewNounRow = (NicknameNounList) => {
    const nicknameTagList = () => NicknameNounList.map((nicknameNoun) => (
      <NicknameTr>
        <NicknameTh>{nicknameNoun.id }</NicknameTh>
        <NicknameTd>{nicknameNoun.noun}</NicknameTd>
        <UpdateButton onClick={() => updateButtonHandler(nicknameNoun.id)}><p>update</p></UpdateButton>
        <DeleteButton onClick={() => deleteButtonHandler(nicknameNoun.id)}><p>X</p></DeleteButton>
      </NicknameTr>
    ));
    setNounData(nicknameTagList);
  };

  useEffect(() => {
    // const QuizList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(QuizList);
    const testList1 = [{ id: 1, noun: 'aa' }];
    makeNewNounRow(testList1);
  }, []);
  return (
    <NicknameTable>
      <NicknameThead>
        <NicknameTr>
          <NicknameTh><p>id</p></NicknameTh>
          <NicknameTh><p>Noun</p></NicknameTh>
        </NicknameTr>
      </NicknameThead>
      <NicknameTbody>{NounData}</NicknameTbody>
    </NicknameTable>
  );
};

export default NicknameNoun;
