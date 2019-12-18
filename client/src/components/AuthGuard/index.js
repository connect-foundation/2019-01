import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AmIAdmin } from '../../util';

const AuthGuard = ({ component: Component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    AmIAdmin().then((result) => (
      result
        ? setIsLoading(false)
        : history.goBack()));
  }, []);

  return (isLoading ? <p>loading...</p> : <Component />);
};

AuthGuard.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default AuthGuard;
