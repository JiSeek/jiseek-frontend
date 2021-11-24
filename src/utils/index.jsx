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
