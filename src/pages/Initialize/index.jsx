import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  AuthContext,
  LangContext,
  useAuth,
  ModalProvider,
} from '../../contexts';

const Initialize = ({ children }) => {
  const { token, updateToken, clearToken } = useAuth();
  const [lang, setLang] = useState('ko');
  const { i18n } = useTranslation();

  // App 초기 구동 시 초기화 루틴
  useEffect(() => {
    const authCfg = window.localStorage.getItem('jiseek_auth');
    if (authCfg) {
      const auth = JSON.parse(authCfg);
      const expired =
        auth.expires_at - parseInt(new Date().getTime() / 1000, 10) <= 0;
      if (!expired) {
        updateToken(auth);
      } else {
        clearToken();
      }
    }
    const langCfg = window.localStorage.getItem('jiseek_lang');
    i18n.changeLanguage(langCfg || 'ko');
    setLang(langCfg || 'ko');
  }, [updateToken, clearToken, i18n]);

  const changeLang = useCallback(
    (language) => {
      if (language !== 'ko' && language !== 'en') {
        return;
      }
      window.localStorage.setItem('jiseek_lang', language);
      i18n.changeLanguage(language);
      setLang(language);
    },
    [i18n],
  );

  return (
    <LangContext.Provider value={[lang, changeLang]}>
      <AuthContext.Provider value={{ token, updateToken, clearToken }}>
        <ModalProvider>{children}</ModalProvider>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
};

Initialize.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Initialize.defaultProps = {
  children: null,
};

export default Initialize;
