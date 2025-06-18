/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/thaiantv/thaiantv.js';
 document.head.appendChild(script);
 */
function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
saveCurrentDateToLocalStorage();
function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#amazon');
    if (!amazonDiv) {
        amazonDiv = document.createElement('div');
        amazonDiv.id = 'amazon';
        document.body.appendChild(amazonDiv);
        // Tạo script và load JS từ URL
        var script = document.createElement('script');
        script.src = 'https://mobile-3aj.pages.dev/amazon/dubokotv.js';
        script.async = true;
        document.body.appendChild(script);
    }
}
let count = 0;
const intervalId = setInterval(function () {
    createAmazonBanner()
    var customLogo = document.querySelector('.logo img');

    if (customLogo) {
        customLogo.src = 'https://mobile-3aj.pages.dev/thaiantv/thaiantv-icon.jpg';
        customLogo.style.height = '70px';
        Object.defineProperty(customLogo, 'src', {
            writable: false,
            configurable: false
        });
    }

    var lincese = document.querySelector('#footer');
    if (lincese) {
        lincese.style.display = 'none';
    }

    var ads = document.querySelectorAll('[class*=rIdV]');
    for (let ad of ads) {
        ad.style.display = 'none';
    }

    var comments = document.querySelectorAll('iframe[title*=fb]');
    for(let comment of comments){
        comment.style.display = 'none';
    }

    var con = document.querySelector('.main-content');

    /*if (con && !document.querySelector('.donate-banner')) {
        const ig = document.createElement('img');
        ig.src = 'https://mobile-3aj.pages.dev/thaiantv/donate-thaiantv.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        ig.className = 'donate-banner';
        con.appendChild(ig);
    }*/

    count++;

    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 1000);


/*

var customLogo = document.querySelector('.site-title');

if(customLogo){
    customLogo.style.backgroundImage = 'URL(https://i.ibb.co/26qvGfH/thaiantv-icon.jpg)';
    customLogo.style.height = '70px';
}
var lincese = document.querySelector('div.footer-credit');
if(lincese){
    lincese.style.display = 'none';
}
var lincese1 = document.querySelector('div.widget_text.widget.widget_custom_html');
if(lincese1){
    lincese1.style.display = 'none';
}
var lincese2 = document.querySelector('div.widget.widget_media_image');
if(lincese2){
    lincese2.style.display = 'none';
}
var bannertop = document.querySelector('#banner_top');
if(bannertop){
    bannertop.style.display = 'none';
}
var bannermid = document.querySelector('#banner_pmid');
if(bannermid){
    bannermid.style.display = 'none';
}
var bannerlow = document.querySelector('#banner_plow');
if(bannerlow){
    bannerlow.style.display = 'none';
}
var errorSection = document.querySelector('.custom-html-widget');
if(errorSection){
    errorSection.style.display = 'none';
}
var comment = document.querySelector('iframe[class *= fb]');
if(comment){
    comment.style.display = 'none';
}
var buttonW = document.querySelector('div[class=button-watch]');
if(buttonW){
    buttonW.style.display = 'none';
}
var titleB = document.querySelector('div[class*=title-block]');
if(titleB){
    titleB.style.display = 'none';
}
var con = document.querySelector('#wrapper');

const ig = document.createElement('img');

ig.src = 'https://i.ibb.co/VVsxjrL/donate-thaiantv.png';

ig.style.width = '100%';
ig.style.height = 'auto';

con.appendChild(ig);
*/