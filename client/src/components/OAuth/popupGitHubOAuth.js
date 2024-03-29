import OAUTH from '../../constants/oauth';
import { isFunction } from '../../util';

const popupGitHubOAuth = (OAuthUrl, callback) => {
  const width = OAUTH.POPUP.WIDTH;
  const height = OAUTH.POPUP.HEIGHT;
  const { screen } = window;
  const left = screen.width ? screen.width - width / 2 : 0;
  const top = screen.height ? screen.height - height / 2 : 0;
  const settings = `height=${height},width=${width},top=${top},left=${left},scrollbars,resizable,toolbar`;
  const popup = window.open(OAuthUrl, 'popUpWindow', settings);
  let timerId = null;

  const checkPopupClosed = () => {
    if (popup.closed === false) return;
    clearInterval(timerId);
    if (isFunction(callback)) callback();
  };

  timerId = setInterval(checkPopupClosed, OAUTH.CHECK_TIME_MS);
};

export default popupGitHubOAuth;
