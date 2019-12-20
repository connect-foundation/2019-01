import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  LoginPageWrapper, LoginPageLogo, LoginButtonsWrapper, GitHubIcon,
  LoginGitHubButton, LoginAnonyButton, LoginGitHubText, GitHubPath,
} from './style';
import URL from '../../constants/url';
import socket from '../../modules/socket';
import LOGIN from '../../constants/login';
import popupGitHubOAuth from '../OAuth/popupGitHubOAuth';

const Login = () => {
  const history = useHistory();
  const oauthUrl = process.env.NODE_ENV === 'production' ? URL.PRODUCTION_GITHUB_OAUTH : URL.LOCAL_GITHUB_OAUTH;

  const enterLobbyAsGithubUser = () => {
    history.push('/lobby');
  };

  const enterLobbyAsGuest = () => {
    socket.setGuest(true);
    history.push('/lobby');
  };

  return (
    <LoginPageWrapper>
      <LoginPageLogo src={LOGIN.LOGO.URL} alt="logo" />
      <LoginButtonsWrapper>
        <LoginGitHubButton onClick={() => popupGitHubOAuth(oauthUrl, enterLobbyAsGithubUser)}>
          <GitHubIcon>
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <GitHubPath />
          </GitHubIcon>
          <LoginGitHubText>
            GitHub으로 로그인
          </LoginGitHubText>
        </LoginGitHubButton>
        <LoginAnonyButton onClick={enterLobbyAsGuest}>익명으로 로그인</LoginAnonyButton>
      </LoginButtonsWrapper>
    </LoginPageWrapper>
  );
};

export default Login;
