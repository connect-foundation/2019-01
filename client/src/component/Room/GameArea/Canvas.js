import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FIELD } from '../../../constants/room';

const Canvas = ({ character }) => {
  console.log('canvas load');
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    character.drawImage(ctx);
  }, [character]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute' }}
      width={FIELD.getWidth()}
      height={FIELD.getHeight()} />
  );
};

Canvas.propTypes = {
  character: PropTypes.shape({
    drawImage: PropTypes.func.isRequired,
  }).isRequired,
};

export default Canvas;
