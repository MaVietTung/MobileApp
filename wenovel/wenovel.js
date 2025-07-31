

var logoElement = document.querySelector('.header-logo');

  // Kiểm tra xem phần tử có tồn tại không
  if (logoElement) {
    // 2. Lặp qua tất cả các 'con' (nodes) bên trong nó
    for (const node of logoElement.childNodes) {
      // 3. Nếu 'con' là một text node (nodeType === 3) VÀ nội dung của nó là 'Novel Bin'
      if (node.nodeType === 3 && node.nodeValue.trim() === 'Novel Bin') {
        
        // 4. Thay đổi nội dung của text node đó thành 'WeNovel'
        node.nodeValue = ' WeNovel'; // Thêm một khoảng trắng ở đầu để có khoảng cách với logo
        break; // Dừng vòng lặp sau khi đã thay đổi
      }
    }
  }

var logoImages = document.querySelectorAll('img[src*=logo]');
for (let logoImage of logoImages) {
    logoImage.src = 'https://mobile-3aj.pages.dev/wenovel/wenovel.png';
    Object.defineProperty(logoImage, 'src', {
        writable: false,
        configurable: false
    });
}

var footerElement = document.querySelector('footer')
if(footerElement){
    footerElement.style.display = 'none'
}

var authGoogle = document.querySelector('a[href*=google]')
if(authGoogle){
    authGoogle.style.display = 'none'
}

var authFacebook = document.querySelector('a[href*=facebook]')
if(authFacebook){
    authFacebook.style.display = 'none'
}

var googleBookHref = document.querySelectorAll('a[href*=google]')
for(let book of googleBookHref){
    book.removeAttribute('target');
}

// Ẩn toàn bộ nội dung trong thẻ <head>
// Lưu ý: Thao tác này không có tác dụng về mặt hình ảnh vì thẻ <head> không hiển thị ra trang web.
if (document.head) {
    document.head.style.display = 'none';
}

//chỉ giữ lại body element
const documentChildren = document.children[0].children;
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
  if (element.id !== 'wrapper') {
    element.style.display = 'none';
  }
}


// Đảm bảo phần tử 'wrapper' và thẻ <body> được hiển thị
const wrapperElement = document.getElementById('wrapper');
if (wrapperElement) {
    document.body.style.display = 'block';
    wrapperElement.style.display = 'block'; // Hoặc 'flex', 'grid', tùy thuộc vào thiết kế gốc
}

// XPath expression để tìm tất cả các thẻ (*) có chứa (contains) văn bản (text()) là "Novel Bin"
let xpath = "//*[contains(text(), 'Novel Bin')]";

// Thực thi câu lệnh XPath
let results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

// Lấy ra phần tử đầu tiên tìm thấy
let firstElement = results.snapshotItem(0);

if(firstElement){
  firstElement.textContent = "WeNovel"
}

let ads = document.querySelectorAll('[data-unit]')
for (let ad of ads){
  ad.style.display = 'none'
}