import React from 'react';
import Field from './Field';
import DashBoard from './DashBoard';
import { GameAreaWrapper } from './style';

const GameArea = () => (
  <GameAreaWrapper>
    <DashBoard />
    <Field />
  </GameAreaWrapper>
);

export default GameArea;
