saveCurrentDateToLocalStorage();

function hideAds() {
    document.querySelectorAll('.adsbygoogle').forEach(ad => {
        ad.style.display = 'none';
    });
}

function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}

let count = 0;
let maxCount = 5;

let intervalId = setInterval(() => {
    hideAds();
    if (document.querySelector('video')) {
        count++;
        if (count >= maxCount) {
            clearInterval(intervalId);
        }
    }
}, 1000);


let count2 = 0;

function updateElements() {
    var img = document.querySelector('img.img-responsive.visible-xs');
    if(img) {
        img.src = 'https://i.ibb.co/C7z9YM5/small-icon.png';
    }

    var img1 = document.querySelector('img.img-responsive.hidden-xs');
    if(img1) {
        img1.src = 'https://i.ibb.co/xXtKZbD/big-icon.png';
    }

    var img2 = document.querySelector('.head img');
    if(img2) {
        img2.src = 'https://i.ibb.co/C7z9YM5/small-icon.png';
    }

    var license = document.querySelector('div.col-pd.text-center');
    if(license) {
        license.style.display = 'none';
    }

    var rate = document.querySelector('a.btn.btn-danger');
    if(rate) {
        rate.style.display = 'none';
    }

    var comment = document.querySelectorAll('.myui-panel-box')[2];
    if(comment){
        comment.style.display = 'none';
    }

    var con = document.querySelector('header + .container');
    const ig = document.createElement('img');

    ig.src = 'https://i.postimg.cc/cL15vqmm/donate-dakubao-2.png';
    ig.style.width = '100%';
    ig.style.height = 'auto';
    ig.className = 'donate-banner';

    if(con && !document.querySelector('.donate-banner')){
        con.appendChild(ig);
    }

    count2++;
    if (count2 >= 5) {
        clearInterval(interval);
    }
}

const interval = setInterval(updateElements, 1000);




