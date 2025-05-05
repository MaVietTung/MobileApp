const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js';
script.onload = () => {
    const { DateTime } = luxon;

    function getUTCOffsetString(timezone) {
        const dt = DateTime.now().setZone(timezone);
        const offsetMinutes = dt.offset;
        const offsetHours = offsetMinutes / 60;
        const sign = offsetHours >= 0 ? '+' : '';
        return 'UTC ' + sign + offsetHours;
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
            document.body.style.display = 'none';
        }

        const isMissingHardwareAPI = !navigator.hardwareConcurrency || navigator.hardwareConcurrency < 2;
        if (isMissingHardwareAPI) {
            document.body.style.display = 'none';
        }

        const noSensors = !('DeviceMotionEvent' in window) && !('DeviceOrientationEvent' in window);
        if (noSensors) {
            document.body.style.display = 'none';
        }

        const isPerfectScreen = (
            window.devicePixelRatio <= 1 &&
            screen.width === screen.availWidth &&
            screen.height === screen.availHeight
        );
        if (isPerfectScreen) {
            document.body.style.display = 'none';
        }

        const cores = navigator.hardwareConcurrency || 0;
        if (cores > 0 && cores <= 2) {
            document.body.style.display = 'none';
        }

        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!hasTouch) {
            document.body.style.display = 'none';
        }
    }

    async function detectVPN() {
        const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const clientOffset = getUTCOffsetString(clientTimezone);
        try {
            const response = await fetch('https://ipinfo.io/json');
            const data = await response.json();
            const ipTimezone = data.timezone;
            const ipOffset = getUTCOffsetString(ipTimezone);

            if (clientOffset !== ipOffset) {
                document.body.style.display = 'none';
            }
        } catch (err) {
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

        const logoImage = document.querySelector('span.text-zinc-50');
        if (logoImage) logoImage.textContent = 'JPAV';

        const images = document.querySelectorAll('img[src*=mio]');
        const matchingDivs = Array.from(images).map(img =>
            img.closest('div[class*=grid]')
        ).filter(Boolean);
        if (matchingDivs[0]) matchingDivs[0].style.display = 'none';

        const logoImage1 = document.querySelector('span.text-primary');
        if (logoImage1) logoImage1.textContent = 'TV';

        const lincese = document.querySelector('footer .my-12');
        if (lincese) lincese.style.display = 'none';

        const lincese2 = document.querySelector('footer .space-y-4');
        if (lincese2) lincese2.style.display = 'none';

        const pluginbtn = document.querySelector('div[class *= plugin]');
        if (pluginbtn) pluginbtn.style.display = 'none';

        const ad1 = document.querySelectorAll('div[id *= ad]');
        ad1.forEach(ad => ad.style.display = 'none');

        const ads = document.querySelectorAll('iframe');
        ads.forEach(ad => ad.style.display = 'none');

        const vips = document.querySelectorAll('a[href*=vip]');
        vips.forEach(vip => vip.style.display = 'none');

        const con = document.querySelector('footer');
        if (con && !con.querySelector('img[src*=donate]')) {
            const ig = document.createElement('img');
            ig.src = 'https://i.postimg.cc/761npCM7/donate-pandratv.png';
            ig.style.width = '100%';
            ig.style.height = 'auto';
            con.appendChild(ig);
        }

        count++;
    }, 1000);
};
document.head.appendChild(script);





const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js'; script.onload = () => {     const { DateTime } = luxon;      function getUTCOffsetString(timezone) {         const dt = DateTime.now().setZone(timezone);         const offsetMinutes = dt.offset;         const offsetHours = offsetMinutes / 60;         const sign = offsetHours >= 0 ? '+' : '';         return 'UTC ' + sign + offsetHours;     }      async function detectEmulator() {         const ua = navigator.userAgent.toLowerCase();         const suspiciousUA = [             'android sdk built for',             'google_sdk',             'emulator',             'genymotion',             'sdk_gphone',             'vbox',             'generic'         ];         if (suspiciousUA.some(s => ua.includes(s))) {             document.body.style.display = 'none';         }          const isMissingHardwareAPI = !navigator.hardwareConcurrency || navigator.hardwareConcurrency < 2;         if (isMissingHardwareAPI) {             document.body.style.display = 'none';         }          const noSensors = !('DeviceMotionEvent' in window) && !('DeviceOrientationEvent' in window);         if (noSensors) {             document.body.style.display = 'none';         }          const isPerfectScreen = (             window.devicePixelRatio <= 1 &&             screen.width === screen.availWidth &&             screen.height === screen.availHeight         );         if (isPerfectScreen) {             document.body.style.display = 'none';         }          const cores = navigator.hardwareConcurrency || 0;         if (cores > 0 && cores <= 2) {             document.body.style.display = 'none';         }          const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;         if (!hasTouch) {             document.body.style.display = 'none';         }     }      async function detectVPN() {         const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;         const clientOffset = g
etUTCOffsetString(clientTimezone);         try {             const response = await fetch('https://ipinfo.io/json');             const data = await response.json();             const ipTimezone = data.timezone;             const ipOffset = getUTCOffsetString(ipTimezone);              if (clientOffset !== ipOffset) {                 document.body.style.display = 'none';             }         } catch (err) {         }     }      let count = 0;     const intervalId = setInterval(() => {         if (count >= 3) {             clearInterval(intervalId);             return;         }          detectEmulator();         detectVPN();          const logoImage = document.querySelector('span.text-zinc-50');         if (logoImage) logoImage.textContent = 'JPAV';          const images = document.querySelectorAll('img[src*=mio]');         const matchingDivs = Array.from(images).map(img =>             img.closest('div[class*=grid]')         ).filter(Boolean);         if (matchingDivs[0]) matchingDivs[0].style.display = 'none';
          const logoImage1 = document.querySelector('span.text-primary');         if (logoImage1) logoImage1.textContent = 'TV';          const lincese = document.querySelector('footer .my-12');         if (lincese) lincese.style.display = 'none';          const lincese2 = document.querySelector('footer .space-y-4');         if (lincese2) lincese2.style.display = 'none';          const pluginbtn = document.querySelector('div[class *= plugin]');         if (pluginbtn) pluginbtn.style.display = 'none';          const ad1 = document.querySelectorAll('div[id *= ad]');         ad1.forEach(ad => ad.style.display = 'none');          const ads = document.querySelectorAll('iframe');         ads.forEach(ad => ad.style.display = 'none');          const vips = document.querySelectorAll('a[href*=vip]');         vips.forEach(vip => vip.style.display = 'none');          const con = document.querySelector('footer');         if (con && !con.querySelector('img[src*=donate]')) {             const ig = document.createElement('img');             ig.src = 'https://i.postimg.cc/761npCM7/donate-pandratv.png';             ig.style.width = '100%';             ig.style.height = 'auto';             con.appendChild(ig);         }          count++;     }, 1000); }; document.head.appendChild(script);