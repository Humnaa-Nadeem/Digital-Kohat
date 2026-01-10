import { useEffect } from "react";
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
  { code: "bn", label: "🇧🇩 Bengali" }
];

const LanguageSwitcher = () => {
  const changeLanguage = (lang) => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      localStorage.setItem("lang", lang);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setTimeout(() => changeLanguage(savedLang), 800);
    }
  }, []);

  return (
    <div className="language-switcher">
      <select onChange={(e) => changeLanguage(e.target.value)}>
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
