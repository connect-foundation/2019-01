import React, { useEffect } from 'react';

const Login = () => (
  <div>
    <h2>login page </h2>
    <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}>
            Login with github
    </a>
  </div>
);

export default Login;
