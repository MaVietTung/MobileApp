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
        img.src = 'https://i.ibb.co/1L6k8JC/xiaobaotv-icon.png';
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
            ad.click();
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

    runCount++;
    if (runCount >= 3) {
        clearInterval(intervalId);
    }
}, 1000);
