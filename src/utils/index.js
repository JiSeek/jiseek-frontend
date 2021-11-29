export * from './validation';

export const setLocalStorage = (key, data) =>
  window.localStorage.setItem(key, JSON.stringify(data));

export const getLocalStorage = (key, defaultValue) => {
  const saved = window.localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

export const getLocaleDate = (dateString, lang) =>
  new Date(dateString).toLocaleString(lang === 'en' ? 'en-US' : 'ko-KR');
