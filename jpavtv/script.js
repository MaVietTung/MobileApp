(function () {
  'use strict';

  console.log("✅ Jpavtv customization script is active.");

  // --- Configuration ---
  // Centralize all settings for easy management and updates.
  const CONFIG = {
      TEXT_REPLACEMENTS: {
          'cinezo': 'Jpavtv',
      },
      // The ID of any element that should NOT be hidden by the MutationObserver.
      ALLOWED_IDS: ['ads'],
  };

  /**
   * Recursively replaces text within an element and its children based on CONFIG.
   * This version uses a regex to replace only the matching text, not the entire node content.
   * @param {Element} element The DOM element to process.
   */
  function replaceTextInElement(element) {
      // Guard against non-element nodes
      if (!element || typeof element.childNodes === 'undefined') {
          return;
      }

      element.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
              let nodeValue = node.nodeValue;
              let hasChanged = false;

              for (const [searchText, replacementText] of Object.entries(CONFIG.TEXT_REPLACEMENTS)) {
                  // Use a global, case-insensitive regex for robust replacement.
                  const regex = new RegExp(searchText, 'gi');
                  if (regex.test(nodeValue)) {
                      nodeValue = nodeValue.replace(regex, replacementText);
                      hasChanged = true;
                  }
              }

              if (hasChanged) {
                  node.nodeValue = nodeValue;
              }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Recurse into child elements.
              replaceTextInElement(node);
          }
      });
  }

  /**
   * Sets up a MutationObserver to handle dynamically added elements.
   * It will apply text replacements and hide unwanted new elements.
   */
  function setupMutationObserver() {
      const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
              if (mutation.type === 'childList') {
                  mutation.addedNodes.forEach(node => {
                      // Only process element nodes.
                      if (node.nodeType === Node.ELEMENT_NODE) {
                          // 1. Apply text replacements to the new content.
                          replaceTextInElement(node);

                          // 2. Hide new elements added directly to the <body>,
                          // unless they are explicitly allowed. This is a safer approach.
                          if (node.parentNode === document.body && !CONFIG.ALLOWED_IDS.includes(node.id)) {
                              node.style.display = 'none';
                              console.log('Hid dynamically added body child:', node);
                          }
                      }
                  });
              }
          }
      });

      // Start observing the body and its entire subtree for changes.
      observer.observe(document.body, { childList: true, subtree: true });
      console.log('MutationObserver is active, watching for new elements.');
  }

  /**
   * Main function to orchestrate all DOM manipulations.
   */
  function main() {
      // Apply replacements to the initial DOM content.
      replaceTextInElement(document.body);

      // Watch for future DOM changes.
      setupMutationObserver();

      console.log('All Jpavtv customizations have been applied.');
  }

  // --- Execution ---
  // Ensure the script runs only after the DOM is ready.
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', main);
  } else {
      // DOM is already ready.
      main();
  }

})();

