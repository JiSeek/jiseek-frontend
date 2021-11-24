export const throttle = (func, delay) => {
  let timerId = null;
  return (...args) => {
    if (!timerId) {
      timerId = setTimeout(func.bind(this, ...args), delay);
    }
  };
};

export const debounce = (func, delay) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(func.bind(this, ...args), delay);
  };
};

// on: boolean type, on: true, off: false
export const setWorker = (on, func, delay) => {
  let timerId = null;
  console.log('리프레쉬 타이머', timerId);
  return (...args) => {
    if (!on) {
      clearTimeout(timerId);
      return;
    }
    timerId = setTimeout(func.bind(this, ...args), delay);
  };
};

export const storeAuth = (data) =>
  window.localStorage.setItem('jiseek_auth', JSON.stringify(data));
// 임시 보류
// const config = window.localStorage.getItem('jiseek');
// const oldCfg = config ? JSON.parse(config) : {};
// JSON.stringify({ ...oldCfg, auth: data }),
