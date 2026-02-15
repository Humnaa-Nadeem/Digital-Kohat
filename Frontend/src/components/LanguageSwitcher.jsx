import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./LanguageSwitcher.css";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "ur", label: "🇵🇰 Urdu" },
  { code: "ar", label: "🇸🇦 Arabic" },
  { code: "fr", label: "🇫🇷 French" },
  { code: "de", label: "🇩🇪 German" },
  { code: "es", label: "🇪🇸 Spanish" },
  { code: "zh-CN", label: "🇨🇳 Chinese" },
  { code: "tr", label: "🇹🇷 Turkish" },
  { code: "hi", label: "🇮🇳 Hindi" },
  { code: "bn", label: "🇧🇩 Bengali" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  };

  return (
    <div className="language-switcher notranslate">
      <select value={language} onChange={handleLanguageChange}>
        <option value="">🌐 Language</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
