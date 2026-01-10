import { useEffect } from "react";
import { loadGoogleTranslate } from "../utils/googleTranslate";

const HiddenTranslate = () => {
  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
};

export default HiddenTranslate;
