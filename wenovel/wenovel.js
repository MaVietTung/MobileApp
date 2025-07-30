const logoImages = document.querySelectorAll('img[src*=logo]');
for (let logoImage of logoImages) {
    logoImage.src = 'https://mobile-3aj.pages.dev/wenovel/wenovel.png';
    Object.defineProperty(logoImage, 'src', {
        writable: false,
        configurable: false
    });
}