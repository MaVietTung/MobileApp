if (!location.href.includes("netlify.app")) {
  function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#ads');
    if (!amazonDiv && !location.href.includes('read') && !location.href.includes('chapter')) {
      amazonDiv = document.createElement('div');
      amazonDiv.id = 'ads';
      amazonDiv.style.overflow = 'hidden';
      document.body.appendChild(amazonDiv);
      // Tạo script và load JS từ URL
      var script = document.createElement('script');
      script.src = 'https://mobile-3aj.pages.dev/ads/wemanga.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }
  createAmazonBanner()

  var imgAll = document.querySelectorAll('img[src*=logo]');
  for (let img of imgAll) {
    img.src = 'https://mobile-3aj.pages.dev/wemanga/wemanga.png';
    img.style.width = '50px';
    img.style.height = '50px';
    Object.defineProperty(img, 'src', {
      writable: false,
      configurable: false
    });
  }

  var welcomeBottom = document.querySelector('.welcome-bottom')
  if (welcomeBottom) {
    welcomeBottom.style.display = 'none'
  }

  var footer = document.querySelector('footer')
  if (footer) {
    footer.style.display = 'none'
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

  // test page
  // This function contains all the logic you want to run repeatedly
  function modifyPageElements() {

    // Find and replace the "Yuki" span
    const yukiSpan = Array.from(document.querySelectorAll('span'))
      .find(span => span.textContent.trim() === 'Yuki');

    if (yukiSpan) {
      yukiSpan.textContent = 'WeManga';
    } else {
      // This message will appear if the span isn't found in a given second
      // console.log('Span with "Yuki" not found.'); 
    }

    // Find and hide the "Chapters" link
    const aChapter = Array.from(document.querySelectorAll('a'))
      .find(a => a.textContent.trim() === 'Chapters');

    if (aChapter) {
      aChapter.style.display = 'none';
    } else {
      // console.log('Link with "Chapters" not found.');
    }

    // Find and hide the login button containing "Google"
    const buttonLogin = Array.from(document.querySelectorAll('button'))
      .find(button => button.textContent.trim().includes('Google'));

    if (buttonLogin) {
      buttonLogin.style.display = 'none';
    } else {
      // console.log('Button with "Google" not found.');
    }
  }

  // Run the function modifyPageElements() every 1000 milliseconds (1 second)
  setInterval(modifyPageElements, 1000);
  // finish test page
}