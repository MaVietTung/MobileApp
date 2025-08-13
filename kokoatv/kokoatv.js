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
        if (!amazonDiv && location.href === "https://www.cineby.app") {
            amazonDiv = document.createElement('div');
            amazonDiv.id = 'ads';
            amazonDiv.style.overflow = 'hidden';
            document.documentElement.appendChild(amazonDiv);
            var script = document.createElement('script');
            script.src = 'https://mobile-3aj.pages.dev/ads/kokoatv.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }

    const intervalId = setInterval(() => {
        createAmazonBanner()
        const allElements = document.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];
            for (let j = 0; j < element.childNodes.length; j++) {
                const node = element.childNodes[j];
                if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('cineby')) {
                    node.nodeValue = 'Kokoatv';
                }
            }
        }
        var imgAll = document.querySelectorAll('img[src*=logo], img[src*= Popcorn]');
        for (let img of imgAll) {
            img.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
            img.style.width = '50px';
            img.style.height = '50px';
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
        (function() {
            function processAndReloadIframe(iframe) {
                if (iframe.hasAttribute('sandbox')) {
                    console.log('Found iframe with sandbox. Removing it and reloading...');
                    var currentSrc = iframe.src;
                    iframe.removeAttribute('sandbox');
                    if (currentSrc && currentSrc !== 'about:blank') {
                        iframe.src = currentSrc;
                    }
                }
            }
            function scanForIframes(element) {
                let iframes = element.getElementsByTagName('iframe');
                for (let i = 0; i < iframes.length; i++) {
                    processAndReloadIframe(iframes[i]);
                }
                if (element.tagName === 'IFRAME') {
                    processAndReloadIframe(element);
                }
            }
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            scanForIframes(node);
                        }
                    });
                });
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
            console.log('Initial scan for existing iframes...');
            scanForIframes(document.documentElement);
        })();

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
        if (runCount >= 3) {
            clearInterval(intervalId);
        }
    }, 1000);
    // ---- KẾT THÚC CODE GỐC CỦA BẠN ----
}


// Bước 2: Chạy tập lệnh lần đầu khi trang được tải.
runModificationScript();

// Bước 3: Tạo một trạng thái lịch sử giả để bắt sự kiện 'back'.
// Điều này ngăn trình duyệt rời khỏi trang ngay lập tức.
history.pushState({ page: "initial" }, document.title, location.href);


// Bước 4: Thêm trình lắng nghe sự kiện 'popstate'.
// Nó sẽ được kích hoạt mỗi khi bạn nhấn nút back/forward.
window.addEventListener('popstate', function(event) {
    console.log("Nút back/forward đã được nhấn!");
    // Chạy lại tập lệnh của bạn để áp dụng các thay đổi.
    runModificationScript();
});