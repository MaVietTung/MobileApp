/**
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

    console.log("✅ WeNovel customization script is starting...");

    // --- Configuration ---
    const CONFIG = {
        AD_CONTAINER_ID: 'ads',
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/wenovel.js',
        LOGO_URL: 'https://mobile-3aj.pages.dev/wenovel/wenovel.png',

        // Selectors for top-level elements to KEEP.
        // Other direct children of <body> will be hidden.
        ALLOWED_BODY_CHILDREN_SELECTORS: [
            'header',
            'main',
            '#ads', // Our ad container
            '#wrapper',
            '.login-container',
            '.signup-container',
        ],

        TEXT_REPLACEMENTS: {
            'Read Novel Full': 'WeNovel',
        },

        // Selectors for elements to hide ANYWHERE on the page.
        // Using a stylesheet is more performant than manual DOM manipulation.
        SELECTORS_TO_HIDE: [
            'footer',
            'a[href*="google"]', // Google Play store links
            'a[href*="facebook"]', // Facebook auth links
            '[data-unit]', // Ad units
        ],
    };

    /**
     * Checks if a given element should be visible as a direct child of the <body>.
     * @param {Element} element The element to check.
     * @returns {boolean} True if the element is allowed, false otherwise.
     */
    function isAllowedBodyChild(element) {
        // Don't hide scripts or styles
        if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE' || element.tagName === 'LINK') {
            return true;
        }
        // Check against the list of allowed selectors
        return CONFIG.ALLOWED_BODY_CHILDREN_SELECTORS.some(selector => element.matches(selector));
    }

    /**
     * Injects an ad banner script into the page.
     */
    function injectAdBanner() {
        if (document.getElementById(CONFIG.AD_CONTAINER_ID)) {
            return; // Already injected
        }

        const adContainer = document.createElement('div');
        adContainer.id = CONFIG.AD_CONTAINER_ID;
        adContainer.style.overflow = 'hidden';
        document.body.appendChild(adContainer);

        const script = document.createElement('script');
        script.src = CONFIG.AD_SCRIPT_URL;
        script.async = true;
        document.head.appendChild(script); // Append to head is preferred
    }

    /**
     * Updates branding elements: logos and text.
     */
    function updateBranding() {
        // Update logo images
        document.querySelectorAll('img[src*=logo]').forEach(img => {
            if (img.src === CONFIG.LOGO_URL) return;

            img.style.width = "50px";
            img.style.height = "50px";
            img.src = CONFIG.LOGO_URL;

            // Attempt to make the src attribute read-only to prevent other scripts from changing it back.
            try {
                Object.defineProperty(img, 'src', { writable: false, configurable: false });
            } catch (error) {
                console.warn('Could not make image src read-only:', img, error);
            }
        });

        // Replace text content across the site
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const replacements = Object.entries(CONFIG.TEXT_REPLACEMENTS);
        let currentNode;

        while ((currentNode = walker.nextNode())) {
            for (const [searchText, replacementText] of replacements) {
                if (currentNode.nodeValue.includes(searchText)) {
                    currentNode.nodeValue = currentNode.nodeValue.replace(new RegExp(searchText, 'g'), replacementText);
                }
            }
        }
    }

    /**
     * Hides unwanted elements by injecting a stylesheet into the document head.
     * This is more performant than querying and styling each element individually.
     */
    function hideUnwantedElements() {
        if (!CONFIG.SELECTORS_TO_HIDE.length) return;

        const styleId = 'wenovel-hide-styles';
        if (document.getElementById(styleId)) return; // Already injected

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          ${CONFIG.SELECTORS_TO_HIDE.join(',\n')} {
              display: none !important;
          }
      `;
        document.head.appendChild(style);
    }

    /**
     * Cleans up the DOM by hiding all direct children of <body> that are not on the allow list.
     */
    function isolateMainContent() {
        Array.from(document.body.children).forEach(element => {
            if (!isAllowedBodyChild(element)) {
                element.style.display = 'none';
                console.log('Hid unwanted top-level element:', element);
            }
        });
    }

    /**
     * Sets up a MutationObserver to watch for dynamically added elements to the <body>
     * and hide them if they are not on the allow list.
     */
    function setupMutationObserver() {
        const observerCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type !== 'childList') continue;

                for (const node of mutation.addedNodes) {
                    // Only process element nodes that are direct children of the body
                    if (node.nodeType === Node.ELEMENT_NODE && node.parentNode === document.body) {
                        if (!isAllowedBodyChild(node)) {
                            // Cách mới: Đơn giản, đúng chuẩn và hiệu quả hơn
                            node.style.setProperty('display', 'none', 'important');
                            console.log('Hid dynamically added top-level element:', node);
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
        // The order of operations is important.
        // 1. Inject ads first so our cleanup logic knows about the ad container.
        injectAdBanner();
        // 2. Inject styles to hide unwanted elements globally.
        hideUnwantedElements();
        // 3. Update branding text and logos.
        updateBranding();
        // 4. Hide unwanted top-level elements that are present on load.
        isolateMainContent();
        // 5. Set up an observer to hide unwanted top-level elements added dynamically.
        setupMutationObserver();

        console.log('All WeNovel customizations have been applied.');
    }

    // Run the main function when the DOM is interactive or complete.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();
