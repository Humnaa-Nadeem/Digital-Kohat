import { useEffect } from "react";
import { loadGoogleTranslate, restoreTranslation } from "../utils/googleTranslate";

const HiddenTranslate = () => {
  useEffect(() => {
    loadGoogleTranslate();
    restoreTranslation(); // ✅ APPLY language on first load
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    />
  );
};

export default HiddenTranslate;
