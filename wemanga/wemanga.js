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
if(welcomeBottom){
    welcomeBottom.style.display = 'none'
}

var footer = document.querySelector('footer')
if(footer){
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

// test page
const yukiSpan = Array.from(document.querySelectorAll('span')).find(span => span.textContent.trim() === 'Yuki');

// Check if the element was found and then use it
if (yukiSpan) {
  // You can now manipulate the element, e.g., change its style
  yukiSpan.textContent = 'WeManga';
} else {
  console.log('No span with the text "Yuki" was found.');
}

const aChapter = Array.from(document.querySelectorAll('a')).find(span => span.textContent.trim() === 'Chapters');

// Check if the element was found and then use it
if (aChapter) {
  // You can now manipulate the element, e.g., change its style
  aChapter.style.display = 'none';
} else {
  console.log('No span with the text "Yuki" was found.');
}

const buttonLogin = Array.from(document.querySelectorAll('button')).find(span => span.textContent.trim().includes('Google'));

// Check if the element was found and then use it
if (buttonLogin) {
  // You can now manipulate the element, e.g., change its style
  buttonLogin.style.display = 'none';
} else {
  console.log('No span with the text "Login" was found.');
}
// finish test page