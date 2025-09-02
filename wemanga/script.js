// Chỉ thực thi code nếu không phải trên tên miền của Netlify
if (!location.href.includes("netlify.app")) {
  
  /**
   * Cấu hình trung tâm cho các selector, URL và văn bản cần thay thế.
   * Dễ dàng thay đổi ở một nơi duy nhất.
   */
  const CONFIG = {
    adsContainerId: 'ads',
    adsScriptUrl: 'https://mobile-3aj.pages.dev/ads/wemanga.js',
    logoImageUrl: 'https://mobile-3aj.pages.dev/wemanga/wemanga.png',
    logoImageSize: '50px',
    logoSelector: 'img[src*="logo"], img[alt*="logo"]',
    elementsToHide: ['.welcome-bottom', 'footer', 'a[href="/chapters"]', 'button:has(svg[data-icon="google"])'],
    textReplacements: {
      'comick': 'WeManga',
      'yuki': 'WeManga',
      'movie': 'Kokoa',
      'zone': 'TV',
    },
  };

  /**
   * Thay thế tất cả logo trong một phạm vi (scope) nhất định.
   * @param {Node} scope - Element cha để tìm kiếm logo bên trong (mặc định là toàn bộ document).
   */
  const replaceLogos = (scope = document) => {
    const logoImages = scope.querySelectorAll(CONFIG.logoSelector);
    logoImages.forEach(img => {
      // Chỉ thay đổi nếu logo chưa được cập nhật
      if (img.src !== CONFIG.logoImageUrl) {
        img.src = CONFIG.logoImageUrl;
        img.srcset = CONFIG.logoImageUrl;
        img.style.width = CONFIG.logoImageSize;
        img.style.height = CONFIG.logoImageSize;

        // Ngăn không cho thuộc tính src bị thay đổi bởi script khác
        Object.defineProperty(img, 'src', {
          writable: false,
          configurable: false,
        });
      }
    });
  };

  /**
   * Tìm và thay thế văn bản trong một element và các con của nó.
   * Sử dụng TreeWalker để duyệt các text node hiệu quả hơn.
   * @param {Node} scope - Element cha để bắt đầu tìm kiếm.
   */
  const replaceTextInNode = (scope = document.body) => {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const originalText = node.nodeValue.trim().toLowerCase();
      
      if (!originalText) continue;

      for (const [key, value] of Object.entries(CONFIG.textReplacements)) {
        if (originalText.includes(key)) {
          // Sử dụng RegExp để thay thế không phân biệt chữ hoa/thường
          const regex = new RegExp(key, 'gi');
          node.nodeValue = node.nodeValue.replace(regex, value);
        }
      }
    }
  };

  /**
   * Tiêm banner quảng cáo vào trang nếu các điều kiện thỏa mãn.
   */
  const injectAdBanner = () => {
    const shouldInject = !document.getElementById(CONFIG.adsContainerId) &&
                         !location.href.includes('read') &&
                         !location.href.includes('chapter');

    if (!shouldInject) return;

    const adsContainer = document.createElement('div');
    adsContainer.id = CONFIG.adsContainerId;
    adsContainer.style.overflow = 'hidden';
    document.body.appendChild(adsContainer);

    const script = document.createElement('script');
    script.src = CONFIG.adsScriptUrl;
    script.async = true;
    document.body.appendChild(script);
  };
  
  /**
   * Xử lý các thay đổi trên DOM (khi có element mới được thêm vào).
   * @param {MutationRecord[]} mutationsList - Danh sách các thay đổi.
   */
  const handleDomChanges = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          // Chỉ xử lý các Element, bỏ qua các text node hoặc comment node
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          
          // 1. Ẩn các banner quảng cáo không mong muốn
          const isUnwantedBanner = node.classList.contains('max-w-5xl') && node.id !== CONFIG.adsContainerId;
          const isRootChild = node.parentNode === document.body || node.parentNode === document.documentElement;
          if (isUnwantedBanner && isRootChild) {
            node.style.display = 'none';
          }
          
          // 2. Áp dụng thay thế logo và văn bản cho các element mới
          replaceLogos(node);
          replaceTextInNode(node);
          
          // 3. Ẩn các element cụ thể mới xuất hiện
          CONFIG.elementsToHide.forEach(selector => {
            // Kiểm tra chính node đó hoặc các con của nó
            if (node.matches(selector)) {
              node.style.display = 'none';
            }
            node.querySelectorAll(selector).forEach(el => el.style.display = 'none');
          });
        }
      }
    }
  };
  
  /**
   * Hàm khởi tạo chính, chạy tất cả các tác vụ ban đầu và cài đặt MutationObserver.
   */
  const initialize = () => {
    // Tác vụ chạy ngay khi tải trang
    //injectAdBanner();
    replaceLogos();
    replaceTextInNode();
    CONFIG.elementsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    });

    // Theo dõi các thay đổi trên DOM để xử lý các nội dung được tải động
    const observer = new MutationObserver(handleDomChanges);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    console.log('WeManga Script Initialized and Observing DOM changes.');
  };

  // Chạy hàm khởi tạo
  initialize();
}