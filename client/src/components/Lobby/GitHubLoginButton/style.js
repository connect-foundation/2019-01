import styled from 'styled-components';
import { LOGIN_BUTTON, BUTTON_EFFECT } from '../../../constants/lobby';

const LoginButtonWrapper = styled.div`
    width: ${LOGIN_BUTTON.WIDTH}px;
    height: ${LOGIN_BUTTON.HEIGHT}px;
    padding: ${LOGIN_BUTTON.PADDING};
    text-align: center;
    box-sizing: border-box;
    border: ${LOGIN_BUTTON.BORDER};
    border-radius: ${LOGIN_BUTTON.BORDER_RADIUS}px;
    background-color: ${LOGIN_BUTTON.BACKGROUND_COLOR};
    ${BUTTON_EFFECT.ACTIVE}
    ${BUTTON_EFFECT.HOVER}
    stroke: #000000;
    color: black;
    text-decoration: none;
    cursor: pointer;
`;

const LoginTextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const GitHubPath = styled.path.attrs({ d: LOGIN_BUTTON.SVG.PATH.INDEXES })``;

const GitHubIcon = styled.svg.attrs({ viewBox: `${LOGIN_BUTTON.SVG.X} ${LOGIN_BUTTON.SVG.Y} ${LOGIN_BUTTON.SVG.W} ${LOGIN_BUTTON.SVG.H}` })`
    width: ${LOGIN_BUTTON.GITHUB_ICON.WIDTH}px;
    height: ${LOGIN_BUTTON.GITHUB_ICON.HEIGHT}px;
    shape-rendering: ${LOGIN_BUTTON.GITHUB_ICON.SHAPE_REDERING};
`;

export {
  LoginButtonWrapper, GitHubIcon, LoginTextWrapper, GitHubPath,
};
