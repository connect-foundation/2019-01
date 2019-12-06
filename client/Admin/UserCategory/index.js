import React, { useState, useEffect } from 'react';
import {
  UserBodyWrapper, UserTable, UserTd, UserThead, UserTr, UserTbody, DeleteButton, UpdateButton,
} from './style';
import URL from '../../../constants/url';

const UserCategory = () => {
  const [userData, setUserData] = useState('');

  const deleteButtonHandler = (githubId) => {
    fetch('');
  };

  const updateButtonHandler = (githubId) => {
    fetch('');
  };

  const makeNewRow = (userList) => {
    const userTagList = userList.map((user) => (
      <UserTr>
        <UserTd>{user.github_id}</UserTd>
        <UserTd>{user.is_admin}</UserTd>
        <UpdateButton onClick={() => updateButtonHandler(user.github_id)}>update</UpdateButton>
        <DeleteButton onClick={() => deleteButtonHandler(user.github_id)}>X</DeleteButton>
      </UserTr>
    ));
    setUserData(userTagList);
  };

  //임시 코드입니다.
  useEffect(() => {
    // const userList = fetch(`${URL.LOCAL_API_SERVER}`);
    // makeNewRow(userList);
    const testList = [{ github_id: 'bella', is_admin: 1 }];
    makeNewRow(testList);
  }, []);

  return (
    <UserBodyWrapper>
      <UserTable>
        <UserThead>
          <UserTd>github_id</UserTd>
          <UserTd>is_Admin</UserTd>
        </UserThead>
        <UserTbody>
          {userData}
        </UserTbody>
      </UserTable>
    </UserBodyWrapper>
  );
};

export default UserCategory;
