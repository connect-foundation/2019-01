import React, { useEffect } from 'react';

const OAuth = () => {
  useEffect(() => {
    window.open('about:blank', '_self');
    window.close();
  }, []);

  return (
    <p>Check OAuth...</p>
  );
};

export default OAuth;
