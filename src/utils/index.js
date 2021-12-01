export const setLocalStorage = (key, data) =>
  window.localStorage.setItem(key, JSON.stringify(data));

export const getLocalStorage = (key, defaultValue) => {
  const saved = window.localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultValue;
};

export const rmLocalStorage = (key) => window.localStorage.removeItem(key);

export const getLocaleDate = (dateString, lang) =>
  new Date(dateString).toLocaleString(lang === 'en' ? 'en-US' : 'ko-KR');
