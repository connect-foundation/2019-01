import React, { useState } from 'react';
import { LoginButtonWrapper, GitHubIcon, LoginTextWrapper } from './style';

const GitHubLoginButton = () => {
  const [isLogin, setLogin] = useState(false);

  return (
    <LoginButtonWrapper onClick={() => setLogin(!isLogin)}>
      {
        isLogin
          ? <div>logout</div>
          : (
            <LoginTextWrapper>
              <GitHubIcon viewBox="0 -0.5 11 11">
                <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                <path stroke="#000000" d="M3 0h5M2 1h7M1 2h2M4 2h3M8 2h2M0 3h3M8 3h3M0 4h2M9 4h2M0 5h2M9 5h2M0 6h2M9 6h2M0 7h3M8 7h3M1 8h1M3 8h1M7 8h3M2 9h1M7 9h2M3 10h1M7 10h1" />
              </GitHubIcon>
              <div>login</div>
            </LoginTextWrapper>
          )
       }
    </LoginButtonWrapper>
  );
};

export default GitHubLoginButton;
