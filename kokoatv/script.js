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
            panelToToggle1: '.absolute.top-5',
            panelToToggle2: '.fixed.top-28',
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
            moviezone: 'KokoaTV',
            movie: 'Kokoa',
            zone: 'TV',
        },
    };

    // --- QUẢN LÝ TRẠNG THÁI ---
    let isDragging = false;
    let hasMoved = false;

    // --- CÁC HÀM THAO TÁC DOM ---

    /**
     * Thay thế văn bản dựa trên cấu hình.
     * Sử dụng document.createTreeWalker để duyệt các text node hiệu quả hơn.
     */
    const replaceTextContent = () => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const text = node.nodeValue.trim().toLowerCase();
            if (CONFIG.textReplacements[text]) {
                node.nodeValue = CONFIG.textReplacements[text];
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
                        node.style.display = 'none';
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
