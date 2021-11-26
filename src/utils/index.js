export const storeAuth = (data) =>
  window.localStorage.setItem('jiseek_auth', JSON.stringify(data));

export const getLocaleDate = (dateString, lang) =>
  new Date(dateString).toLocaleString(lang === 'en' ? 'en-US' : 'ko-KR');

// React에서 동작 X => hook으로 변경
// export const throttle = (func, delay) => {
//   let timerId = null;
//   return (...args) => {
//     if (!timerId) {
//       timerId = setTimeout(func.bind(this, ...args), delay);
//     }
//   };
// };

// export const debounce = (func, delay) => {
//   let timerId = null;
//   return (...args) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(func.bind(this, ...args), delay);
//   };
// };

// // on: boolean type, on: true, off: false
// export const setWorker = (on, func, delay) => {
//   let timerId = null;
//   return (...args) => {
//     if (!on) {
//       clearTimeout(timerId);
//       return;
//     }
//     timerId = setTimeout(func.bind(this, ...args), delay);
//   };
// };
