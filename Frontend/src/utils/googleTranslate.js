// googleTranslate.js
// Google Translate for React (ONE reload, then stable)

let initialized = false;

/**
 * Load Google Translate once
 */
export const loadGoogleTranslate = () => {
  if (window.google && window.google.translate && initialized) {
    return Promise.resolve();
  }

  if (window.__googleTranslateLoadPromise) {
    return window.__googleTranslateLoadPromise;
  }

  window.__googleTranslateLoadPromise = new Promise((resolve) => {
    window.googleTranslateElementInit = () => {
      setTimeout(() => {
        try {
          if (!window.google || !window.google.translate) {
            resolve();
            return;
          }

          if (!initialized) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                autoDisplay: false,
              },
              "google_translate_element"
            );

            initialized = true;
          }

          resolve();
        } catch {
          resolve();
        }
      }, 700);
    };

    if (document.querySelector('script[src*="translate_a/element.js"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.onerror = () => resolve();

    document.head.appendChild(script);
  });

  return window.__googleTranslateLoadPromise;
};

/**
 * Change language (reload ONCE)
 */
export const triggerTranslation = async (languageCode) => {
  const current = localStorage.getItem("selectedLang");

  // ⛔ No need to reload if same language
  if (current === languageCode) return;

  localStorage.setItem("selectedLang", languageCode);

  // Set cookie for Google Translate
  document.cookie = `googtrans=/en/${languageCode}; path=/`;
  document.cookie = `googtrans=/en/${languageCode}; domain=${window.location.hostname}; path=/`;

  // ✅ REQUIRED reload (ONE time per change)
  window.location.reload();
};

/**
 * Restore language on load (NO reload here)
 */
export const restoreTranslation = async () => {
  const savedLang = localStorage.getItem("selectedLang");
  if (!savedLang || savedLang === "en") return;

  document.cookie = `googtrans=/en/${savedLang}; path=/`;
  document.cookie = `googtrans=/en/${savedLang}; domain=${window.location.hostname}; path=/`;
};
