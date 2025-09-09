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
        SPINNER_ID: 'global-click-spinner',
        SPINNER_DURATION: 1000, // ms
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
     * Injects CSS for a loading spinner into the document's head.
     */
    function injectSpinnerStyles() {
        if (document.getElementById('spinner-styles')) return;
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.innerHTML = `
            .${CONFIG.SPINNER_ID} {
                position: fixed;
                left: 50%;
                top: 50%;
                z-index: 9999;
                width: 50px;
                height: 50px;
                margin: -25px 0 0 -25px; /* Offset by half of width/height */
                border: 8px solid #f3f3f3; /* Light grey */
                border-radius: 50%;
                border-top: 8px solid #3498db; /* Blue */
                animation: spin 1s linear infinite;
                display: none; /* Hidden by default */
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Creates a spinner element and adds a global click listener to show it.
     */
    function setupGlobalSpinner() {
        injectSpinnerStyles();

        const spinner = document.createElement('div');
        spinner.id = CONFIG.SPINNER_ID;
        spinner.className = CONFIG.SPINNER_ID;
        document.body.appendChild(spinner);

        document.addEventListener('click', () => {
            spinner.style.display = 'block';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, CONFIG.SPINNER_DURATION);
        });

        console.log('Global click spinner has been initialized.');
    }

    /**
     * Main function to orchestrate all DOM manipulations.
     */
    function main() {
        // Apply replacements to the initial DOM content.
        replaceTextInElement(document.body);

        // Watch for future DOM changes.
        setupMutationObserver();

        // Set up the global click spinner.
        setupGlobalSpinner();

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
