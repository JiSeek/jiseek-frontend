import React from 'react';
import NavigationBar from './NavigationBar';
import { useLangContext } from '../../contexts';
import UtilBarContainer from './UtilBarContainer';

export default () => {
  const [lang] = useLangContext();

  return (
    <NavigationBar lang={lang}>
      <UtilBarContainer />
    </NavigationBar>
  );
};
