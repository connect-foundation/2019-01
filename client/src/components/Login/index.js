import React from 'react';
import URL from '../../constants/url';

const Login = () => (
  <div>
    <h2>login page </h2>
    <a href={URL.GITHUB_OAUTH}>
            Login with github
    </a>
  </div>
);

export default Login;
