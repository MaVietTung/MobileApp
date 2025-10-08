/**
 * @fileoverview Script to modify page content, add draggable toggle button, and handle dynamic updates.
 * @version 2.0
 */

// Bọc toàn bộ script trong một IIFE để tránh xung đột biến toàn cục.
(() => {
    'use strict';

    // --- CẤU HÌNH TRUNG TÂM ---
    // Gom tất cả các giá trị "cứng" vào một nơi để dễ dàng quản lý.
    const CONFIG = {
        reloadInterval: 5 * 60 * 1000, // 5 phút
        selectors: {
            mainContainer: '.relative.h-screen',
            panelToToggle1: '.absolute.z-50',
            panelToToggle2: '.fixed.z-50',
        },
        button: {
            id: 'open-close-button',
            className: 'draggable fixed z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-black backdrop-blur-md border border-gray-700 text-white transition-all hover:bg-white/10 hover:border-sky-500 group shadow-lg',
            initialTop: '24px',
            initialRight: '24px',
            iconDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
            iconUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
        },
        textReplacements: {
            "moviezone": 'KokoaTV',
            "movie": 'Kokoa',
            "zone": 'TV',
            "M-ZONE": "KokoaTV",
            "M-": "Kokoa"
        },
    };

    // --- QUẢN LÝ TRẠNG THÁI ---
    let isDragging = false;
    let hasMoved = false;

    // --- CÁC HÀM THAO TÁC DOM ---

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
     * Tạo và quản lý nút bấm có thể kéo thả.
     */
    const initializeDraggableButton = () => {
        const mainContainer = document.querySelector(CONFIG.selectors.mainContainer);
        const panel1 = document.querySelector(CONFIG.selectors.panelToToggle1);
        const panel2 = document.querySelector(CONFIG.selectors.panelToToggle2);

        // Chỉ tạo nút nếu các thành phần cần thiết tồn tại và nút chưa được tạo
        if (!mainContainer || !panel1 || document.getElementById(CONFIG.button.id)) {
            return;
        }

        const button = document.createElement('button');
        button.id = CONFIG.button.id;
        button.className = CONFIG.button.className;
        button.style.top = CONFIG.button.initialTop;
        button.style.right = CONFIG.button.initialRight;
        button.innerHTML = CONFIG.button.iconDown;
        button.setAttribute('aria-label', 'Đóng Panel');
        mainContainer.appendChild(button);

        const togglePanels = () => {
            const isHidden = panel1.style.display === 'none';
            const displayValue = isHidden ? 'block' : 'none';
            panel1.style.display = displayValue;
            if (panel2) panel2.style.display = displayValue;

            button.innerHTML = isHidden ? CONFIG.button.iconDown : CONFIG.button.iconUp;
            button.setAttribute('aria-label', isHidden ? 'Đóng Panel' : 'Mở Panel');
        };

        // Gán các sự kiện kéo thả
        addDragListeners(button);
        button.addEventListener('click', () => {
            if (!hasMoved) {
                togglePanels();
            }
        });
    };

    /**
     * Gán các trình xử lý sự kiện kéo-thả cho một element.
     * @param {HTMLElement} element - Element cần thêm chức năng kéo-thả.
     */
    const addDragListeners = (element) => {
        let offsetX, offsetY;

        const onDragStart = (e) => {
            isDragging = true;
            hasMoved = false;
            element.classList.add('dragging');

            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            const rect = element.getBoundingClientRect();
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;

            window.addEventListener('mousemove', onDragMove);
            window.addEventListener('touchmove', onDragMove, { passive: false });
            window.addEventListener('mouseup', onDragEnd);
            window.addEventListener('touchend', onDragEnd);
        };

        const onDragMove = (e) => {
            if (!isDragging) return;
            hasMoved = true;
            e.preventDefault();

            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            element.style.left = `${clientX - offsetX}px`;
            element.style.top = `${clientY - offsetY}px`;
            element.style.right = 'auto';
        };

        const onDragEnd = () => {
            isDragging = false;
            element.classList.remove('dragging');
            window.removeEventListener('mousemove', onDragMove);
            window.removeEventListener('touchmove', onDragMove);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchend', onDragEnd);
        };

        element.addEventListener('mousedown', onDragStart);
        element.addEventListener('touchstart', onDragStart);
    };

    /**
     * Hàm chính để áp dụng tất cả các sửa đổi lên trang.
     */
    const runModificationScript = () => {
        console.log("🚀 Applying modifications...");
        replaceTextContent();
        initializeDraggableButton();
    };

    // --- LOGIC TẢI LẠI TRANG & QUAN SÁT DOM ---

    /**
     * Kiểm tra điều kiện và tải lại trang nếu cần.
     */
    const checkAndReload = () => {
        const now = Date.now();
        const lastReload = parseInt(localStorage.getItem('lastReloadTime') || '0', 10);
        const lastHref = localStorage.getItem('lastHref') || '';

        localStorage.setItem('lastHref', location.href);

        if (now - lastReload > CONFIG.reloadInterval && location.href !== lastHref) {
            console.log("⏰ Conditions met. Reloading page...");
            localStorage.setItem('lastReloadTime', now.toString());
            location.reload();
        } else {
            runModificationScript();
        }
    };

    /**
     * Xử lý các thay đổi trên DOM.
     * @param {MutationRecord[]} mutationsList
     */
    const handleDomChanges = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;

                    const isRootChild = node.parentNode === document.body || node.parentNode === document.documentElement;
                    const hasRadixAttr = Array.from(node.attributes).some(attr => attr.name.includes('data-radix'));

                    if (isRootChild && !hasRadixAttr) {
                        console.log('Hiding new root element:', node);
                        // Cách mới: Đơn giản, đúng chuẩn và hiệu quả hơn
                        node.style.setProperty('display', 'none', 'important');
                    }
                }
                // Chạy lại logic kiểm tra và sửa đổi sau khi có thay đổi DOM
                // checkAndReload();
                runModificationScript();
            }
        }
    };

    // --- KHỞI TẠO ---

    // Bắt đầu quan sát các thay đổi DOM
    const observer = new MutationObserver(handleDomChanges);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    // Chạy lần đầu khi trang đã sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndReload);
    } else {
        checkAndReload();
    }

    console.log("✅ Script initialized and observing DOM changes.");

})();
