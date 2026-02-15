import { useEffect } from "react";
import { loadGoogleTranslate } from "../utils/googleTranslate";
import { useLanguage } from "../context/LanguageContext";

const HiddenTranslate = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Load Google Translate script on component mount
    try {
      loadGoogleTranslate();
    } catch (err) {
      // swallow to avoid app crash from third-party script
      console.warn("Failed to load Google Translate:", err);
    }
  }, []); // Only load once on mount

  // keep element off-screen instead of using display:none because
  // Google Translate widget may not initialize inside display:none
  return (
    <div
      id="google_translate_element"
      style={{ position: "absolute", left: "-9999px", top: "0", width: "1px", height: "1px", overflow: "hidden" }}
    />
  );
};

export default HiddenTranslate;
