/**
 * @file This script customizes the ThaiAnTV website by updating branding,
 * hiding unwanted elements like ads and footers, and injecting a new ad banner.
 */

(function () {
    'use strict';

    // Do not run the script on development/preview domains.
    if (location.href.includes("pages.dev")) {
        return;
    }

    console.log("✅ ThaiAnTV customization script is active.");

    // --- Configuration ---
    const CONFIG = {
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/thaiantv.js',
        LOGO_URL: 'https://mobile-3aj.pages.dev/thaiantv/thaiantv-icon.jpg',
        SELECTORS_TO_HIDE: [
            '#footer',
            '[class*=rIdV]', // Specific ad class
            'iframe[title*=fb]', // Facebook comment iframes
            '.watch-link',
            '[id*=banner]',
            '[class *= html]'
        ],
        textReplacements: {
            "123-hd.com": 'ThaianTV',
        },
    };

    /**
     * Injects an ad banner script into the page.
     * It creates a div with id 'ads' if it doesn't exist.
     */
    function injectAdBanner() {
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
     * Updates the site logo to a new source URL and makes it read-only.
     */
    function updateBranding() {
        // Update the logo if it's an <img> tag
        const logoImage = document.querySelector('.logo img');
        if (logoImage && logoImage.src !== CONFIG.LOGO_URL) {
            logoImage.src = CONFIG.LOGO_URL;
            logoImage.style.height = '70px';
            // Attempt to prevent other scripts from changing the logo back
            try {
                Object.defineProperty(logoImage, 'src', {
                    writable: false,
                    configurable: false
                });
            } catch (error) {
                console.warn('Could not make logo src read-only:', error);
            }
        }

        // Update the logo if it's a background image on an element like .site-title
        const logoContainer = document.querySelector('.site-title');
        if (logoContainer) {
            // Set the background image, ensuring the URL is quoted
            logoContainer.style.backgroundImage = `url('${CONFIG.LOGO_URL}')`;
        }
    }

    /**
     * Hides elements by injecting a style tag into the document head.
     * This is more performant than iterating and setting style on each element.
     */
    function hideUnwantedElements() {
        if (CONFIG.SELECTORS_TO_HIDE.length === 0) {
            return;
        }
        const style = document.createElement('style');
        // Use !important to ensure our styles take precedence
        const cssRule = `${CONFIG.SELECTORS_TO_HIDE.join(', ')} { display: none !important; }`;
        style.textContent = cssRule;
        document.head.appendChild(style);
    }

    /**
     * Replaces text content throughout the document body based on the configuration.
     * It uses the efficient TreeWalker API to iterate over text nodes and
     * regular expressions for flexible, case-insensitive matching.
     */
    const replaceTextContent = () => {
        // Helper function to escape special characters for use in a regular expression.
        const escapeRegExp = (string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                // Skip nodes inside <script> and <style> tags
                const parentName = node.parentElement.nodeName.toLowerCase();
                if (parentName === 'script' || parentName === 'style') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const replacements = Object.entries(CONFIG.textReplacements);
        if (replacements.length === 0) {
            return;
        }

        // Create an array of [RegExp, replacementString] pairs for efficiency
        const regexReplacements = replacements.map(([find, replaceWith]) => {
            return [new RegExp(escapeRegExp(find), 'gi'), replaceWith];
        });

        while (walker.nextNode()) {
            const node = walker.currentNode;
            let value = node.nodeValue;
            let hasChanged = false;

            for (const [regex, replaceWith] of regexReplacements) {
                if (regex.test(value)) {
                    // Reset lastIndex for global regexes before using replace
                    regex.lastIndex = 0;
                    value = value.replace(regex, replaceWith);
                    hasChanged = true;
                }
            }

            if (hasChanged) {
                node.nodeValue = value;
            }
        }
    };

    /**
     * Main function to orchestrate all the DOM manipulations.
     */
    function main() {
        saveLastVisitTime();
        injectAdBanner();
        updateBranding();
        hideUnwantedElements();
        replaceTextContent();

        console.log('All ThaiAnTV customizations applied.');
    }

    // Run the main function after the DOM is fully loaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();
