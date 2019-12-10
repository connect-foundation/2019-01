import React from 'react';
import { NicknameBodyWrapper } from './style';
import Nickname from './Nickname';

const NicknameCategory = () => (
  <NicknameBodyWrapper>
    <Nickname type="adj" />
    <Nickname type="noun" />
  </NicknameBodyWrapper>
);

export default NicknameCategory;
