import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SessionContext = createContext(null);

export const useSessionContext = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext) {
    throw new Error('Use SessionContext inside Provider.');
  }
  return sessionContext;
};

export const SessionProvider = ({ children }) => {
  const [token, changeToken] = useState(null);

  useEffect(() => {
    const config = window.localStorage.getItem('jiseek_token');
    if (config) {
      changeToken(config);
    }
  }, []);

  const setToken = (current) => {
    changeToken(current);
    window.localStorage.setItem('jiseek_token', current);
  };

  const clearToken = () => {
    changeToken(null);
    window.localStorage.removeItem('jiseek_token');
  };

  return (
    <SessionContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

SessionProvider.defaultProps = {
  children: null,
};

export default SessionContext;
