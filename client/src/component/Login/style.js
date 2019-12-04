import styled from 'styled-components';
import LOBBY from '../../constants/login';

const LoginPageWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;

const LoginButtonsWrapper = styled.div`
    position: absolute;
    width: 800px;
    height: 200px;
    top: 70%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding: 20px;
    box-sizing: border-box;
    font-size: 30px;
`;


const LoginGitHubButton = styled.a`
    display: flex;
    justify-content: center;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid lightslategrey;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 3px 3px 0px dimgrey;
    cursor: pointer;
`;

const LoginGitHubText = styled.div`
    margin-left: 10px;
    padding-top: 9px;
`;

const LoginAnonyButton = styled.div`
    text-align: center;
    height: 44px;
    justify-content: space-between;
    padding-top: 25px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border: 2px solid lightslategrey;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 3px 3px 0px dimgrey;
    cursor: pointer;
`;

const GitHubIcon = styled.svg`
    width: ${LOBBY.GITHUB_ICON.WIDTH}px;
    height: ${LOBBY.GITHUB_ICON.HEIGHT}px;
    shape-rendering: ${LOBBY.GITHUB_ICON.SHAPE_REDERING};
`;

export {
  LoginPageWrapper, LoginButtonsWrapper, GitHubIcon, LoginGitHubButton, LoginAnonyButton, LoginGitHubText,
};
