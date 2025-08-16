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
            if (!amazonDiv) {
                amazonDiv = document.createElement('div');
                amazonDiv.id = 'ads';
                amazonDiv.style.overflow = 'hidden';
                document.body.appendChild(amazonDiv);
                var script = document.createElement('script');
                script.src = 'https://mobile-3aj.pages.dev/ads/livesport.js';
                script.async = true;
                document.body.appendChild(script);
            }
        }
        createAmazonBanner();
        const intervalId = setInterval(() => {
            const allElements = document.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i];
                for (let j = 0; j < element.childNodes.length; j++) {
                    const node = element.childNodes[j];
                    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('streamed')) {
                        node.nodeValue = 'Livesport';
                    }
                }
            }
            var imgAll = document.querySelectorAll('img[src*=logo], img[src*= Popcorn]');
            for (let img of imgAll) {
                img.src = 'https://mobile-3aj.pages.dev/livesport/livesport-icon.png';
                img.style.width = '50px';
                img.style.height = '50px';
                Object.defineProperty(img, 'src', {
                    writable: false,
                    configurable: false
                });
            }
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
            var strmlink = document.querySelectorAll('a[href*=strmd')
            if (strmlink) strmlink.style.display = 'none';

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


    // Bước 4: Thêm trình lắng nghe sự kiện 'popstate'.
    // Nó sẽ được kích hoạt mỗi khi bạn nhấn nút back/forward.
    window.addEventListener('popstate', function (event) {
        console.log("Nút back/forward đã được nhấn!");
        // Chạy lại tập lệnh của bạn để áp dụng các thay đổi.
        runModificationScript();
    });

    window.addEventListener('pushstate', function (event) {
        console.log("Nút back/forward đã được nhấn!");
        // Chạy lại tập lệnh của bạn để áp dụng các thay đổi.
        runModificationScript();
    });

    // Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    // Chỉ xử lý nếu node là một element (nodeType === 1)
                    if (node.nodeType === 1) {

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
