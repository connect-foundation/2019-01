import React from 'react';
import {} from 'dotenv/config';
import { useHistory } from 'react-router-dom';
import {
  LoginPageWrapper, LoginButtonsWrapper, GitHubIcon, LoginGitHubButton, LoginAnonyButton, LoginGitHubText,
} from './style';
import URL from '../../constants/url';
import LOGIN from '../../constants/login';

const Login = () => {
  const history = useHistory();

  const loginBackground = {
    background: `no-repeat url(${LOGIN.BACKGROUND})`,
    backgroundSize: 'cover',
  };

  const enterLobby = () => {
    history.push('/lobby');
  };

  return (
    <LoginPageWrapper style={loginBackground}>
      <LoginButtonsWrapper>
        <LoginGitHubButton as="a" href={URL.GITHUB_OAUTH}>
          <GitHubIcon>
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path stroke={LOGIN.SVG.PATH.COLOR} d={LOGIN.SVG.PATH.INDEXES} />
          </GitHubIcon>
          <LoginGitHubText>
            GitHub으로 로그인
          </LoginGitHubText>
        </LoginGitHubButton>
        <LoginAnonyButton onClick={enterLobby}>익명으로 로그인</LoginAnonyButton>
      </LoginButtonsWrapper>
    </LoginPageWrapper>
  );
};

export default Login;
