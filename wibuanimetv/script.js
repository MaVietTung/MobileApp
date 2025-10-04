/**
 * @file This script applies various customizations to the webpage, such as updating branding,
 * hiding unwanted elements, and injecting ads. It is designed to run only on specific domains.
 * @version 2.0 - Refactored for performance and correctness.
 */

(function () {
    'use strict';

    // Không chạy script trên các trang preview của Vercel.
    if (location.href.includes("vercel.app")) {
        return;
    }

    console.log("✅ Customization script v2.0 is active.");

    // --- Cấu hình trung tâm ---
    const CONFIG = {
        AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/wibuanimetv.js',
        LOGO_URL: 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv-icon.png',
        // Danh sách các bộ chọn CSS cho các phần tử cần ẩn.
        SELECTORS_TO_HIDE: [
            '#ggButn',
            '.mw-body',
            '.intro-app',
            '[id*=footer]',
            'footer',
        ],
        // Các cặp từ khóa tìm kiếm và thay thế (không phân biệt hoa thường).
        TEXT_REPLACEMENTS: {
            'aniwatch': 'Wibuanimetv',
            '9anime': 'WibuanimeTv',
            '9anime.to': 'WibuanimeTv',
            '9 anime': 'WibuanimeTv'
        },
        // Các quy tắc thay thế văn bản chính xác cho các phần tử cụ thể.
        EXACT_TEXT_REPLACEMENTS: [{
            selector: 'span',
            from: 'All Manga',
            to: 'JPAVTV'
        }],
        // [SỬA LỖI] Danh sách các bộ chọn cho các phần tử được phép thêm vào body.
        // Bất kỳ phần tử nào được thêm vào gốc của trang mà không khớp với các bộ chọn này sẽ bị ẩn.
        ALLOWED_BODY_CHILDREN: [
            '#ads', // Container quảng cáo mà script này tự tạo
            'script', // Cho phép các thẻ script
            'iframe[name*="google_ads"]', // Cho phép iframe quảng cáo của Google
            'div[id*="modal"]', // Ví dụ: Cho phép các modal
            '.notifications-container' // Ví dụ: Cho phép khu vực thông báo
        ]
    };

    /**
     * Tiêm một script quảng cáo vào trang.
     * Tạo một div với id 'ads' nếu nó chưa tồn tại.
     */
    function createAdBanner() {
        if (document.getElementById('ads')) {
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
     * Lưu thời gian truy cập hiện tại vào localStorage.
     */
    function saveLastVisitTime() {
        try {
            localStorage.setItem('lasttime', new Date().toISOString());
        } catch (error) {
            console.error('Lỗi khi lưu thời gian truy cập vào localStorage:', error);
        }
    }

    /**
     * [TỐI ƯU HÓA] Duyệt cây DOM một lần và thực hiện tất cả các thay thế văn bản.
     */
    function performTextReplacements() {
        const replacements = Object.entries(CONFIG.TEXT_REPLACEMENTS);
        if (replacements.length === 0) return;

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let currentNode;
        while ((currentNode = walker.nextNode())) {
            let originalValue = currentNode.nodeValue;
            let newValue = originalValue;

            for (const [searchText, replacementText] of replacements) {
                // Sử dụng regex để thay thế không phân biệt hoa thường
                const searchRegex = new RegExp(searchText, 'gi');
                newValue = newValue.replace(searchRegex, replacementText);
            }

            if (originalValue !== newValue) {
                currentNode.nodeValue = newValue;
            }
        }
    }

    /**
     * Thay thế văn bản chính xác trong các phần tử khớp với bộ chọn.
     */
    function performExactTextReplacements() {
        CONFIG.EXACT_TEXT_REPLACEMENTS.forEach(({ selector, from, to }) => {
            document.querySelectorAll(selector).forEach(el => {
                if (el.textContent.trim() === from) {
                    el.textContent = to;
                }
            });
        });
    }

    /**
     * Cập nhật logo, avatar và cố gắng ngăn các script khác thay đổi lại.
     */
    function updateBrandingImages() {
        document.querySelectorAll('img[src*="logo"], img[src*="avatar"]').forEach(img => {
            if (img.src !== CONFIG.LOGO_URL) {
                img.src = CONFIG.LOGO_URL;
                // Cố gắng khóa thuộc tính 'src' để tránh bị ghi đè.
                try {
                    Object.defineProperty(img, 'src', {
                        writable: false,
                        configurable: false
                    });
                } catch (error) {
                    console.warn('Không thể khóa thuộc tính src của ảnh:', img, error);
                }
            }
        });
    }

    /**
     * Ẩn các phần tử không mong muốn dựa trên danh sách bộ chọn.
     */
    function hideUnwantedElements() {
        try {
            const elementsToHide = document.querySelectorAll(CONFIG.SELECTORS_TO_HIDE.join(', '));
            elementsToHide.forEach(el => {
                el.style.display = 'none';
            });
        } catch (error) {
            console.error("Lỗi khi ẩn phần tử. Vui lòng kiểm tra lại các bộ chọn CSS:", error);
        }
    }

    /**
     * [SỬA LỖI] Kiểm tra xem một phần tử có được phép là con trực tiếp của body/html hay không.
     * @param {Element} element - Phần tử cần kiểm tra.
     * @returns {boolean} - Trả về true nếu phần tử được phép.
     */
    function isAllowedBodyChild(element) {
        // Sử dụng `some` để dừng ngay khi tìm thấy một bộ chọn khớp.
        return CONFIG.ALLOWED_BODY_CHILDREN.some(selector => {
            try {
                return element.matches(selector);
            } catch (e) {
                console.warn(`Bộ chọn không hợp lệ trong ALLOWED_BODY_CHILDREN: "${selector}"`);
                return false;
            }
        });
    }

    /**
     * Thiết lập MutationObserver để ẩn các phần tử được thêm vào DOM sau này.
     */
    function setupMutationObserver() {
        const observerCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type !== 'childList') continue;

                for (const node of mutation.addedNodes) {
                    // Chỉ xử lý các node là Element và là con trực tiếp của body hoặc html
                    if (node.nodeType === Node.ELEMENT_NODE && (node.parentElement === document.body || node.parentElement === document.documentElement)) {
                        if (!isAllowedBodyChild(node)) {
                            node.style.display = 'none';
                            console.log('Đã ẩn phần tử được thêm tự động:', node);
                        }
                    }
                }
            }
        };

        const observer = new MutationObserver(observerCallback);
        // Theo dõi cả body và html để bắt tất cả các phần tử được thêm vào gốc
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true // Cần subtree để theo dõi các node được thêm vào body
        });
    }

    /**
     * Hàm chính điều phối tất cả các tác vụ.
     */
    function main() {
        saveLastVisitTime();
        createAdBanner();
        
        // Thực hiện các thay đổi DOM
        updateBrandingImages();
        hideUnwantedElements();
        performTextReplacements(); // Tối ưu hóa
        performExactTextReplacements();

        // Thiết lập observer để theo dõi các thay đổi trong tương lai
        setupMutationObserver();

        console.log('Tất cả các tùy chỉnh đã được áp dụng.');
    }

    // Chạy hàm main sau khi DOM đã tải xong hoặc chạy ngay lập tức nếu đã tải xong.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();