import React from 'react';
import { NicknameBodyWrapper } from './style';
import NicknameAdj from './NicknameAdj';
import NicknameNoun from './NicknameNoun';

const NicknameCategory = () => (
  <NicknameBodyWrapper>
    <NicknameAdj />
    <NicknameNoun />
  </NicknameBodyWrapper>
);

export default NicknameCategory;
