import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  useEffect(() => {
    localStorage.setItem("lang", language);

    // Google Translate trigger
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("lang", language);
    }

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = language;
      select.dispatchEvent(new Event("change"));
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
