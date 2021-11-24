export const throttle = (func, delay) => {
  let timerId = null;
  return (...args) => {
    if (!timerId) {
      timerId = setTimeout(func.bind(this, ...args), delay);
    }
  };
};

const REDIRECT_BASE_URL = process.env.REACT_APP_LOGIN_REDIRECT_BASE_URL;
export const createRedirectUrl = (type = '') =>
  `${REDIRECT_BASE_URL}/${type}/callback`;
