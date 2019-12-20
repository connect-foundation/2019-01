import styled from 'styled-components';
import LOGIN from '../Style/Login';
import { ROOM } from '../Style/Room';
import { setSize, setBorderAndRadius, setFlex } from '../Style/util';

export const LoginPageWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: ${LOGIN.BACKGROUND.MIN_W}px;
    min-height: ${LOGIN.BACKGROUND.MIN_H}px;
`;

export const LoginPageLogo = styled.img`
    display: block;
    margin: 0 auto;
    width: ${LOGIN.LOGO.WIDTH}px;
`;

export const LoginButtonsWrapper = styled.div`
    margin: 0 auto;
    padding: ${LOGIN.WRAPPER.PADDING}px;
    stroke: black;
    box-sizing: border-box;
    font-size: ${LOGIN.WRAPPER.FONT_SIZE}px;
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

export const GitHubPath = styled.path.attrs({ d: LOGIN.SVG.PATH_INDEXES })``;

export const GitHubIcon = styled.svg.attrs({ viewBox: `${LOGIN.SVG.X} ${LOGIN.SVG.Y} ${LOGIN.SVG.W} ${LOGIN.SVG.H}` })`
  shape-rendering: ${LOGIN.GITHUB_ICON.SHAPE_REDERING};
  ${setSize(LOGIN.GITHUB_ICON)}
`;

export const LoginGitHubText = styled.div`
  margin-left: ${LOGIN.GITHUB_TEXT.MARGIN_LEFT}px;
  padding-top: ${LOGIN.GITHUB_TEXT.PADDING_TOP}px;
`;
