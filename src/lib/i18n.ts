import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationFR from './locales/fr/translation.json';
import translationAR from './locales/ar/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['translation'], // Add all namespaces
    defaultNS: 'translation',

    resources: {
      fr: {
        translation: translationFR
      },
      ar: {
        translation: translationAR
      }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;