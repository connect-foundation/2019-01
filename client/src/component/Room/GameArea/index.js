import React from 'react';
import styled from 'styled-components';
import Field from './Field';
import DashBoard from './DashBoard';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 800px;
    height: 100%;
    box-sizing: border-box;
`;

const GameArea = () => (
  <Wrapper>
    <DashBoard />
    <Field />
  </Wrapper>
);

export default GameArea;
