// Load Google Translate script and return a Promise that resolves when the
// TranslateElement and language combo are available. This prevents races and
// allows reliable programmatic triggering.
export const loadGoogleTranslate = () => {
  // If already initialized, return resolved promise
  if (window.google && window.google.translate) return Promise.resolve();

  // If a loader is already in progress, return the same promise
  if (window.__googleTranslateLoadPromise) return window.__googleTranslateLoadPromise;

  window.__googleTranslateLoadPromise = new Promise((resolve, reject) => {
    // Provide callback for the Google script
    window.googleTranslateElementInit = () => {
      try {
        if (!window.google || !window.google.translate) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );

        // Give the widget a moment to render the combo
        const start = Date.now();
        const checkCombo = () => {
          const combo = document.querySelector(".goog-te-combo");
          if (combo) return resolve();
          if (Date.now() - start > 8000) return resolve(); // resolve even if combo not found to avoid blocking
          setTimeout(checkCombo, 200);
        };
        checkCombo();
      } catch (err) {
        // Resolve regardless to avoid blocking app functionality
        resolve();
      }
    };

    // Avoid adding the script multiple times
    if (document.querySelector('script[src*="translate_a/element.js"]')) {
      // Script exists but callback may not have run; wait a short while
      setTimeout(() => resolve(), 600);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      // Resolve to allow app to continue even if external script fails
      resolve();
    };

    document.head.appendChild(script);
  });

  return window.__googleTranslateLoadPromise;
};

// Programmatically trigger translation to `languageCode`.
// This function waits for the Google widget to be ready and polls for the
// language combo before dispatching the change event. It retries for a while
// to account for slow network or render timing.
export const triggerTranslation = async (languageCode) => {
  await loadGoogleTranslate();

  return new Promise((resolve) => {
    const start = Date.now();
    const trySet = () => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        try {
          combo.value = languageCode;
          combo.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (err) {
          // Some browsers may restrict; still resolve
          console.warn("Failed to programmatically change goog-te-combo:", err);
        }
        return resolve(true);
      }

      // If translate widget injects an iframe menu (older implementations),
      // it may still work via combo; otherwise, keep retrying for up to 8s
      if (Date.now() - start > 8000) {
        // Give up gracefully
        console.warn("goog-te-combo not found after waiting");
        return resolve(false);
      }

      setTimeout(trySet, 200);
    };

    trySet();
  });
};
