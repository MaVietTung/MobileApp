/**
 * @file This script customizes the Livesport website by updating branding,
 * hiding unwanted elements, and injecting ads. It's designed to handle
 * Single Page Application (SPA) navigation efficiently.
 */

(function () {
    'use strict';

    // Do not run the script on Netlify preview deployments.
    if (location.href.includes("netlify.app")) {
        return;
    }

    console.log("✅ Livesport customization script is active.");

    // --- Configuration ---
    const CONFIG = {
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/livesport.js',
        AD_CONTAINER_ID: 'ads',
        LOGO_URL: 'https://mobile-3aj.pages.dev/livesport/livesport-icon.png',
        SELECTORS_TO_HIDE: [
            '#mw-home .mw-body',
            '.mw-sitename',
            '.mw-buttons',
            'a[href*=apk]',
            '#film_comments',
            'div[class*=sharethis]',
            '[id*=footer]',
            'footer',
            'a[href*="https://strmd.link"]',
            'div[role*=alert]',
            '.header__logo'
        ],
        IMAGE_SELECTORS_TO_UPDATE: [
            'img[src*=logo]',
            'img[src*=" Popcorn"]' // The space is intentional
        ],
        TEXT_REPLACEMENTS: {
            'soccerway': 'Livesport',
        },
        LINK_UPDATES: [{
            selector: 'a#logo',
            newHref: '/home'
        }],
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
     * Saves the current date and time to localStorage.
     */
    function saveLastVisitTime() {
        try {
            localStorage.setItem('lasttime', new Date().toISOString());
        } catch (error) {
            console.error('Failed to save last visit time to localStorage:', error);
        }
    }

    /**
     * Traverses the DOM and replaces occurrences of specified text in text nodes.
     */
    function replaceTextInAllNodes(searchText, replacementText) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const searchRegex = new RegExp(searchText, 'gi');
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            const parent = currentNode.parentElement;
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                continue;
            }
            if (currentNode.nodeValue.toLowerCase().includes(searchText.toLowerCase())) {
                currentNode.nodeValue = currentNode.nodeValue.replace(searchRegex, replacementText);
            }
        }
    }

    /**
     * Updates branding images to a new source URL.
     */
    function updateBrandingImages() {
        const imageSelectors = CONFIG.IMAGE_SELECTORS_TO_UPDATE.join(', ');
        const images = document.querySelectorAll(imageSelectors);
        images.forEach(img => {
            if (img.src !== CONFIG.LOGO_URL) {
                img.src = CONFIG.LOGO_URL;
                img.style.width = '50px';
                img.style.height = '50px';
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
            document.querySelectorAll(selector).forEach(el => {
                el.style.display = 'none';
            });
        });
    }

    /**
     * Updates href attributes of specified anchor tags.
     */
    function updateLinks() {
        CONFIG.LINK_UPDATES.forEach(rule => {
            const link = document.querySelector(rule.selector);
            if (link) {
                link.href = rule.newHref;
            }
        });
    }

    /**
     * A single function to apply all visual and functional changes.
     */
    function runCustomizations() {
        console.log("Applying customizations for Livesport...");
        saveLastVisitTime();
        injectAdBanner();
        updateBrandingImages();
        hideUnwantedElements();
        updateLinks();

        for (const [searchText, replacementText] of Object.entries(CONFIG.TEXT_REPLACEMENTS)) {
            replaceTextInAllNodes(searchText, replacementText);
        }
    }

    /**
     * Sets up a MutationObserver that re-applies customizations after DOM changes
     * have settled. This is an efficient way to handle SPA navigation.
     */
    function setupSPAManager() {
        let debounceTimer;

        const debouncedRun = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(runCustomizations, 250); // Wait 250ms for DOM to settle
        };

        const observer = new MutationObserver(debouncedRun);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        console.log('SPA Manager (MutationObserver) is active.');
    }

    /**
     * Main entry point.
     */
    function main() {
        runCustomizations();
        setupSPAManager();
        console.log('Initial customizations applied. Watching for page changes.');
    }

    // Run the main function after the DOM is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();

