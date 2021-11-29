import { useCallback, useRef } from 'react';

const useDebounce = () => {
  const timer = useRef(null);

  const debouce = useCallback(
    (func, delay) =>
      (...args) => {
        clearTimeout(timer.current);
        const timerId = setTimeout(func.bind(this, ...args), delay);
        timer.current = timerId;
      },
    [],
  );

  return debouce;
};

export default useDebounce;
