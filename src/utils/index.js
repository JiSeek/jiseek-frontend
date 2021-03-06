import React from 'react';
import sha256 from 'sha256';

export const setLocalStorage = (key, data) =>
  window.localStorage.setItem(key, JSON.stringify(data));

export const getLocalStorage = (key, defaultValue = null) => {
  const saved = window.localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultValue;
};

export const rmLocalStorage = (key) => window.localStorage.removeItem(key);

export const getLocaleDate = (dateString, lang) =>
  new Date(dateString).toLocaleString(lang === 'en' ? 'en-US' : 'ko-KR');

export const encSha256 = (target, salt) => sha256(target + salt);

export const getCurrentTime = () => parseInt(new Date().getTime() / 1000, 10);

export const parseParagraph = (text) => (
  <span>
    {text.split('\n').map((line, idx) => (
      <React.Fragment key={`${line}-${idx + 1}`}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </span>
);
