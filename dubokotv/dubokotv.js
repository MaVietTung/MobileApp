
/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/dubokotv/dubokotv.js';
 document.head.appendChild(script);
 */
if (!location.href.includes("pages.dev")) {
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
            script.src = 'https://mobile-3aj.pages.dev/ads/dubokotv.js';
            script.async = true;
            document.body.appendChild(script);
        }
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
        createAmazonBanner()
        var img = document.querySelector('img.img-responsive.visible-xs');
        if (img) {
            img.src = 'https://mobile-3aj.pages.dev/dubokotv/small-icon.png';
        }

        var img1 = document.querySelector('img.img-responsive.hidden-xs');
        if (img1) {
            img1.src = 'https://mobile-3aj.pages.dev/dubokotv/big-icon.png';
        }

        var img2 = document.querySelector('.head img');
        if (img2) {
            img2.src = 'https://mobile-3aj.pages.dev/dubokotv/small-icon.png';
        }

        var license = document.querySelector('div.col-pd.text-center');
        if (license) {
            license.style.display = 'none';
        }

        var rate = document.querySelector('a.btn.btn-danger');
        if (rate) {
            rate.style.display = 'none';
        }

        /*var comment = document.querySelectorAll('.myui-panel-box')[2];
        if(comment){
            comment.style.display = 'none';
        }*/

        /*var con = document.querySelector('header + .container');
        const ig = document.createElement('img');
    
        ig.src = 'https://mobile-3aj.pages.dev/dubokotv/donate-dakubao-2.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        ig.className = 'donate-banner';
    
        if(con && !document.querySelector('.donate-banner')){
            con.appendChild(ig);
        }*/

        count2++;
        if (count2 >= 5) {
            clearInterval(interval);
        }
    }

    const interval = setInterval(updateElements, 1000);
}



