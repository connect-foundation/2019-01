import React from 'react';
import PropTypes from 'prop-types';
import {
  LoginButtonWrapper, GitHubIcon, LoginTextWrapper, GitHubPath,
} from './style';
import URL from '../../../constants/url';
import popupGitHubOAuth from '../../OAuth/popupGitHubOAuth';

const oauthUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_OAUTH : URL.LOCAL_GITHUB_OAUTH;
const logoutUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_LOGOUT : URL.LOCAL_GITHUB_LOGOUT;
const reload = () => window.location.reload();

const GitHubLoginButton = ({ userName }) => (
  userName === 'guest'
    ? (
      <LoginButtonWrapper onClick={() => popupGitHubOAuth(oauthUrl, reload)}>
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
      <LoginButtonWrapper as="a" href={logoutUrl}>
        <LoginTextWrapper isLoggedOut>
          <div>logout</div>
        </LoginTextWrapper>
      </LoginButtonWrapper>
    )
);

GitHubLoginButton.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default GitHubLoginButton;
