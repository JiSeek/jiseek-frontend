import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const LangContext = createContext('ko');

export const useLangContext = () => {
  const langContext = useContext(LangContext);
  if (!langContext) {
    throw new Error('Use LangContext inside Provider.');
  }
  return langContext;
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('ko');
  const changeLang = (language) => {
    if (language !== 'ko' && language !== 'en') {
      return;
    }
    window.localStorage.setItem('jiseek_lang', language);
    setLang(language);
  };

  useEffect(() => {
    const config = window.localStorage.getItem('jiseek_lang');
    if (config) {
      setLang(config);
    }
  }, []);

  return (
    <LangContext.Provider value={[lang, changeLang]}>
      {children}
    </LangContext.Provider>
  );
};

LangProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LangProvider.defaultProps = {
  children: null,
};

export default LangContext;
