/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/moviejoytv/moviejoytv.js';
 document.head.appendChild(script);
 */
let runCount = 0;
function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
saveCurrentDateToLocalStorage();
function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#ads');
    if (!amazonDiv) {
        amazonDiv = document.createElement('div');
        amazonDiv.id = 'ads';
        amazonDiv.style.overflow = 'hidden';
        document.body.appendChild(amazonDiv);
        // Tạo script và load JS từ URL
        var script = document.createElement('script');
        script.src = 'https://mobile-3aj.pages.dev/ads/moviesjoytv.js';
        script.async = true;
        document.body.appendChild(script);
    }
  }
const intervalId = setInterval(() => {
let reloaded = false;
let startY = 0;
let isPulling = false;
let pullThreshold = 60;
let pullStartTime = null;
let holdTime = 500; // 1 giây giữ ở đầu trang
createAmazonBanner()
// Tạo spinner
const spinner = document.createElement('div');
spinner.style.position = 'fixed';
spinner.style.left = '45%';
spinner.style.top = '20%';
spinner.style.transform = 'translate(-50%, -50%)';
spinner.style.width = '40px';
spinner.style.height = '40px';
spinner.style.border = '4px solid #ccc';
spinner.style.borderTop = '4px solid #3498db';
spinner.style.borderRadius = '50%';
spinner.style.animation = 'spin 1s linear infinite';
spinner.style.zIndex = '9999';
spinner.style.display = 'none';
document.body.appendChild(spinner);

// Keyframes animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Bắt đầu chạm
window.addEventListener('touchstart', (e) => {
  if (window.scrollY === 0 && !reloaded) {
    startY = e.touches[0].clientY;
    isPulling = true;
    pullStartTime = Date.now();
  }
});

// Di chuyển ngón tay
window.addEventListener('touchmove', (e) => {
  if (!isPulling || reloaded) return;

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - startY;

  if (deltaY > pullThreshold) {
    spinner.style.display = 'block';

    const heldEnough = Date.now() - pullStartTime >= holdTime;
    if (heldEnough) {
      reloaded = true;
      setTimeout(() => {
        location.reload();
      }, 300);
    }
  }
});

// Thả tay ra
window.addEventListener('touchend', () => {
  isPulling = false;
  pullStartTime = null;
  spinner.style.display = 'none';
});

 
    var imgAll = document.querySelectorAll('img[src*=xxrz]');
    for (let img of imgAll) {
        img.src = 'https://mobile-3aj.pages.dev/moviejoytv/moviejoytv-icon.png';
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

    /*var ads = document.querySelectorAll('iframe');
    for (let ad of ads) {
        try {
            if (!document.querySelector('#iframe-embed')) {
                var spans = ad.contentWindow.document.querySelectorAll('span');
                for (let span of spans) {
                    span.click();
                }
            }
        } catch (e) { }
    }*/

    var apkLink = document.querySelector('a[href*=apk]');
    if (apkLink) {
        apkLink.style.display = 'none';
    }

    /*var shareCloseButton = document.querySelector('#modalshare .modal-header button');
    if (shareCloseButton) {
        shareCloseButton.click();
    }*/

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

    /*var con = document.querySelector('#main-wrapper');
    if (con && !con.querySelector('.donate-banner')) {
        const ig = document.createElement('img');
        ig.src = 'https://mobile-3aj.pages.dev/moviejoytv/donate-moviejoytv.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        ig.className = 'donate-banner';

        con.appendChild(ig);
    }*/

    runCount++;
    if (runCount >= 3) {
        clearInterval(intervalId);
    }
}, 1000);


// Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          // Chỉ xử lý nếu node là một element (nodeType === 1)
          if (node.nodeType === 1) {
            
            // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
            // Chỉ ẩn element nếu cha trực tiếp của nó là <body> hoặc <html>
            if (node.id !== "ads" &&(node.parentNode === document.body || node.parentNode === document.documentElement)) {
              node.style.display = 'none';
              console.log('Element mới có cha là <body> hoặc <html> đã bị ẩn:', node);
            }
            
          }
        }
      }
    }
  };
  
  // Tạo một đối tượng observer với hàm callback ở trên
  const observer = new MutationObserver(callback);
  
  // Cấu hình để observer theo dõi (giữ nguyên)
  const config = {
    childList: true, // Theo dõi việc thêm/bớt phần tử con
    subtree: true    // Theo dõi tất cả các phần tử con cháu
  };
  
  // Bắt đầu theo dõi toàn bộ tài liệu (thẻ <html>) với cấu hình đã chọn
  observer.observe(document.documentElement, config);
  
  console.log('Đang theo dõi... Mọi element mới có cha là <body> hoặc <html> sẽ bị ẩn.');