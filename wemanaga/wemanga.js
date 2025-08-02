var imgAll = document.querySelectorAll('img[src*=logo]');
for (let img of imgAll) {
    img.src = 'https://mobile-3aj.pages.dev/wemanga/wemanga.png';
    img.style.width = '50px';
    img.style.height = '50px';
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

