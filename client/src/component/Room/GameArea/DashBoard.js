import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: auto;
    width: 750px;
    height: 120px;
    border-radius: 0.8rem;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-image: url("https://kr.object.ncloudstorage.com/connect-2019-01/image/dashboard.png");
`;

const DashBoard = () => (
  <Wrapper />
);

export default DashBoard;
