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
    cursor: pointer;
`;

const LoginTextWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const GitHubIcon = styled.svg`
    width: ${LOGIN_BUTTON.GITHUB_ICON.WIDTH}px;
    height: ${LOGIN_BUTTON.GITHUB_ICON.HEIGHT}px;
    shape-rendering: ${LOGIN_BUTTON.GITHUB_ICON.SHAPE_REDERING};
`;

export { LoginButtonWrapper, GitHubIcon, LoginTextWrapper };
