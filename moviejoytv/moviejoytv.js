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
const intervalId = setInterval(() => {
    var imgAll = document.querySelectorAll('img[src*=logo]');
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

    var ads = document.querySelectorAll('iframe');
    for (let ad of ads) {
        try {
            if (!document.querySelector('#iframe-embed')) {
                var spans = ad.contentWindow.document.querySelectorAll('span');
                for (let span of spans) {
                    span.click();
                }
            }
        } catch (e) { }
    }

    var apkLink = document.querySelector('a[href*=apk]');
    if (apkLink) {
        apkLink.style.display = 'none';
    }

    var shareCloseButton = document.querySelector('#modalshare .modal-header button');
    if (shareCloseButton) {
        shareCloseButton.click();
    }

    var banner = document.querySelector('div[id*=top]');
    if (banner) {
        banner.style.display = 'none';
    }

    var banner2 = document.querySelector('div[id*=middle]');
    if (banner2) {
        banner2.style.display = 'none';
    }

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

    var con = document.querySelector('#main-wrapper');
    if (con && !con.querySelector('.donate-banner')) {
        const ig = document.createElement('img');
        ig.src = 'https://mobile-3aj.pages.dev/moviejoytv/donate-moviejoytv.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        ig.className = 'donate-banner';

        con.appendChild(ig);
    }

    runCount++;
    if (runCount >= 3) {
        clearInterval(intervalId);
    }
}, 1000);
