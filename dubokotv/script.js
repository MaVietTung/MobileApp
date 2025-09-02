/**
 * @file This script customizes the DubokoTV website by updating branding,
 * hiding unwanted elements, and injecting an ad banner.
 */

(function () {
    'use strict';

    // Do not run the script on development/preview domains.
    if (location.href.includes("pages.dev")) {
        return;
    }

    console.log("✅ DubokoTV customization script is active.");

    // --- Configuration ---
    const CONFIG = {
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/dubokotv.js',
        AD_CONTAINER_ID: 'ads',
        IMAGE_UPDATES: [
            { selector: 'img.img-responsive.visible-xs', newSrc: 'https://mobile-3aj.pages.dev/dubokotv/small-icon.png' },
            { selector: 'img.img-responsive.hidden-xs', newSrc: 'https://mobile-3aj.pages.dev/dubokotv/big-icon.png' },
            { selector: '.head img', newSrc: 'https://mobile-3aj.pages.dev/dubokotv/small-icon.png' }
        ],
        SELECTORS_TO_HIDE: [
            '.adsbygoogle',
            'div.col-pd.text-center', // License info
            'a.btn.btn-danger',       // Rate button
        ],
        TEXT_REPLACEMENTS: {
            'duboku': 'DubokoTV',
        },
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
     * Updates branding elements: logos and text content.
     */
    function updateBranding() {
        // Update images
        CONFIG.IMAGE_UPDATES.forEach(rule => {
            const img = document.querySelector(rule.selector);
            if (img && img.src !== rule.newSrc) {
                img.src = rule.newSrc;
            }
        });

        // Replace text content
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            for (const [searchText, replacementText] of Object.entries(CONFIG.TEXT_REPLACEMENTS)) {
                if (currentNode.nodeValue.toLowerCase().includes(searchText)) {
                    // This regex approach is safer as it only replaces the matching part.
                    const regex = new RegExp(searchText, 'gi');
                    currentNode.nodeValue = currentNode.nodeValue.replace(regex, replacementText);
                }
            }
        }
    }

    /**
     * Main function to orchestrate all DOM manipulations.
     */
    function main() {
        saveLastVisitTime();
        injectAdBanner();
        hideUnwantedElements();
        updateBranding();

        console.log('All DubokoTV customizations applied.');
    }

    // Run the main function after the DOM is fully loaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();

