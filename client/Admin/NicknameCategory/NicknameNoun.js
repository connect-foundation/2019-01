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
        <UpdateButton onClick={() => updateButtonHandler(nicknameNoun.id)}>update</UpdateButton>
        <DeleteButton onClick={() => deleteButtonHandler(nicknameNoun.id)}>X</DeleteButton>
      </NicknameTr>
    ));
    setNounData(nicknameTagList);
  };

  //임시 코드입니다.
  useEffect(() => {
    // const QuizList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(QuizList);
    const testList1 = [{ id: 1, noun: 'aa' }];
    makeNewNounRow(testList1);
  }, []);
  
  return (
    <NicknameTable>
      <NicknameThead>
        <NicknameTd>id</NicknameTd>
        <NicknameTd>Noun</NicknameTd>
      </NicknameThead>
      <NicknameTbody>
        {NounData}
      </NicknameTbody>
    </NicknameTable>
  );
};

export default NicknameNoun;
