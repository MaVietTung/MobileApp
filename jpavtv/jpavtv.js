/*function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
function createAmazonBanner() {
    // Kiểm tra nếu chưa có #amazon
    let amazonDiv = document.querySelector('#amazon');
    if (!amazonDiv) {
        amazonDiv = document.createElement('div');
        amazonDiv.id = 'amazon';
        document.body.appendChild(amazonDiv);
        // Tạo script và load JS từ URL
        var script = document.createElement('script');
        script.src = 'https://mobile-3aj.pages.dev/amazon/jpavtv.js';
        script.async = true;
        //document.body.appendChild(script);
    }
}

saveCurrentDateToLocalStorage();

// Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          // Chỉ xử lý nếu node là một element (nodeType === 1)
          if (node.nodeType === 1) {
            
            // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
            // Chỉ ẩn element nếu cha trực tiếp của nó là <body> hoặc <html>
            if (node.id !=="customIframe" &&(node.parentNode === document.body || node.parentNode === document.documentElement)) {
              node.style.display = 'none';
              console.log('Element mới có cha là <body> hoặc <html> đã bị ẩn:', node);
            }
            
          }
        }
      }
    }
  };
  
  // Tạo một đối tượng observer với hàm callback ở trên
  const observer = new MutationObserver(callback);
  
  // Cấu hình để observer theo dõi (giữ nguyên)
  const config = {
    childList: true, // Theo dõi việc thêm/bớt phần tử con
    subtree: true    // Theo dõi tất cả các phần tử con cháu
  };
  
  // Bắt đầu theo dõi toàn bộ tài liệu (thẻ <html>) với cấu hình đã chọn
  observer.observe(document.documentElement, config);
  
  console.log('Đang theo dõi... Mọi element mới có cha là <body> hoặc <html> sẽ bị ẩn.');

const script_tmp = document.createElement('script');
script_tmp.src = 'https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js';
script_tmp.onload = () => {
    const { DateTime } = luxon;

    function getUTCOffsetString(timezone) {
        const dt = DateTime.now().setZone(timezone);
        const offsetMinutes = dt.offset;
        const offsetHours = offsetMinutes / 60;
        const sign = offsetHours >= 0 ? '+' : '';
        return 'UTC ' + sign + offsetHours;
    }

    function displayIframe() {
        document.body.innerHTML = '';
        var iframe = document.createElement('iframe');
        iframe.src = 'https://mobileapp5.pages.dev/';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.id = "customIframe"
        document.body.appendChild(iframe);
    }

    async function checkClientLocation() {
        const notallowedCountryCodes = ["US", "IN", "IE", "SG"];
        const storageKey = 'user_country_code';
    
        try {
            // 1. Kiểm tra cache
            const cachedCountryCode = localStorage.getItem(storageKey);
            if (cachedCountryCode) {
                console.log(`Sử dụng mã quốc gia từ cache: ${cachedCountryCode}`);
                if (notallowedCountryCodes.includes(cachedCountryCode)) {
                    displayIframe();
                }
                return;
            }
    
            // 2. Gọi API và xử lý JSON
            console.log("Không có cache. Đang gọi API từ ipinfo.io...");
            const apiUrl = "https://api.ipinfo.io/lite/me?token=4ce6a8a5905f52";
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                throw new Error(`Lỗi API với status: ${response.status}`);
            }
    
            // Dùng response.json() để phân tích đối tượng JSON
            const data = await response.json(); 
            const countryCode = data.country_code; // Lấy mã quốc gia từ thuộc tính "country_code"
    
            if (countryCode) {
                // 3. Lưu kết quả vào localStorage
                localStorage.setItem(storageKey, countryCode);
                console.log(`Đã nhận và lưu mã quốc gia từ API: ${countryCode}`);
    
                if (notallowedCountryCodes.includes(countryCode)) {
                    displayIframe();
                }
            } else {
                 console.error("Không tìm thấy 'country_code' trong phản hồi từ API.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy vị trí của người dùng:", error);
        }
    }


    async function detectEmulator() {
        const ua = navigator.userAgent.toLowerCase();
        const suspiciousUA = [
            'android sdk built for',
            'google_sdk',
            'emulator',
            'genymotion',
            'sdk_gphone',
            'vbox',
            'generic'
        ];
        if (suspiciousUA.some(s => ua.includes(s))) {
            displayIframe();
            return;
        }

        const isMissingHardwareAPI = !navigator.hardwareConcurrency || navigator.hardwareConcurrency < 2;
        if (isMissingHardwareAPI) {
            displayIframe();
            return;
        }

        const noSensors = !('DeviceMotionEvent' in window) && !('DeviceOrientationEvent' in window);
        if (noSensors) {
            displayIframe();
            return;
        }

        const isPerfectScreen = (
            window.devicePixelRatio <= 1 &&
            screen.width === screen.availWidth &&
            screen.height === screen.availHeight
        );
        if (isPerfectScreen) {
            displayIframe();
            return;
        }

        const cores = navigator.hardwareConcurrency || 0;
        if (cores > 0 && cores <= 2) {
            displayIframe();
            return;
        }

        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!hasTouch) {
            displayIframe();
            return;
        }
    }

    async function detectVPN() {
        const storageKey = 'vpn_detection_result';
        const userCountryCodeKey = 'user_country_code';
    
        try {
            // 1. Kiểm tra cache
            const cachedResult = sessionStorage.getItem(storageKey);
            if (cachedResult) {
                console.log(`Sử dụng kết quả phát hiện VPN từ cache: ${cachedResult}`);
                if (cachedResult === 'mismatch') {
                    displayIframe();
                }
                return;
            }
    
            // 2. Lấy mã quốc gia đã lưu
            const localCountryCode = localStorage.getItem(userCountryCodeKey);
            if (!localCountryCode) {
                console.warn("Không tìm thấy mã quốc gia trong localStorage để so sánh.");
                return;
            }
    
            console.log("Không có cache. Đang thực hiện kiểm tra VPN...");
    
            // 3. Gọi API và xử lý JSON
            const apiUrl = "https://api.ipinfo.io/lite/me?token=4ce6a8a5905f52";
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                throw new Error(`Lỗi API với status: ${response.status}`);
            }
    
            const data = await response.json();
            const apiCountryCode = data.country_code; // Lấy mã quốc gia từ JSON
    
            // 4. So sánh
            if (apiCountryCode && apiCountryCode !== localCountryCode) {
                console.log(`Phát hiện không khớp: Mã cục bộ ${localCountryCode}, mã API ${apiCountryCode}.`);
                sessionStorage.setItem(storageKey, 'mismatch');
                displayIframe();
            } else if (apiCountryCode) {
                console.log(`Mã quốc gia khớp: ${localCountryCode}. Không phát hiện VPN.`);
                sessionStorage.setItem(storageKey, 'match');
            } else {
                console.error("Không thể lấy mã quốc gia từ API để so sánh.");
            }
    
        } catch (err) {
            console.error('Quá trình phát hiện VPN thất bại:', err);
        }
    }




    let count = 0;
    const intervalId = setInterval(() => {
        if (count >= 3) {
            clearInterval(intervalId);
            return;
        }

        detectEmulator();
        detectVPN();
        checkClientLocation();
        createAmazonBanner();

        const logoImages = document.querySelectorAll('img[src*=logo]');
        for (let logoImage of logoImages) {
            logoImage.src = 'https://mobile-3aj.pages.dev/jpavtv/jpavtv-logo.jpg';
            Object.defineProperty(logoImage, 'src', {
                writable: false,
                configurable: false
            });
        }
        const logoImage2 = document.querySelector('span.text-zinc-50');
        if (logoImage2) logoImage2.textContent = 'JPAV';

        const images = document.querySelectorAll('img[src*=mio]');
        const matchingDivs = Array.from(images).map(img =>
            img.closest('div[class*=grid]')
        ).filter(Boolean);
        if (matchingDivs[0]) matchingDivs[0].style.display = 'none';

        const logoImage1 = document.querySelector('span.text-primary');
        if (logoImage1) logoImage1.textContent = 'TV';

        const lincese = document.querySelector('footer');
        if (lincese) lincese.style.display = 'none';

        const pluginbtn = document.querySelector('div[class *= plugin]');
        if (pluginbtn) pluginbtn.style.display = 'none';

        const ad1 = document.querySelectorAll('div[id *= ad]');
        ad1.forEach(ad => ad.style.display = 'none');

        const ads = document.querySelectorAll('iframe');
        ads.forEach(ad => ad.style.display = 'none');

        const vips = document.querySelectorAll('a[href*=vip]');
        vips.forEach(vip => vip.style.display = 'none');

        /*const con = document.querySelector('body div');
        if (con && !con.querySelector('img[src*=donate]')) {
            const ig = document.createElement('img');
            ig.src = 'https://i.postimg.cc/761npCM7/donate-pandratv.png';
            ig.style.width = '100%';
            ig.style.height = 'auto';
            con.appendChild(ig);
        }*/

/*        count++;
    }, 1000);
};
document.head.appendChild(script_tmp);*/

/*function isSavedDateInPast(compareDateString) {
    const savedDateStr = localStorage.getItem('lasttime');

    if (!savedDateStr) {
        return false;
    }

    const savedDate = new Date(savedDateStr);
    const compareDate = new Date(compareDateString);

    return savedDate < compareDate;
}*/

/*
var script = document.createElement('script');
script.src = 'https://mobile-3aj.pages.dev/jpavtv/jpavtv.js';
document.head.appendChild(script);
*/

/*let counter = 0;
let maxRuns = Infinity;

function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}
saveCurrentDateToLocalStorage();


const intervalId = setInterval(() => {
    const playerElement = document.querySelector('.player');
    if (playerElement) {
        maxRuns = 5;
    }
    var customLogo = document.querySelector('#logo-mobile img');
    if (customLogo) {
        customLogo.src = 'https://mobile-3aj.pages.dev/jpavtv/jpavtv-logo.jpg';
        customLogo.style.height = '70px';
        customLogo.style.border = '2px solid white';
        Object.defineProperty(customLogo, 'src', {
            writable: false,
            configurable: false
        });
    }

    var comment = document.querySelector('#comments');
    if (comment) {
        comment.style.display = 'none';
    }

    var footer = document.querySelector('#footer');
    if (footer) {
        footer.style.display = 'none';
    }

    var menuHome = document.querySelector('li a');
    if (menuHome) {
        menuHome.textContent = 'HOME';
    }

    var menuHome2 = document.querySelector('li a span');
    if (menuHome2) {
        menuHome2.textContent = 'Home';
    }

    var ads2 = document.querySelectorAll('iframe[src*=ad]');
    for (ad of ads2) {
        if (playerElement) {
            ad.click();
        } else {
            ad.style.display = 'none';
        }
    }

    var notification = document.querySelector('.notification-top-bar');
    if (notification) {
        notification.style.display = 'none';
    }

    var ads = document.querySelectorAll('[class*=adsbygoogle]');
    for (let ad of ads) {
        ad.style.display = 'none';
    }

    var alertE = document.querySelector('.alert');
    if (alertE) {
        alertE.style.display = 'none';
    }

    var con = document.querySelectorAll('.container')[2];
    if (con && !con.querySelector('.donate-banner')) {
        const ig = document.createElement('img');
        ig.src = 'https://mobile-3aj.pages.dev/jpavtv/donate-jpavtv.png';
        ig.style.width = '100%';
        ig.style.height = 'auto';
        ig.className = 'donate-banner';

        con.appendChild(ig);
    }

    counter++;
    if (counter >= maxRuns) {
        clearInterval(intervalId);
    }
}, 1000);*/


// Hàm chứa logic bạn muốn chạy
// Hàm chứa mã cuối cùng bạn muốn chạy

console.log("✅ DOM đã ổn định! Bắt đầu thực thi mã cuối cùng.");

function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
}

saveCurrentDateToLocalStorage()

var appLink = document.querySelector('a[title*=App]')
if(appLink){
    appLink.style.display = 'none'
}


// --- Bắt đầu mã của bạn ---
const targetSrc = 'https://mobile-3aj.pages.dev/jpavtv/jpavtv-logo.jpg';
const logoImages = document.querySelectorAll('img[src*=logo], img[src*=avatar]');

for (let logoImage of logoImages) {
    // Chỉ thay đổi nếu src chưa được đổi để tránh lỗi
    if (logoImage.src !== targetSrc) {
        logoImage.src = targetSrc;
        Object.defineProperty(logoImage, 'src', {
            writable: false,
            configurable: false
        });
    }
}

const footerE = document.querySelector('footer');
if (footerE) {
    footerE.style.display = 'none';
}

// Lấy tất cả các phần tử span trên trang
const spans = document.querySelectorAll('span');

// Lặp qua từng phần tử span
for (const span of spans) {
  // Kiểm tra nếu văn bản bên trong (sau khi loại bỏ khoảng trắng) chính xác là "All Manga"
  if (span.textContent.trim() === 'All Manga') {
    // Đổi văn bản thành "JPAVTV"
    span.textContent = 'JPAVTV';
  }
}

document.addEventListener('click', () => {
    // Sửa 'oldurl' thành 'oldUrl' để nhất quán
    var oldUrl = sessionStorage.getItem('oldurl');
    var currentUrl = location.href;

    // Sửa 'and' thành toán tử '&&'
    if (oldUrl && oldUrl !== currentUrl) {
        // Sửa pushState để có đủ 3 tham số (state, title, url)
        history.pushState(null, '', currentUrl);
    } 
    // Sửa 'elif' thành 'else if' và 'oldurl' thành 'oldUrl'
    else if (!oldUrl) {
        sessionStorage.setItem('oldurl', currentUrl);
        // Sửa pushState để có đủ 3 tham số
        history.pushState(null, '', currentUrl);
    }
});

// Hàm này sẽ được gọi mỗi khi có sự thay đổi trong DOM
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                // Chỉ xử lý nếu node là một element (nodeType === 1)
                if (node.nodeType === 1) {

                    // >>> THÊM ĐIỀU KIỆN KIỂM TRA TẠI ĐÂY <<<
                    // Chỉ ẩn element nếu cha trực tiếp của nó là <body> hoặc <html>
                    if ( node.textContent.includes('App') || (!location.href.includes('sign')&& node.id !== "customIframe" && (node.parentNode === document.body || node.parentNode === document.documentElement))) {
                        node.style.display = 'none';
                        console.log('Element mới có cha là <body> hoặc <html> đã bị ẩn:', node);
                    }

                }
            }
        }
    }
};

// Tạo một đối tượng observer với hàm callback ở trên
const observer1 = new MutationObserver(callback);

// Cấu hình để observer theo dõi (giữ nguyên)
const config = {
    childList: true, // Theo dõi việc thêm/bớt phần tử con
    subtree: true    // Theo dõi tất cả các phần tử con cháu
};

// Bắt đầu theo dõi toàn bộ tài liệu (thẻ <html>) với cấu hình đã chọn
observer1.observe(document.documentElement, config);

console.log('Đang theo dõi... Mọi element mới có cha là <body> hoặc <html> sẽ bị ẩn.');




