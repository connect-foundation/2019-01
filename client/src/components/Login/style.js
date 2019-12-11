import styled from 'styled-components';
import LOGIN from '../../constants/login';
import { ROOM } from '../../constants/room';

const LoginPageWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    min-width: ${LOGIN.BACKGROUND.MIN_W}px;
    min-height: ${LOGIN.BACKGROUND.MIN_H}px;
`;

const LoginPageBackground = styled.img`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const LoginButtonsWrapper = styled.div`
    position: absolute;
    width: ${LOGIN.WRAPPER.WIDTH}px;
    height: ${LOGIN.WRAPPER.HEIGHT}px;
    top: 75%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding: ${LOGIN.WRAPPER.PADDING}px;
    box-sizing: border-box;
    font-size: ${LOGIN.WRAPPER.FONT_SIZE}px;
`;

const LoginAnonyButton = styled.div`
    :active {
        box-shadow: none;
    }
    :hover {
        background-image: ${ROOM.BUTTON_HOVER_EFFECT};
    }

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
  LoginPageWrapper, LoginButtonsWrapper, GitHubIcon, LoginGitHubButton,
  LoginAnonyButton, LoginGitHubText, LoginPageBackground,
};
