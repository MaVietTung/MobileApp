(function() {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
      AD_CONTAINER_ID: 'ads',
      SWIPER_CSS_URL: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      SWIPER_JS_URL: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      STORE_JS_URL: 'https://mobile-3aj.pages.dev/ads/store.js',
      ITEMS_TO_SHOW: 5,
  };

  /**
   * Loads a CSS stylesheet dynamically, preventing duplicates.
   * @param {string} href The URL of the stylesheet.
   */
  const loadCss = (href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
  };

  /**
   * Loads a JavaScript file dynamically.
   * @param {string} src The URL of the script.
   * @returns {Promise<void>} A promise that resolves when the script is loaded.
   */
  const loadScript = (src) => {
      return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
      });
  };

  /**
   * Shuffles an array using the Fisher-Yates algorithm and returns a slice.
   * @param {Array<any>} arr The array to shuffle.
   * @param {number} count The number of items to return.
   * @returns {Array<any>} A new array with the shuffled and sliced items.
   */
  const shuffleAndPick = (arr, count) => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, count);
  };

  /**
   * Renders the Swiper carousel with product data.
   * @param {Array<{linkimg: string, linkproduct: string}>} products The product data.
   */
  const renderSwiper = (products) => {
      const container = document.getElementById(CONFIG.AD_CONTAINER_ID);
      if (!container) {
          console.error(`Ad container #${CONFIG.AD_CONTAINER_ID} not found.`);
          return;
      }

      container.innerHTML = ''; // Clear container before rendering

      const swiperEl = document.createElement('div');
      swiperEl.className = 'swiper';
      swiperEl.style.cssText = 'width:auto; margin:40px auto; position:relative';

      const wrapper = document.createElement('div');
      wrapper.className = 'swiper-wrapper';

      products.forEach(({ linkimg, linkproduct }) => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.style.position = 'relative';

          slide.innerHTML = `
            <a href="${linkproduct}" target="_blank" rel="noopener noreferrer">
              <img src="${linkimg}" style="width:100%; border-radius:10px;" alt="Ad Banner" />
            </a>
            <button class="copy-btn" data-link="${linkproduct}"
              style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; border: none; border-radius: 8px; background: white; color: black; font-weight: bold; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
              🔗 Link
            </button>`;
          wrapper.appendChild(slide);
      });

      swiperEl.appendChild(wrapper);

      ['swiper-pagination', 'swiper-button-prev', 'swiper-button-next'].forEach(cls => {
          const div = document.createElement('div');
          div.className = cls;
          swiperEl.appendChild(div);
      });

      container.appendChild(swiperEl);

      new Swiper(swiperEl, {
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      });

      // Use event delegation for better performance.
      container.addEventListener('click', (e) => {
          const copyButton = e.target.closest('.copy-btn');
          if (copyButton) {
              navigator.clipboard.writeText(copyButton.dataset.link).then(() => {
                  copyButton.innerText = "✅ Copied!";
                  setTimeout(() => (copyButton.innerText = "🔗 Link"), 1500);
              }).catch(err => console.error('Failed to copy link:', err));
          }
      });
  };

  /**
   * Main function to initialize the ad carousel.
   */
  const main = async () => {
      try {
          await loadScript(CONFIG.STORE_JS_URL);
          if (typeof stores === 'undefined' || !Array.isArray(stores)) {
              throw new Error("'stores' variable not found or is not an array.");
          }
          await loadScript(CONFIG.SWIPER_JS_URL);

          const products = shuffleAndPick(stores, CONFIG.ITEMS_TO_SHOW);
          renderSwiper(products);
      } catch (error) {
          console.error('Error initializing ad carousel:', error);
      }
  };

  // --- Start Execution ---
  loadCss(CONFIG.SWIPER_CSS_URL);
  main();

})();

