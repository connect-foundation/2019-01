import React from 'react';
import { NicknameBodyWrapper } from './style';
import NicknameAdj from './NicknameAdj';

const NicknameCategory = () => (
  <NicknameBodyWrapper>
    <NicknameAdj type="adj" />
    <NicknameAdj type="noun" />
  </NicknameBodyWrapper>
);

export default NicknameCategory;
