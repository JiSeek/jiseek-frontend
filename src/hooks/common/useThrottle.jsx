import { useCallback, useRef } from 'react';

const useThrottle = () => {
  const timer = useRef(null);

  const throttle = useCallback(
    (func, delay) =>
      (...args) => {
        if (!timer.current) {
          timer.current = setTimeout(() => {
            func.call(this, ...args);
            timer.current = null;
          }, delay);
        }
      },
    [],
  );

  return throttle;
};

export default useThrottle;
