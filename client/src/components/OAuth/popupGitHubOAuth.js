const isFunction = (callback) => typeof callback === 'function';

const popupGitHubOAuth = (OAuthUrl, callback) => {
  const width = 600;
  const height = 800;
  const { screen } = window;
  const left = screen.width ? screen.width - width / 2 : 0;
  const top = screen.height ? screen.height - height / 2 : 0;
  const settings = `height=${height},width=${width},top=${top},left=${left},scrollbars,resizable,toolbar`;
  const popup = window.open(OAuthUrl, 'popUpWindow', settings);
  let timerId = null;

  const checkPopupClose = () => {
    if (popup.closed === false) return;
    clearInterval(timerId);
    if (isFunction(callback)) callback();
  };

  timerId = setInterval(checkPopupClose, 100);
};

export default popupGitHubOAuth;
