import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Thanos from '../../../modules/thanos';
import { FIELD } from '../../../constants/room';

const ThanosCanvas = ({ fieldX }) => {
  const canvasRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const thanos = new Thanos(fieldX);
    thanos.drawImage(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute' }}
      width={FIELD.WIDTH}
      height={FIELD.HEIGHT} />
  );
};

ThanosCanvas.propTypes = {
  fieldX: PropTypes.number.isRequired,
};

export default ThanosCanvas;
