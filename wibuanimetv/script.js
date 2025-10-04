/**
 * @file This script applies various customizations to the webpage, such as updating branding,
 * hiding unwanted elements, and injecting ads. It is designed to run only on specific domains.
 */

(function () {
    'use strict';

    // Do not run the script on Vercel preview deployments.
    if (location.href.includes("vercel.app")) {
        return;
    }

    console.log("✅ Customization script is active.");

    // --- Configuration ---
    const CONFIG = {
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/wibuanimetv.js',
        LOGO_URL: 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv-icon.png',
        SELECTORS_TO_HIDE: [
            '#ggButn',
            '.mw-body',
            '.intro-app',
            '[id*=footer]',
            'footer',
        ],
        TEXT_REPLACEMENTS: {
            'aniwatch': 'Wibuanimetv',
            '9anime':'WibuanimeTv'
        },
        EXACT_TEXT_REPLACEMENTS: [{
            selector: 'span',
            from: 'All Manga',
            to: 'JPAVTV'
        }]
    };

    /**
     * Injects an ad banner script into the page.
     * It creates a div with id 'ads' if it doesn't exist.
     */
    function createAdBanner() {
        if (document.querySelector('#ads')) {
            return;
        }

        const adContainer = document.createElement('div');
        adContainer.id = 'ads';
        adContainer.style.overflow = 'hidden';
        document.body.appendChild(adContainer);

        const script = document.createElement('script');
        script.src = CONFIG.AD_SCRIPT_URL;
        script.async = true;
        document.body.appendChild(script);
    }

    /**
     * Saves the current date and time to localStorage under the key 'lasttime'.
     */
    function saveLastVisitTime() {
        try {
            const now = new Date().toISOString();
            localStorage.setItem('lasttime', now);
        } catch (error) {
            console.error('Failed to save last visit time to localStorage:', error);
        }
    }

    /**
     * Traverses the DOM and replaces occurrences of specified text in text nodes.
     * @param {string} searchText - The text to search for (case-insensitive).
     * @param {string} replacementText - The text to replace with.
     */
    function replaceTextInAllNodes(searchText, replacementText) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const searchRegex = new RegExp(searchText, 'gi');

        let currentNode;
        while ((currentNode = walker.nextNode())) {
            if (currentNode.nodeValue.toLowerCase().includes(searchText.toLowerCase())) {
                currentNode.nodeValue = currentNode.nodeValue.replace(searchRegex, replacementText);
            }
        }
    }

    /**
     * Replaces the text content of elements that match a specific selector and text.
     * @param {string} selector - The CSS selector for the elements.
     * @param {string} fromText - The exact text content to match (trimmed).
     * @param {string} toText - The new text content.
     */
    function replaceExactTextInElements(selector, fromText, toText) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.textContent.trim() === fromText) {
                el.textContent = toText;
            }
        });
    }

    /**
     * Updates logo and avatar images to a new source URL and makes them read-only.
     */
    function updateBrandingImages() {
        const images = document.querySelectorAll('img[src*=logo], img[src*=avatar]');
        images.forEach(img => {
            if (img.src !== CONFIG.LOGO_URL) {
                img.src = CONFIG.LOGO_URL;
                try {
                    Object.defineProperty(img, 'src', {
                        writable: false,
                        configurable: false
                    });
                } catch (error) {
                    console.warn('Could not make image src read-only:', img, error);
                }
            }
        });
    }

    /**
     * Hides elements matching a list of CSS selectors.
     */
    function hideUnwantedElements() {
        CONFIG.SELECTORS_TO_HIDE.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
            });
        });
    }

    /**
     * Main function to orchestrate all the DOM manipulations.
     */
    function main() {
        saveLastVisitTime();
        createAdBanner();
        updateBrandingImages();
        hideUnwantedElements();

        for (const [searchText, replacementText] of Object.entries(CONFIG.TEXT_REPLACEMENTS)) {
            replaceTextInAllNodes(searchText, replacementText);
        }

        CONFIG.EXACT_TEXT_REPLACEMENTS.forEach(rule => {
            replaceExactTextInElements(rule.selector, rule.from, rule.to);
        });

        console.log('All customizations applied.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();

