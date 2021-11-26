// import { useCallback, useRef } from 'react';

// const useWorker = () => {
//   const workList = useRef([]);

//   const setWorker = useCallback(
//     (func, delay) =>
//       (...args) => {
//         console.log(`Worker Start Time: ${delay}`);
//         const timerId = setTimeout(func.bind(this, ...args), delay);
//         workList.current.push(timerId);
//       },
//     [],
//   );

//   const clearWorker = useCallback((idx = 0) => {
//     console.log(`Worker Clear!${idx}`);
//     clearTimeout(workList.current[idx]);
//     workList.current.splice(idx, 1);
//   }, []);

//   return { workList, setWorker, clearWorker };
// };

// export default useWorker;
