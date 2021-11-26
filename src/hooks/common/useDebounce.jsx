import { useCallback, useState } from 'react';

const useDebounce = () => {
  const [timer, setTimer] = useState(null);

  const debouce = useCallback(
    (func, delay) =>
      (...args) => {
        clearTimeout(timer);
        const timerId = setTimeout(func.bind(this, ...args), delay);
        setTimer(() => timerId);
      },
    [timer],
  );

  return debouce;
};

export default useDebounce;
