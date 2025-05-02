let count = 0;
const intervalId = setInterval(() => {
    if (document.location.href === 'https://9animetv.to/') {
        location.href = '/home';
    }

    var desc = document.querySelector('.modal-body .description');
    if (desc) {
    desc.textContent = 'WibuAnimeTV - the best place to watch anime for free, every day!';
    }


    var img = document.querySelector('#logo img');
    if (img) {
        img.src = 'https://i.ibb.co/XJhCQSz/aimetv-icon.png';
    }
    
    var home = document.querySelector('a#logo');
    if (home) {
        home.href = '/home';
    }

    var lincese = document.querySelector('#footer');
    if (lincese) {
        lincese.style.display = 'none';
    }


    var desiTitle = document.querySelector('.deslide-wrap');
    if (desiTitle) {
        desiTitle.style.display = 'none';
    }

    var rate = document.querySelector('.show-share');
    if (rate) {
        rate.style.display = 'none';
    }

    var rate2 = document.querySelector('.rating-stars');
    if (rate2) {
        rate2.style.display = 'none';
    }

    var android = document.querySelector('.mba-block');
    if (android) {
        android.style.display = 'none';
    }

    var ads = document.querySelectorAll('iframe');
    if (ads.length) {
        ads[ads.length - 1].style.display = 'none';
    }

    var comment = document.querySelector('section.block_area-comment');
    if (comment) {
        comment.style.display = 'none';
    }

    var android2 = document.querySelector('a[href*=app-download]');
    if (android2) {
        android2.style.display = 'none';
    }

    var con = document.querySelector('#main-content');
    if (con && count === 0) {
        const ig = document.createElement('img');
        ig.src = 'https://i.postimg.cc/zXpwTwy4/donate-animehay.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        con.appendChild(ig);
    }

    count++;
    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 1000);
