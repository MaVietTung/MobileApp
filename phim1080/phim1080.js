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
var interval = setInterval(function() {
    if (count < 5) {
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
