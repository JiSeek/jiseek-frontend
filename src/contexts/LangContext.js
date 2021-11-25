import { createContext, useContext } from 'react';

const LangContext = createContext();

export const useLangContext = () => {
  const langContext = useContext(LangContext);
  if (!langContext) {
    throw new Error('Use LangContext inside Provider.');
  }
  return langContext;
};

export default LangContext;
