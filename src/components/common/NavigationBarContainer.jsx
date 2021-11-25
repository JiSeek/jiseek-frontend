import React from 'react';
import NavigationBar from './NavigationBar';
import { useLangContext } from '../../contexts';

export default () => {
  const [lang] = useLangContext();

  return <NavigationBar lang={lang} />;
};
