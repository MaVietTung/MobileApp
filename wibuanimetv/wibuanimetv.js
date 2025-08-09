
/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv.js';
 document.head.appendChild(script);
 */
let count = 0;
function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
saveCurrentDateToLocalStorage();
function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#ads');
    if (!amazonDiv) {
        amazonDiv = document.createElement('div');
        amazonDiv.id = 'ads';
        amazonDiv.style.overflow = 'hidden';
        document.body.appendChild(amazonDiv);
        // Tạo script và load JS từ URL
        var script = document.createElement('script');
        script.src = 'https://mobile-3aj.pages.dev/ads/wibuanimetv.js';
        script.async = true;
        document.body.appendChild(script);
    }
}
const intervalId = setInterval(() => {
    createAmazonBanner()
    var desc = document.querySelector('.modal-body .description');
    if (desc) {
    desc.textContent = 'WibuAnimeTV - the best place to watch anime for free, every day!';
    }


    var imgAll = document.querySelectorAll('img[src*=logo]');
    for(let img of imgAll){
        img.src = 'https://mobile-3aj.pages.dev/wibuanimetv/wibuanimetv-icon.png';
    }
    
    var home = document.querySelector('a#logo');
    if (home) {
        home.href = '/home';
    }

    var lincese = document.querySelector('#footer');
    if (lincese) {
        lincese.style.display = 'none';
    }


    var desiTitle = document.querySelector('.show-share');
    if (desiTitle) {
        desiTitle.style.display = 'none';
    }

    var text = document.querySelector('#mw-text');
    if(text){
        text.style.display = 'none';
    }

    var text2= document.querySelector('#xsearch .description');
    if(text2){
        text2.textContent = 'WibuAnimeTV - Just a better place to watch anime online for free!';
    }

    var text3= document.querySelector('#xsearch .block');
    if(text3){
        text3.style.display = 'none';
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

    // Ẩn toàn bộ nội dung trong thẻ <head>
        // Lưu ý: Thao tác này không có tác dụng về mặt hình ảnh vì thẻ <head> không hiển thị ra trang web.
        if (document.head) {
            document.head.style.display = 'none';
        }

        //chỉ giữ lại body element
        const documentChildren = document.documentElement.children;
        for (const element of documentChildren) {
            if (element !== document.body) {
                element.style.display = 'none';
            }
        }

    /*var con = document.querySelector('#main-content');
    if (con && count === 0) {
        const ig = document.createElement('img');
        ig.src = 'https://mobile-3aj.pages.dev/wibuanimetv/donate-wibuanimetv.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        con.appendChild(ig);
    }*/

    count++;
    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 1000);
