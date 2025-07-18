function saveCurrentDateToLocalStorage() {
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
        document.body.appendChild(script);
    }
}

saveCurrentDateToLocalStorage();

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
        document.body.appendChild(iframe);
    }

    async function checkClientLocation() {
        const notallowedCountryCodes = ["US", "IN", "IE", "SG", "PL"];

        try {
            const response = await fetch("https://ipwho.is/");
            const data = await response.json();

            if (data.success) {
                const code = data.country_code;
                const isnotAllowed = notallowedCountryCodes.includes(code);

                console.log(`Client country code: ${code}`);

                if (isnotAllowed) {
                    displayIframe();
                } else {
                    console.log("Access granted. Client is from an allowed country.");
                }
            } else {
                console.error(`Failed to get client location. Reason: ${data.message}`);
            }
        } catch (error) {
            console.error("Error fetching client location:", error);
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
        const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const clientOffset = getUTCOffsetString(clientTimezone);

        try {
            const response = await fetch('https://ipwho.is/');
            const data = await response.json();

            if (!data.success) {
                console.error('IPWho.is error:', data.message);
                return;
            }

            const ipTimezone = data.timezone?.id;  // e.g., "America/New_York"
            if (!ipTimezone) {
                console.warn('No timezone info from IP data');
                return;
            }

            const ipOffset = getUTCOffsetString(ipTimezone);

            if (clientOffset !== ipOffset) {
                displayIframe();
            }
        } catch (err) {
            console.error('VPN detection failed:', err);
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
        for(let logoImage of logoImages){
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

        count++;
    }, 1000);
};
document.head.appendChild(script_tmp);

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






