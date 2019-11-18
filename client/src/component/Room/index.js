import React from 'react';
import styled from 'styled-components';
import GameArea from './GameArea';
import ChatArea from './ChatArea';

const BackGround = styled.div`
    position: relative;
    height: 100vh;
    background-size: 100% 100%;
    background-image: url("https://i.imgur.com/v20152u.jpg");
    // background-color: #E7EAC1;
`;

const Wrapper = styled.div`
    position: absolute; 
    display: flex;
    width: 1100px;
    height: 650px;
    justify-content: space-between;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    

`;

const Room = () => (
  <BackGround>
    <Wrapper>
      <GameArea />
      <ChatArea />
    </Wrapper>
  </BackGround>
);

export default Room;
