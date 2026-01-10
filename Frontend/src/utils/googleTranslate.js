export const loadGoogleTranslate = () => {
  // Prevent loading script multiple times
  if (window.google && window.google.translate) return;

  // Google callback
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      "google_translate_element"
    );
  };

  // Create script only once
  const script = document.createElement("script");
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.defer = true;

  document.body.appendChild(script);
};
