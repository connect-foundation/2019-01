const isFunction = (callback) => typeof callback === 'function';

const popupGitHubOAuth = (OAuthUrl, callback) => {
  const width = 600;
  const height = 800;
  const { screen } = window;
  const left = screen.width ? screen.width - width / 2 : 0;
  const top = screen.height ? screen.height - height / 2 : 0;
  const settings = `height=${height},width=${width},top=${top},left=${left},scrollbars,resizable,toolbar`;
  const pop = window.open(OAuthUrl, 'popUpWindow', settings);
  const timer = setInterval(() => {
    if (pop.closed) {
      clearInterval(timer);
      if (isFunction(callback)) callback();
    }
  }, 100);
};

export default popupGitHubOAuth;
