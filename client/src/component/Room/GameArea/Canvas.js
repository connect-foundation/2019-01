import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FIELD } from '../../../constants/room';

const Canvas = ({ character }) => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    character.drawImage(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute' }}
      width={FIELD.getWidth()}
      height={FIELD.getHeight()} />
  );
};

Canvas.propTypes = {
  character: PropTypes.object.isRequired,
};

export default Canvas;
