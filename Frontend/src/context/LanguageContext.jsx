import { createContext, useContext, useEffect, useState } from "react";
import { triggerTranslation, loadGoogleTranslate } from "../utils/googleTranslate";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    localStorage.setItem("lang", language);

    // Set HTML lang attribute
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("lang", language);
    }
    // Ensure Google Translate script is loaded and then trigger
    (async () => {
      await loadGoogleTranslate();
      // small delay to allow widget to render
      setTimeout(() => {
        // trigger translation for selected language; for 'en' attempt to reset
        triggerTranslation(language === "en" ? "en" : language);
      }, 300);
    })();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
