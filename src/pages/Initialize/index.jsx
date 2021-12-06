import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useQueryClient } from 'react-query';
import {
  AuthContext,
  LangContext,
  useAuth,
  ModalProvider,
} from '../../contexts';

const Initialize = ({ children }) => {
  // const queryClient = useQueryClient();
  const { token, updateToken, clearToken } = useAuth();
  const [lang, setLang] = useState('ko');

  // App 초기 구동 시 초기화 루틴
  useEffect(() => {
    const authCfg = window.localStorage.getItem('jiseek_auth');
    if (authCfg) {
      const auth = JSON.parse(authCfg);
      const expired =
        auth.expires_at - parseInt(new Date().getTime() / 1000, 10) <= 0;
      if (!expired) {
        // console.log('1', expired, auth.expires_at);
        updateToken(auth);
      } else {
        // console.log('2', expired, auth.expires_at);
        clearToken();
      }
    }
    const langCfg = window.localStorage.getItem('jiseek_lang');
    setLang(langCfg || 'ko');
  }, [updateToken, clearToken, setLang]);

  const changeLang = useCallback((language) => {
    if (language !== 'ko' && language !== 'en') {
      return;
    }
    window.localStorage.setItem('jiseek_lang', language);
    setLang(language);
  }, []);

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

// useEffect(() => {
//   const remainTime =
//     token.expTime - parseInt(new Date().getTime() / 1000, 10);
//   console.log(remainTime);
//   if (remainTime <= 0) {
//     console.log('3', timerId, remainTime);
//     clearTimeout(timerId.current);
//     timerId.current = null;
//     // console.log('4', timerId, remainTime);
//     // queryClient.setMutationDefaults('refreshToken', { retry: false });
//     return;
//   }

//   clearTimeout(timerId.current);
//   const refreshTime = getRefreshTime(1);
//   const delay = remainTime >= refreshTime ? remainTime - refreshTime : 10;
//   console.log('refresy delay', delay);
//   timerId.current = setTimeout(() => refreshToken(), delay * 1000);
//   // console.log('2', delay, timerId);
// }, [token.expTime, refreshToken]);
