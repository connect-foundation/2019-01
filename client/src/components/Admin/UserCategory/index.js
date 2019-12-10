import React, { useState, useEffect } from 'react';
import {
  UserBodyWrapper, UserTable, UserTh, UserThead, UserTbody, UserTr, UserTd, UserInput, CustomButton,
} from './style';
import Row from './Row';
import fetchData from '../util';

const UserCategory = () => {
  const [userData, setUserData] = useState('');

  const makeNewRow = (userList) => {
    const userTagList = userList.map((user) => <Row user={user} />);
    setUserData(userTagList);
  };

  useEffect(() => {
    fetchData('get', '/admin/user/list')
      .then((res) => makeNewRow(res.userList));
  }, []);

  return (
    <UserBodyWrapper>
      <UserTable>
        <UserThead>
          <UserTr>
            <UserTh><p>github_id</p></UserTh>
            <UserTh><p>is_Admin</p></UserTh>
          </UserTr>
        </UserThead>
        <UserTbody>
          {userData}
        </UserTbody>
      </UserTable>
    </UserBodyWrapper>
  );
};

export default UserCategory;
