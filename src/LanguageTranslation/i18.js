import i18n from 'i18next';
// plugin that connect i18next with react
import { initReactI18next } from 'react-i18next';

// translation files
import en from './Local/en.json';
import ar from './Local/ar.json';
import de from './Local/de.json';

const lang = localStorage.getItem("lang")
i18n.use(initReactI18next).init({


  // all translation data
  // can you increaser number of languages as needed
  // here there are three language
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    de: { translation: de },
  },
  // Default language
  lng: lang?lang:'en', 

  // Fallback language
  // means: if the selected language is missing or key dosn't exist in the current language
  //it will back this language 
  fallbackLng: lang?lang:'en', 
  interpolation: {
    escapeValue: false, // React already escapes by default
  },

  // show loader if language is loading or not
  react: {
    useSuspense: false, // Disable suspense if you're using it
  },
});

export default i18n;
