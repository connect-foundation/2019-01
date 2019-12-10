import React from 'react';
import {
  LoginButtonWrapper, GitHubIcon, LoginTextWrapper, GitHubPath,
} from './style';
import URL from '../../../constants/url';

const oauthUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_OAUTH : URL.LOCAL_GITHUB_OAUTH;
const logoutUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_LOGOUT : URL.LOCAL_GITHUB_LOGOUT;

const GitHubLoginButton = ({ userName, makeUserGuest }) => {
  const logout = async () => {
    const res = await fetch(logoutUrl, { credentials: 'include' });
    const isJwtDeleted = await res.json();
    if (isJwtDeleted) makeUserGuest();
  };

  return (
    userName === 'guest'
      ? (
        <LoginButtonWrapper as="a" href={oauthUrl}>
          <LoginTextWrapper>
            <GitHubIcon>
              <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
              <GitHubPath />
            </GitHubIcon>
            <div>login</div>
          </LoginTextWrapper>
        </LoginButtonWrapper>
      )
      : (
        <LoginButtonWrapper as="a" onClick={logout}>
          <LoginTextWrapper isLoggedOut>
            <div>logout</div>
          </LoginTextWrapper>
        </LoginButtonWrapper>
      )
  );
};
export default GitHubLoginButton;
