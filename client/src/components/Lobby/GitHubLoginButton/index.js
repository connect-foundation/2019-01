import React from 'react';
import {
  LoginButtonWrapper, GitHubIcon, LoginTextWrapper, GitHubPath,
} from './style';
import URL from '../../../constants/url';

const oauthUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_OAUTH : URL.LOCAL_GITHUB_OAUTH;
const GitHubLoginButton = () => (
  <LoginButtonWrapper as="a" href={oauthUrl}>
    <LoginTextWrapper>
      <GitHubIcon>
        <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
        <GitHubPath />
      </GitHubIcon>
      <div>login</div>
    </LoginTextWrapper>
  </LoginButtonWrapper>
);
export default GitHubLoginButton;
