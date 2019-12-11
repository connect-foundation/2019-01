import React, { useState, useEffect } from 'react';
import {
  UserBodyWrapper, UserTable, UserTh, UserThead, UserTbody, UserTr,
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
            <UserTh>github_id</UserTh>
            <UserTh>is_Admin</UserTh>
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
