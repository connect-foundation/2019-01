import styled from 'styled-components';
import LOGIN from '../../constants/login';

const LoginPageWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;

const LoginButtonsWrapper = styled.div`
    position: absolute;
    width: ${LOGIN.WRAPPER.WIDTH}px;
    height: ${LOGIN.WRAPPER.HEIGTH}px;
    top: 70%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding: ${LOGIN.WRAPPER.PADDING}px;
    box-sizing: border-box;
    font-size: ${LOGIN.WRAPPER.FONT_SIZE}px;
`;

const LoginAnonyButton = styled.div`
    text-align: center;
    padding-top: ${LOGIN.ANONY.PADDING_TOP}px;
    margin-bottom: ${LOGIN.ANONY.MARGIN_BOTTOM}px;
    padding-bottom: ${LOGIN.ANONY.PADDING_BOTTOM}px;
    border: ${LOGIN.ANONY.BORDER};
    border-radius: ${LOGIN.ANONY.BORDER_RADIUS}px;
    background-color: ${LOGIN.ANONY.BACKGROUND_COLOR};
    box-shadow: ${LOGIN.ANONY.BOX_SHADOW};
    cursor: pointer;
`;

const LoginGitHubButton = styled(LoginAnonyButton)`
    display: flex;
    justify-content: center;
    padding: ${LOGIN.GITHUB_BUTTON.PADDING}px;
    text-decoration: none;
    color: black;
`;

const GitHubIcon = styled.svg.attrs({ viewBox: `${LOGIN.SVG.X} ${LOGIN.SVG.Y} ${LOGIN.SVG.W} ${LOGIN.SVG.H}` })`
    width: ${LOGIN.GITHUB_ICON.WIDTH}px;
    height: ${LOGIN.GITHUB_ICON.HEIGHT}px;
    shape-rendering: ${LOGIN.GITHUB_ICON.SHAPE_REDERING};
`;

const LoginGitHubText = styled.div`
    margin-left: ${LOGIN.GITHUB_TEXT.MARGIN_LEFT}px;
    padding-top: ${LOGIN.GITHUB_TEXT.PADDING_TOP}px;
`;

export {
  LoginPageWrapper, LoginButtonsWrapper, GitHubIcon, LoginGitHubButton, LoginAnonyButton, LoginGitHubText,
};
