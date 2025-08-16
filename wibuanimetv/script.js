
/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv.js';
 document.head.appendChild(script);
 */
 if (!location.href.includes("netlify.app")) {
    let count = 0;
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
            script.src = 'https://mobile-3aj.pages.dev/ads/wibuanimetv.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }
    const intervalId = setInterval(() => {
        createAmazonBanner()
        var desc = document.querySelector('.modal-body .description');
        if (desc) {
            desc.textContent = 'WibuAnimeTV - the best place to watch anime for free, every day!';
        }


        var imgAll = document.querySelectorAll('a[href*=home] img, img[src*=logo]');
        for (let img of imgAll) {
            img.src = 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv-icon.png';
            img.style.width = '50px';
            img.style.height = '50px';
            Object.defineProperty(img, 'src', {
                writable: false,
                configurable: false
            });
        }

        const allElements = document.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i];
                for (let j = 0; j < element.childNodes.length; j++) {
                    const node = element.childNodes[j];
                    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('animekai')) {
                        node.nodeValue = 'wibuanimetv';
                    }
                }
            }

        var footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'none';
        }

        var home = document.querySelector('a#logo');
        if (home) {
            home.href = '/home';
        }

        var lincese = document.querySelector('#footer');
        if (lincese) {
            lincese.style.display = 'none';
        }


        var desiTitle = document.querySelector('.show-share');
        if (desiTitle) {
            desiTitle.style.display = 'none';
        }

        var text = document.querySelector('#mw-text');
        if (text) {
            text.style.display = 'none';
        }

        var text2 = document.querySelector('#xsearch .description');
        if (text2) {
            text2.textContent = 'WibuAnimeTV - Just a better place to watch anime online for free!';
        }

        var text3 = document.querySelector('#xsearch .block');
        if (text3) {
            text3.style.display = 'none';
        }

        var rate = document.querySelector('.show-share');
        if (rate) {
            rate.style.display = 'none';
        }

        var rate2 = document.querySelector('.rating-stars');
        if (rate2) {
            rate2.style.display = 'none';
        }

        var android = document.querySelector('.mba-block');
        if (android) {
            android.style.display = 'none';
        }

        var ads = document.querySelectorAll('iframe');
        if (ads.length) {
            ads[ads.length - 1].style.display = 'none';
        }

        var comment = document.querySelector('section.block_area-comment');
        if (comment) {
            comment.style.display = 'none';
        }

        var android2 = document.querySelector('a[href*=app-download]');
        if (android2) {
            android2.style.display = 'none';
        }

        /*var con = document.querySelector('#main-content');
        if (con && count === 0) {
            const ig = document.createElement('img');
            ig.src = 'https://mobile-3aj.pages.dev/wibuanimetv/donate-wibuanimetv.png';
            ig.style.width = '100%';
            ig.style.height = 'auto';
            con.appendChild(ig);
        }*/

            // Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
              // Chỉ xử lý nếu node là một element (nodeType === 1)
              if (node.nodeType === 1) {
    
                // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
                // Chỉ ẩn element nếu cha trực tiếp của nó là <body> hoặc <html>
                if (node.id !== "ads" && (node.parentNode === document.body || node.parentNode === document.documentElement)) {
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

        count++;
        if (count >= 5) {
            clearInterval(intervalId);
        }
    }, 1000);
}
