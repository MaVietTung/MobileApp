/*var count = 0;
var interval = setInterval(function() {
    if (count < 5) {
        var logoImages = document.querySelectorAll('.logo img');
        for (let logoImage of logoImages) {
            logoImage.src = 'https://i.ibb.co/NYn04bY/phim1080-logo.jpg';
            logoImage.style.width = '50px';
            logoImage.style.height = '50px';
            Object.defineProperty(logoImage, 'src', {
                writable: false,
                configurable: false
            });
        }

        var textHome = document.querySelector('a[href*=motchill] span');
        if(textHome){
            textHome.textContent = 'Home';
        }

        var textHome2 = document.querySelector('#main_header.resp li[class*=menu] a[href*=motchil]');
        if(textHome2){
            textHome2.textContent = 'Home';
        }

        var notification = document.querySelector('.notification');
        if (notification) {
            notification.style.display = 'none';
        }

        var rophim = document.querySelector('img[src*=rophim]');
        if (rophim) {
            rophim.style.display = 'none';
        }

        var rophim2 = document.querySelector('.buttons a[href*=rophim]');
        if (rophim2) {
            rophim2.style.display = 'none';
        }

        var footer = document.querySelector('#footer');
        if (footer) {
            footer.style.display = 'none';
        }

        var comment = document.querySelector('#comment-tab');
        if (comment) {
            comment.style.display = 'none';
        }

        var ccWarnings = document.querySelectorAll('.cc-warning');
        for (let ccWarning of ccWarnings) {
            ccWarning.style.display = 'none';
        }

        var con = document.querySelector('#content');
        if (con  && !con.querySelector('.donate-banner')) {
            const ig = document.createElement('img');
            ig.src = 'https://i.ibb.co/YBGqpQP/donate-phim1080.png';
            ig.style.width = '100%';
            ig.style.height = 'auto';
            ig.className = 'donate-banner';
            con.appendChild(ig);
        }

        count++;
    } else {
        clearInterval(interval);
    }
}, 1000);*/

/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/phim1080/phim1080.js';
 document.head.appendChild(script);
 */

var count = 0;
function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
saveCurrentDateToLocalStorage();
function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#amazon');
    if (!amazonDiv) {
        amazonDiv = document.createElement('div');
        amazonDiv.id = 'amazon';
        document.body.appendChild(amazonDiv);
        // Tạo script và load JS từ URL
        var script = document.createElement('script');
        script.src = 'https://mobile-3aj.pages.dev/amazon/phim1080.js';
        script.async = true;
        //document.body.appendChild(script);
    }
}
var interval = setInterval(function() {
    if (count < 5) {
        createAmazonBanner()
        var logoImages = document.querySelectorAll('.logo img');
        for (let logoImage of logoImages) {
            logoImage.src = 'https://mobile-3aj.pages.dev/phim1080/phim1080-logo.jpg';
            logoImage.style.width = '30px';
            logoImage.style.height = '30px';
            Object.defineProperty(logoImage, 'src', {
                writable: false,
                configurable: false
            });
        }

        var footer = document.querySelector('.footer');
        if (footer) {
            footer.style.display = 'none';
        }

        var ads = document.querySelectorAll('brde img');
        for(let ad of ads){
            ad.click();
        }

        

        /*var con = document.querySelector('.wrapper');
        if (con  && !con.querySelector('.donate-banner')) {
            const ig = document.createElement('img');
            ig.src = 'https://mobile-3aj.pages.dev/phim1080/phim1080-donate-banner.png';
            ig.style.width = '100%';
            ig.style.height = 'auto';
            ig.className = 'donate-banner';
            con.appendChild(ig);
        }*/

        count++;
    } else {
        clearInterval(interval);
    }
}, 1000);

//chỉ giữ lại body element
const documentChildren = document.documentElement.children;
for (const element of documentChildren) {
  if (element !== document.body) {
    element.style.display = 'none';
  }
}

// Lấy tất cả các phần tử con trực tiếp của thẻ <body>
const bodyChildren = document.body.children;

// Lặp qua tất cả các phần tử con của <body>
for (const element of bodyChildren) {
  // Nếu ID của phần tử không phải là 'wrapper', hãy ẩn nó đi
  if (element !== bodyChildren[0]) {
    element.style.display = 'none';
  }
}

// Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          // Chỉ xử lý nếu node là một element (nodeType === 1)
          if (node.nodeType === 1) {
            
            // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
            // Chỉ ẩn element nếu cha trực tiếp của nó là <body> hoặc <html>
            if (node.parentNode === document.body || node.parentNode === document.documentElement) {
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
