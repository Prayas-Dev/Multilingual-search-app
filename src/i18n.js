import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(HttpApi) // Load translations via HTTP (from /public/locales)
  .use(LanguageDetector) // Detect language from browser/localStorage
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    supportedLngs: ['en', 'hi', 'mr', 'gu'],
    fallbackLng: 'en',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage'],
    },

    backend: {
      // ✅ Vite serves /public as root
      loadPath: '/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
