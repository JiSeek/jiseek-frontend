import React, { useCallback } from 'react';
import { useAuthContext, useLangContext } from '../../contexts';
import UtilBar from './UtilBar';

const UtilBarContainer = () => {
  const [, setLang] = useLangContext();
  const { token } = useAuthContext();
  const onLangChange = useCallback((e) => setLang(e.target.value), [setLang]);

  return <UtilBar token={token.access} onLangChange={onLangChange} />;
};

export default UtilBarContainer;
