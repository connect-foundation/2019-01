import React from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
    width: 800px;
    height: 480px;
    // box-sizing: border-box;
    // border: 4px solid grey;
    background-image: url("https://kr.object.ncloudstorage.com/connect-2019-01/image/field.png");
`;

const Field = () => {
  const canvasRef = React.useRef();

  return (
    <Canvas ref={canvasRef} />
  );
};

export default Field;
