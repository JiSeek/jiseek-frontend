import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import {
  AuthContext,
  LangContext,
  initialTkn,
  useAuth,
  ModalProvider,
} from '../../contexts';
import { setLocalStorage } from '../../utils';

const getRefreshTime = (hour) => hour * 60 * 60;

const Initialize = ({ children }) => {
  const queryClient = useQueryClient();
  const { token, updateToken, refreshToken, clearToken } = useAuth();
  const [lang, setLang] = useState('ko');
  const timerId = useRef(null);

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
        setLocalStorage('jiseek_auth', initialTkn);
      }
    }
    const langCfg = window.localStorage.getItem('jiseek_lang');
    setLang(langCfg || 'ko');
  }, [updateToken, setLang]);

  useEffect(() => {
    const remainTime =
      token.expTime - parseInt(new Date().getTime() / 1000, 10);
    if (remainTime <= 0) {
      // console.log('3', timerId, remainTime);
      clearTimeout(timerId.current);
      timerId.current = null;
      // console.log('4', timerId, remainTime);
      queryClient.setMutationDefaults('refreshToken', { retry: false });
      return;
    }

    const refreshTime = getRefreshTime(1);
    const delay =
      remainTime >= refreshTime ? remainTime - refreshTime : remainTime;
    // console.log('refresy delay', delay);
    timerId.current = setTimeout(() => refreshToken(), delay * 1000);
    // console.log('2', delay, timerId);
  }, [queryClient, token.expTime, refreshToken, timerId]);

  const changeLang = useCallback((language) => {
    if (language !== 'ko' && language !== 'en') {
      return;
    }
    window.localStorage.setItem('jiseek_lang', language);
    setLang(language);
  }, []);

  return (
    <ModalProvider>
      <LangContext.Provider value={[lang, changeLang]}>
        <AuthContext.Provider value={{ token, updateToken, clearToken }}>
          {children}
        </AuthContext.Provider>
      </LangContext.Provider>
    </ModalProvider>
  );
};

Initialize.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Initialize.defaultProps = {
  children: null,
};

export default Initialize;
