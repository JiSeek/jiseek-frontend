import { useCallback, useState } from 'react';

const useThrottle = () => {
  const [timer, setTimer] = useState(null);

  const throttle = useCallback(
    (func, delay) =>
      (...args) => {
        if (!timer) {
          const timerId = setTimeout(func.bind(this, ...args), delay);
          setTimer(() => timerId);
        }
      },
    [timer],
  );

  return throttle;
};

export default useThrottle;
