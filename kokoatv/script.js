if (!location.href.includes("netlify.app")) {
    // Bước 1: Gói toàn bộ tập lệnh của bạn vào một hàm.
    function runModificationScript() {
        console.log("Đang chạy tập lệnh sửa đổi trang...");

        // ---- BẮT ĐẦU CODE GỐC CỦA BẠN ----
        let runCount = 0;
        function saveCurrentDateToLocalStorage() {
            const now = new Date();
            const formattedDate = now.toISOString();
            localStorage.setItem('lasttime', formattedDate);
        }
        saveCurrentDateToLocalStorage();
        function createAmazonBanner() {
            let amazonDiv = document.querySelector('#ads');
            if (!amazonDiv && location.href === "https://www.cineby.app/") {
                amazonDiv = document.createElement('div');
                amazonDiv.id = 'ads';
                amazonDiv.style.overflow = 'hidden';
                document.body.appendChild(amazonDiv);
                var script = document.createElement('script');
                script.src = 'https://mobile-3aj.pages.dev/ads/kokoatv.js';
                script.async = true;
                document.body.appendChild(script);
            }
            if (location.href === "https://www.cineby.app/") {
                if (amazonDiv) amazonDiv.style.display = 'block';
            } else {
                if (amazonDiv) amazonDiv.style.display = 'none';
            }
        }
        createAmazonBanner();
        const intervalId = setInterval(() => {
            const allElements = document.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i];
                for (let j = 0; j < element.childNodes.length; j++) {
                    const node = element.childNodes[j];
                    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('flic')) {
                        node.nodeValue = 'Kokoatv';
                    }
                }
            }
            var imgAll = document.querySelectorAll('img[src*=logo], img[src*= Project]');
            for (let img of imgAll) {
                img.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
                img.style.width = '50px';
                img.style.height = '50px';
                Object.defineProperty(img, 'src', {
                    writable: false,
                    configurable: false
                });
            }

            // 1. Tìm tất cả các phần tử trên trang
            const allElements2 = document.querySelectorAll('button');

            // 2. Lặp qua từng phần tử
            allElements2.forEach(element => {
                // 3. Kiểm tra xem nội dung văn bản có chứa chữ "Google" hay không (không phân biệt hoa thường)
                if (element.textContent.toLowerCase().includes('google')) {

                    // 4. Nếu có, ẩn phần tử đó đi
                    element.style.display = 'none';
                }
            });

            var text = document.querySelector('#mw-home .mw-body');
            if (text) {
                text.style.display = 'none';
            }
            var text2 = document.querySelector('.mw-sitename');
            if (text2) {
                text2.style.display = 'none';
            }
            var homeButton = document.querySelector('a#logo');
            if (homeButton) {
                homeButton.href = '/home';
            }
            var homeButton2 = document.querySelector('.mw-buttons');
            if (homeButton2) {
                homeButton2.style.display = 'none';
            }
            var buttonHome3 = document.querySelectorAll('.mw-buttons a')
            for (let button of buttonHome3) {
                button.childNodes[0].nodeValue = 'Go to Home ';
            }
            var apkLink = document.querySelector('a[href*=apk]');
            if (apkLink) {
                apkLink.style.display = 'none';
            }
            var comment = document.querySelector('#film_comments');
            if (comment) {
                comment.style.display = 'none';
            }
            var share = document.querySelector('div[class*=sharethis]');
            if (share) {
                share.style.display = 'none';
            }
            var footerAll = document.querySelectorAll('[id*=footer]');
            for (let footer of footerAll) {
                footer.style.display = 'none';
            }
            var footerAll2 = document.querySelectorAll('footer');
            for (let footer of footerAll2) {
                footer.style.display = 'none';
            }
            runCount++;
            if (runCount >= 1) {
                clearInterval(intervalId);
            }
        }, 1000);
        // ---- KẾT THÚC CODE GỐC CỦA BẠN ----
    }


    // Bước 2: Chạy tập lệnh lần đầu khi trang được tải.
    runModificationScript();

    // Bước 3: Tạo một trạng thái lịch sử giả để bắt sự kiện 'back'.
    // Điều này ngăn trình duyệt rời khỏi trang ngay lập tức.
    //history.pushState({ page: "initial" }, document.title, location.href);


    /**
 * Hàm kiểm tra thời gian và tải lại trang nếu cần.
 */
function checkAndReload() {
    alert("test")
    // 1. Định nghĩa hằng số thời gian chờ (RELOAD_INTERVAL)
    // 5 phút * 60 giây/phút * 1000 mili giây/giây
    const RELOAD_INTERVAL = 5 * 60 * 1000; 

    const now = Date.now();
    
    // 2. Sửa tên biến `REOAD_INTERVAL` thành `RELOAD_INTERVAL`
    // Lấy thời điểm tải lại cuối cùng từ localStorage. Nếu không có, mặc định là 0.
    const lastReload = parseInt(localStorage.getItem('lastReloadTime') || '0', 10);

    // So sánh thời gian hiện tại với thời gian tải lại cuối cùng
    if (now - lastReload > RELOAD_INTERVAL) {
        console.log("Đã hơn 5 phút kể từ lần tải lại cuối cùng. Đang tải lại trang...");
        
        // Lưu lại thời điểm sắp tải lại này vào localStorage
        localStorage.setItem('lastReloadTime', now.toString());
        
        // Chạy tập lệnh của bạn (nếu cần) trước khi tải lại
        runModificationScript(); // Bỏ comment nếu bạn có hàm này
        
        // Tải lại trang
        location.reload();
    } else {
        // 3. Sửa tên biến `REOAD_INTERVAL` thành `RELOAD_INTERVAL` trong phép tính
        const timeLeft = Math.round((RELOAD_INTERVAL - (now - lastReload)) / 1000);
        console.log(`Chưa đủ 5 phút. Bỏ qua việc tải lại. Vui lòng chờ ${timeLeft} giây nữa.`);
        
        // Chạy tập lệnh của bạn mà không cần tải lại trang
        runModificationScript(); // Bỏ comment nếu bạn có hàm này
    }
}

// Giả sử bạn có hàm này ở đâu đó trong code
// function runModificationScript() {
//     console.log("Đang chạy tập lệnh sửa đổi...");
// }



    // Lắng nghe sự kiện back/forward của trình duyệt
    window.addEventListener('popstate', checkAndReload);

    // Lắng nghe sự kiện pushstate tùy chỉnh
    window.addEventListener('pushstate', checkAndReload);
    // HÀM PHỤ TRỢ MỚI
    // Kiểm tra xem node có bất kỳ thuộc tính nào chứa "data-radix" không
    const hasRadixAttribute = (node) => {
        // Lặp qua tất cả các thuộc tính của node
        for (const attr of node.attributes) {
            // Nếu tên của thuộc tính chứa chuỗi "data-radix"
            if (attr.name.includes('data-radix')) {
                return true; // Lập tức trả về true và dừng lại
            }
        }
        return false; // Nếu không tìm thấy, trả về false
    };

    // Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    // Chỉ xử lý nếu node là một element (nodeType === 1)
                    if (node.nodeType === 1) {
                        if ((node.parentNode === document.body || node.parentNode === document.documentElement)&&!hasRadixAttribute(node)) {
                            node.click();
                            node.style.display = 'none';
                            Object.defineProperty(node, 'style', {
                                      writable: false,
                                      configurable: false
                            });
                            console.log('Element mới có cha là <body> hoặc <html> đã bị ẩn:', node);
                        }
                        // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
                        // Chạy lại tập lệnh của bạn để áp dụng các thay đổi.
                        runModificationScript();

                    }
                }
            }
        }
    };

    // Tạo một đối tượng observer với hàm callback ở trên
    const observer1 = new MutationObserver(callback);

    // Cấu hình để observer theo dõi (giữ nguyên)
    const config = {
        childList: true, // Theo dõi việc thêm/bớt phần tử con
        subtree: true    // Theo dõi tất cả các phần tử con cháu
    };

    // Bắt đầu theo dõi toàn bộ tài liệu (thẻ <html>) với cấu hình đã chọn
    observer1.observe(document.documentElement, config);

    console.log('Đang theo dõi... Mọi element mới có cha là <body> hoặc <html> sẽ bị ẩn.');
}
