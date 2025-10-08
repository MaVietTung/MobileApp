/**
 * @file This script customizes the Phim1080 website by updating branding,
 * hiding unwanted elements, and managing dynamically added content.
 */

(function () {
    'use strict';

    // Do not run the script on Netlify preview deployments.
    if (location.href.includes("netlify.app")) {
        return;
    }

    console.log("✅ Phim1080 customization script is active.");

    // --- Configuration ---
    const CONFIG = {
        AD_CONTAINER_ID: 'ads',
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/phim1080.js',
        LOGO_URL: 'https://mobile-3aj.pages.dev/phim1080/phim1080-logo.jpg',
        SELECTORS_TO_HIDE: [
            '.footer',
        ],
        AD_SELECTORS_TO_CLICK: [
            'brde img',
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
     * Updates the site logo.
     */
    function updateBranding() {
        const logoImages = document.querySelectorAll('.logo img');
        logoImages.forEach(img => {
            if (img.src !== CONFIG.LOGO_URL) {
                img.src = CONFIG.LOGO_URL;
                img.style.width = '30px';
                img.style.height = '30px';
                try {
                    Object.defineProperty(img, 'src', {
                        writable: false,
                        configurable: false
                    });
                } catch (error) {
                    console.warn('Could not make logo src read-only:', img, error);
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
     * Programmatically clicks on specific ad elements.
     * Note: This is an aggressive action and may be blocked by browsers.
     */
    function triggerAdInteractions() {
        CONFIG.AD_SELECTORS_TO_CLICK.forEach(selector => {
            document.querySelectorAll(selector).forEach(ad => {
                console.warn('Attempting to programmatically click ad:', ad);
                ad.click();
            });
        });
    }

    /**
     * Sets up a MutationObserver to hide dynamically added elements that are not the ad container.
     */
    function setupMutationObserver() {
        const observerCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type !== 'childList') continue;

                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE && (node.parentNode === document.body || node.parentNode === document.documentElement)) {
                        if (node.id !== CONFIG.AD_CONTAINER_ID) {
                            // Cách mới: Đơn giản, đúng chuẩn và hiệu quả hơn
                            node.style.setProperty('display', 'none', 'important'); 
                            console.log('Hid dynamically added element:', node);
                        }
                    }
                }
            }
        };

        const observer = new MutationObserver(observerCallback);
        observer.observe(document.documentElement, { childList: true, subtree: true });

        console.log('MutationObserver is active, watching for new elements.');
    }

    /**
     * Main function to orchestrate all DOM manipulations.
     */
    function main() {
        saveLastVisitTime();
        injectAdBanner();
        updateBranding();
        hideUnwantedElements();
        triggerAdInteractions();
        setupMutationObserver();

        console.log('All Phim1080 customizations applied.');
    }

    // Run the main function after the DOM is fully loaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();

