import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { CLIENT_EN } from 'src/locales/translateEN';
import { CLIENT_VI } from 'src/locales/translateVI';

const resources = {
    en: {
        client: CLIENT_EN,
    },
    vi: {
        client: CLIENT_VI,
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: localStorage.getItem('lang') && (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === 'vi') ? localStorage.getItem('lang') : 'en',
        lng: localStorage.getItem('lang') && (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === 'vi') ? localStorage.getItem('lang') : 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;