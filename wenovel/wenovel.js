

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
