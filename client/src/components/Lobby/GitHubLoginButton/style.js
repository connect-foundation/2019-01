import styled from 'styled-components';
import { setSize, setBorderAndRadius } from '../../Style/util';
import { LOGIN_BUTTON, BUTTON_EFFECT } from '../../Style/Lobby/constants';

export const LoginButtonWrapper = styled.div`
    width: ${LOGIN_BUTTON.WIDTH}px;
    height: ${LOGIN_BUTTON.HEIGHT}px;
    padding: ${LOGIN_BUTTON.PADDING};
    background-color: ${LOGIN_BUTTON.BACKGROUND_COLOR};
    text-align: center;
    box-sizing: border-box;
    stroke: black;
    color: black;
    text-decoration: none;
    cursor: pointer;
    ${BUTTON_EFFECT.HOVER}
    ${BUTTON_EFFECT.ACTIVE}
    ${setBorderAndRadius(LOGIN_BUTTON)}
`;

export const LoginTextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ isLoggedOut }) => (isLoggedOut ? 'center' : 'space-between')};
`;

export const GitHubPath = styled.path.attrs({ d: LOGIN_BUTTON.SVG.PATH.INDEXES })``;

export const GitHubIcon = styled.svg.attrs(
  { viewBox: `${LOGIN_BUTTON.SVG.X} ${LOGIN_BUTTON.SVG.Y} ${LOGIN_BUTTON.SVG.W} ${LOGIN_BUTTON.SVG.H}` },
)`
    shape-rendering: ${LOGIN_BUTTON.GITHUB_ICON.SHAPE_REDERING};
    ${setSize(LOGIN_BUTTON.GITHUB_ICON)}
`;
