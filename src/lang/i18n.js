import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EN_FOOD_SEARCH, KO_FOOD_SEARCH } from './FoodSearch';
import { EN_FOOTER, KO_FOOTER } from './Footer';
import { EN_SIGN_IN, KO_SIGN_IN } from './SignIn';
import { KO_NAVIGATION_BAR, EN_NAVIGATION_BAR } from './NavigationBar';
import { EN_PASSWORD_CHANGE, KO_PASSWORD_CHANGE } from './PasswordChange';
import { EN_SIGN_UP, KO_SIGN_UP } from './SignUp';
import { EN_MY_PAGE, KO_MY_PAGE } from './MyPage';

const resources = {
  ko: {
    translation: {
      ...KO_NAVIGATION_BAR,
      ...KO_SIGN_UP,
      ...KO_FOOTER,
      ...KO_FOOD_SEARCH,
      ...KO_PASSWORD_CHANGE,
      ...KO_SIGN_IN,
      ...KO_MY_PAGE,
    },
  },
  en: {
    translation: {
      ...EN_NAVIGATION_BAR,
      ...EN_SIGN_UP,
      ...EN_FOOTER,
      ...EN_FOOD_SEARCH,
      ...EN_PASSWORD_CHANGE,
      ...EN_SIGN_IN,
      ...EN_MY_PAGE,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  // debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false, // 기본적으로 문자열을 escape하지 않음.
  },
});

export default i18n;
