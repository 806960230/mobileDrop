// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_ch from './languages/ch.json';

import translation_en from './languages/en.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translation_en,
      },
      ch: {
        translation: translation_ch,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });
export default i18n;
