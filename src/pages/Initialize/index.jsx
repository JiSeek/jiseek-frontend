import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { AuthContext, LangContext, initialTkn, useAuth } from '../../contexts';
import { setWorker, storeAuth } from '../../utils';

const getRefreshTime = (hour) => hour * 60 * 60;

const Initialize = ({ children }) => {
  const queryClient = useQueryClient();
  const { token, updateToken, refreshToken, clearToken } = useAuth();
  const [lang, setLang] = useState('ko');

  // App 초기 구동 시 초기화 루틴
  useEffect(() => {
    const authCfg = window.localStorage.getItem('jiseek_auth');
    if (authCfg) {
      const auth = JSON.parse(authCfg);
      const expired = auth.expires_at - new Date().getTime() <= 0;
      if (!expired) {
        updateToken(auth);
      } else {
        storeAuth(initialTkn);
      }
    }
    const langCfg = window.localStorage.getItem('jiseek_lang');
    if (langCfg) {
      setLang(langCfg);
    }
  }, [updateToken, setLang]);

  // 토큰 리프레쉬 루틴 -> TODO: 동작안함, 수정필요
  useEffect(() => {
    const remainTime = token.expTime - new Date().getTime();
    if (remainTime <= 0) {
      setWorker(false);
      queryClient.setMutationDefaults('refreshToken', { retry: false });
      return;
    }

    const refreshTime = getRefreshTime(1);
    const delay =
      remainTime >= refreshTime ? remainTime - refreshTime : remainTime;
    setWorker(true, refreshToken, delay);
    console.log('2', delay);
  }, [queryClient, token.expTime, refreshToken]);

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
        {children}
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
