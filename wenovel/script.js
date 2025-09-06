'a*
 * @file This script customizes a novel reading website by updating branding,
 * hiding unwanted elements, injecting ads, and cleaning up the DOM structure.
 * It is designed to not run on development/preview domains.
 */

(function () {
  'use strict';

  // Do not run the script on development domains.
  if (location.href.includes("pages.dev")) {
      return;
  }

  console.log("✅ WeNovel customization script is active.");

  // --- Configuration ---
  const CONFIG = {
      AD_CONTAINER_ID: 'ads',
      AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/wenovel.js',
      LOGO_URL: 'https://mobile-3aj.pages.dev/wenovel/wenovel.png',
      MAIN_WRAPPER_ID: 'wrapper',
      TEXT_REPLACEMENTS: {
          'Novel Bin': 'WeNovel',
      },
      SELECTORS_TO_HIDE: [
          'footer',
          'a[href*="google"]', // Google Play store links
          'a[href*="facebook"]',          // Facebook auth links
          '[data-unit]',                      // Ad units
      ],
  };

  /**
   * Injects an ad banner script into the page.
   */
  function injectAdBanner() {
      if (document.getElementById(CONFIG.AD_CONTAINER_ID)) {
          return;
      }

      const adContainer = document.createElement('div');
      adContainer.id = CONFIG.AD_CONTAINER_ID;
      adContainer.style.overflow = 'hidden';
      document.body.appendChild(adContainer);

      const script = document.createElement('script');
      script.src = CONFIG.AD_SCRIPT_URL;
      script.async = true;
      document.body.appendChild(script);
  }

  /**
   * Updates branding elements: logos and text.
   */
  function updateBranding() {
      // Update logo images
      const logoImages = document.querySelectorAll('img[src*=logo]');
      logoImages.forEach(img => {
          if (img.src !== CONFIG.LOGO_URL) {
              img.src = CONFIG.LOGO_URL;
              try {
                  Object.defineProperty(img, 'src', { writable: false, configurable: false });
              } catch (error) {
                  console.warn('Could not make image src read-only:', img, error);
              }
          }
      });

      // Replace text content across the site
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let currentNode;
      while ((currentNode = walker.nextNode())) {
          for (const [searchText, replacementText] of Object.entries(CONFIG.TEXT_REPLACEMENTS)) {
              if (currentNode.nodeValue.includes(searchText)) {
                  const regex = new RegExp(searchText, 'g');
                  currentNode.nodeValue = currentNode.nodeValue.replace(regex, replacementText);
              }
          }
      }
  }

  /**
   * Hides elements matching a list of CSS selectors.
   */
  function hideUnwantedElements() {
      CONFIG.SELECTORS_TO_HIDE.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => {
              el.style.display = 'none';
          });
      });
  }

  /**
   * Cleans up the DOM by hiding all direct children of the body except for the
   * main content wrapper and the ad container.
   */
  function isolateMainContent() {
      const allowedIds = [CONFIG.MAIN_WRAPPER_ID, CONFIG.AD_CONTAINER_ID];
      const bodyChildren = Array.from(document.body.children);

      bodyChildren.forEach(element => {
          if (!allowedIds.includes(element.id)) {
              element.style.display = 'none';
          }
      });

      // Ensure the main wrapper is visible
      const wrapperElement = document.getElementById(CONFIG.MAIN_WRAPPER_ID);
      if (wrapperElement) {
          wrapperElement.style.display = 'block'; // Or 'flex', 'grid', etc.
      }
  }

  /**
   * Sets up a MutationObserver to watch for dynamically added elements
   * and hide them if they are not the ad container.
   */
  function setupMutationObserver() {
      const observerCallback = (mutationsList) => {
          for (const mutation of mutationsList) {
              if (mutation.type !== 'childList') continue;

              for (const node of mutation.addedNodes) {
                  // Only process element nodes that are direct children of the body
                  if (node.nodeType === Node.ELEMENT_NODE && node.parentNode === document.body) {
                      // Hide any new element added to the body unless it's our ad container
                      if (node.id !== CONFIG.AD_CONTAINER_ID) {
                          node.style.display = 'none';
                          console.log('Hid dynamically added element:', node);
                      }
                  }
              }
          }
      };

      const observer = new MutationObserver(observerCallback);
      observer.observe(document.body, { childList: true });

      console.log('MutationObserver is active, watching for new elements in <body>.');
  }

  /**
   * Main function to orchestrate all DOM manipulations.
   */
  function main() {
      injectAdBanner();
      updateBranding();
      hideUnwantedElements();
      isolateMainContent();
      setupMutationObserver();

      console.log('All WeNovel customizations have been applied.');
  }

  // Run the main function after the DOM is fully loaded.
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', main);
  } else {
      main();
  }

})();

