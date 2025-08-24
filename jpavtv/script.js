// // Chỉ chạy script nếu trang không phải là trang xem trước của Netlify.
// if (!location.href.includes("netlify.app")) {

//     /**
//      * Đối tượng cấu hình tập trung.
//      * Dễ dàng thay đổi các giá trị tại một nơi duy nhất.
//      */
//     const CONFIG = {
//         AD_SCRIPT_URL: 'https://mobile-3aj.pages.dev/ads/jpavtv.js',
//         REPLACEMENT_LOGO_URL: 'https://mobile-3aj.pages.dev/jpavtv/jpavtv-logo.jpg',
//         RELOAD_INTERVAL_MS: 5 * 60 * 1000, // 5 phút
//         SELECTORS_TO_HIDE: [
//             '#mw-home .mw-body',
//             '.mw-sitename',
//             '.mw-buttons',
//             'a[href*=apk]',
//             '#film_comments',
//             'div[class*=sharethis]',
//             '[id*=footer]',
//             'footer'
//         ],
//     };

//     /**
//      * Hàm tiện ích để ẩn các phần tử dựa trên một mảng các CSS selector.
//      * @param {string[]} selectors - Mảng các CSS selector.
//      */
//     const hideElementsBySelectors = (selectors) => {
//         const elementsToHide = document.querySelectorAll(selectors.join(', '));
//         elementsToHide.forEach(el => el.style.display = 'none');
//     };

//     /**
//      * Cập nhật 'lasttime' trong localStorage với ngày giờ hiện tại.
//      */
//     const saveCurrentTimestamp = () => {
//         localStorage.setItem('lasttime', new Date().toISOString());
//     };

//     /**
//      * Quản lý việc tạo và hiển thị banner quảng cáo.
//      */
//     const manageAdBanner = () => {
//         const isHomePage = location.href === "https://movieko.vercel.app/";
//         let adContainer = document.querySelector('#ads');

//         if (isHomePage) {
//             if (!adContainer) {
//                 adContainer = document.createElement('div');
//                 adContainer.id = 'ads';
//                 adContainer.style.overflow = 'hidden';
//                 document.body.appendChild(adContainer);

//                 const script = document.createElement('script');
//                 script.src = CONFIG.AD_SCRIPT_URL;
//                 script.async = true;
//                 //document.body.appendChild(script);
//             }
//             adContainer.style.display = 'block';
//         } else if (adContainer) {
//             adContainer.style.display = 'none';
//         }
//     };

//     /**
//      * Tìm và thay thế nội dung văn bản trong toàn bộ trang.
//      */
//     const replaceTextContent = () => {
//         const allElements = document.getElementsByTagName('*');
//         for (const element of allElements) {
//             for (const node of element.childNodes) {
//                 // Chỉ xử lý các text node (nodeType === 3)
//                 if (node.nodeType === 3 && node.nodeValue.toLowerCase().includes('flic')) {
//                     node.nodeValue = node.nodeValue.replace(/flic/gi, 'JpavTV');
//                 }
//             }
//         }
//     };

//     /**
//      * Cập nhật logo và các hình ảnh liên quan.
//      */
//     const updateLogos = () => {
//         const images = document.querySelectorAll('img[src*=logo], img[src*=Project]');
//         images.forEach(img => {
//             img.src = CONFIG.REPLACEMENT_LOGO_URL;
//             img.style.width = '50px';
//             img.style.height = '50px';
//             // Ngăn chặn việc thay đổi src của ảnh sau này
//             Object.defineProperty(img, 'src', { writable: false, configurable: false });
//         });
//     };

//     /**
//      * Ẩn các phần tử cụ thể không thể chọn bằng selector đơn giản.
//      */
//     const hideSpecialElements = () => {
//         // Ẩn các nút có chứa chữ 'Google'
//         document.querySelectorAll('button').forEach(button => {
//             if (button.textContent.toLowerCase().includes('google')) {
//                 button.style.display = 'none';
//             }
//         });
//     };
    
//     /**
//      * Sửa đổi các liên kết trên trang.
//      */
//     const modifyLinks = () => {
//         const logoLink = document.querySelector('a#logo');
//         if (logoLink) {
//             logoLink.href = '/home';
//         }
//     };

//     /**
//      * Logic kiểm tra và tải lại trang nếu URL thay đổi và đã hết thời gian.
//      */
//     const checkAndReloadPage = () => {
//         const now = Date.now();
//         const lastReload = parseInt(localStorage.getItem('lastReloadTime') || '0', 10);
//         const lastHref = localStorage.getItem('lastHref') || '';
//         const currentHref = location.href;

//         localStorage.setItem('lastHref', currentHref); // Cập nhật href mỗi lần kiểm tra

//         const isTimeExpired = (now - lastReload) > CONFIG.RELOAD_INTERVAL_MS;
//         const hasHrefChanged = currentHref !== lastHref;

//         if (isTimeExpired && hasHrefChanged) {
//             console.log("URL đã thay đổi và hết thời gian chờ. Đang tải lại trang...");
//             localStorage.setItem('lastReloadTime', now.toString());
//             location.reload();
//         } else {
//             // Chạy lại các hàm sửa đổi DOM khi có điều hướng mà không tải lại trang
//             runModificationScript();
//         }
//     };

//     /**
//      * Thiết lập MutationObserver để theo dõi các thay đổi của DOM.
//      * Ẩn các popup hoặc phần tử không mong muốn được thêm vào sau.
//      */
//     const setupMutationObserver = () => {
//         const hasRadixAttribute = (node) => {
//             for (const attr of node.attributes) {
//                 if (attr.name.includes('data-radix')) return true;
//             }
//             return false;
//         };

//         const callback = (mutationsList) => {
//             for (const mutation of mutationsList) {
//                 if (mutation.type === 'childList') {
//                     for (const node of mutation.addedNodes) {
//                         if (node.nodeType === 1) { // Chỉ xử lý Element nodes
//                             // Ẩn các element lạ được thêm vào body/html
//                             if ((node.parentNode === document.body || node.parentNode === document.documentElement) && !hasRadixAttribute(node)) {
//                                 node.style.display = 'none';
//                                 console.log('Đã ẩn element mới được thêm vào body/html:', node);
//                             }
//                             // Khi có sự thay đổi lớn trong DOM, kiểm tra lại logic tải lại trang.
//                             checkAndReloadPage();
//                         }
//                     }
//                 }
//             }
//         };

//         const observer = new MutationObserver(callback);
//         observer.observe(document.documentElement, { childList: true, subtree: true });
//         console.log('MutationObserver đang theo dõi các thay đổi của DOM...');
//     };

//     /**
//      * Hàm chính để chạy tất cả các tác vụ sửa đổi DOM.
//      */
//     function runModificationScript() {
//         console.log("Đang chạy tập lệnh sửa đổi trang...");
        
//         saveCurrentTimestamp();
//         manageAdBanner();
//         replaceTextContent();
//         updateLogos();
//         hideElementsBySelectors(CONFIG.SELECTORS_TO_HIDE);
//         hideSpecialElements();
//         modifyLinks();
//     }
    
//     // === ĐIỂM BẮT ĐẦU THỰC THI ===
//     runModificationScript();
//     setupMutationObserver();

// }