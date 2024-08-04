import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import welcome_en from "./en/welcome.json";
import books_en from "./en/books.json";
import exchange_en from "./en/exchange.json";
import miscellaneous_en from "./en/miscellaneous.json";

import welcome_pl from "./pl/welcome.json";
import books_pl from "./pl/books.json";
import exchange_pl from "./pl/exchange.json";
import miscellaneous_pl from "./pl/miscellaneous.json";

i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources: {
    en: {
      translation: {...welcome_en, ...books_en, ...exchange_en, ...miscellaneous_en},
    },
    pl: {
      translation: {...welcome_pl, ...books_pl, ...exchange_pl, ...miscellaneous_pl},
    },
  },
  fallbackLng: "pl",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
