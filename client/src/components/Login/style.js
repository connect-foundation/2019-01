import styled from 'styled-components';
import LOGIN from '../Style/Login';
import { ROOM } from '../../constants/room';
import { setSize, setBorderAndRadius, setFlex } from '../Style/util';

export const LoginPageWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    min-width: ${LOGIN.BACKGROUND.MIN_W}px;
    min-height: ${LOGIN.BACKGROUND.MIN_H}px;
`;

export const LoginPageBackground = styled.img`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const LoginButtonsWrapper = styled.div`
    position: absolute;
    top: 75%;
    left: 50%;
    padding: ${LOGIN.WRAPPER.PADDING}px;
    box-sizing: border-box;
    font-size: ${LOGIN.WRAPPER.FONT_SIZE}px;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    ${setSize(LOGIN.WRAPPER)}
`;

export const LoginAnonyButton = styled.div`
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
    background-color: ${LOGIN.ANONY.BACKGROUND_COLOR};
    box-shadow: ${LOGIN.ANONY.BOX_SHADOW};
    cursor: pointer;
    ${setBorderAndRadius(LOGIN.ANONY)}
`;

export const LoginGitHubButton = styled(LoginAnonyButton)`
  padding: ${LOGIN.GITHUB_BUTTON.PADDING}px;
  text-decoration: none;
  color: black;
  ${setFlex('row', 'center')}
`;

export const GitHubIcon = styled.svg.attrs({ viewBox: `${LOGIN.SVG.X} ${LOGIN.SVG.Y} ${LOGIN.SVG.W} ${LOGIN.SVG.H}` })`
  shape-rendering: ${LOGIN.GITHUB_ICON.SHAPE_REDERING};
  ${setSize(LOGIN.GITHUB_ICON)}
`;

export const LoginGitHubText = styled.div`
  margin-left: ${LOGIN.GITHUB_TEXT.MARGIN_LEFT}px;
  padding-top: ${LOGIN.GITHUB_TEXT.PADDING_TOP}px;
`;
