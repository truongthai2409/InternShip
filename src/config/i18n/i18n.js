import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  CLIENT_EN,
  PROFILE_EN,
  NAVBAR_EN,
  HEADER_FOOTER_EN,
  INFORMATION_EN,
  REGISTER_FROM_EN,
  LOGIN_EN,
  SEARCH_EN,
  USERINFO_EN,
  NOTIFICATION_EN,
  CARDINFORMATION_EN,
  TITLE_EN,
  PAGINATION_EN,
} from 'src/locales/translateEN';
import {
  CLIENT_VI,
  PROFILE_VI,
  NAVBAR_VI,
  HEADER_FOOTER_VI,
  INFORMATION_VI,
  REGISTER_FROM_VI,
  LOGIN_VI,
  SEARCH_VI,
  USERINFO_VI,
  NOTIFICATION_VI,
  CARDINFORMATION_VI,
  TITLE_VI,
  PAGINATION_VI,
} from 'src/locales/translateVI';

const resources = {
  en: {
    client: CLIENT_EN,
    profile: PROFILE_EN,
    navbar: NAVBAR_EN,
    headerFooter: HEADER_FOOTER_EN,
    information: INFORMATION_EN,
    registerFrom: REGISTER_FROM_EN,
    login: LOGIN_EN,
    search: SEARCH_EN,
    userInfo: USERINFO_EN,
    notification: NOTIFICATION_EN,
    cardInformation: CARDINFORMATION_EN,
    title: TITLE_EN,
    pagination: PAGINATION_EN,
  },
  vi: {
    client: CLIENT_VI,
    profile: PROFILE_VI,
    navbar: NAVBAR_VI,
    headerFooter: HEADER_FOOTER_VI,
    information: INFORMATION_VI,
    registerFrom: REGISTER_FROM_VI,
    login: LOGIN_VI,
    search: SEARCH_VI,
    userInfo: USERINFO_VI,
    notification: NOTIFICATION_VI,
    cardInformation: CARDINFORMATION_VI,
    title: TITLE_VI,
    pagination: PAGINATION_VI,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng:
      localStorage.getItem('lang') &&
      (localStorage.getItem('lang') === 'vi' ||
        localStorage.getItem('lang') === 'en')
        ? localStorage.getItem('lang')
        : 'vi',
    lng:
      localStorage.getItem('lang') &&
      (localStorage.getItem('lang') === 'vi' ||
        localStorage.getItem('lang') === 'en')
        ? localStorage.getItem('lang')
        : 'vi',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
