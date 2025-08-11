/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv.js';
 document.head.appendChild(script);
 */
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

function createAmazonBanner() {
  // Kiểm tra nếu chưa có #amazon
  let amazonDiv = document.querySelector('#ads');
  if (!amazonDiv && location.href == "https://popcornmovies.org/") { //&& location.href === "https://flickermini.pages.dev/"
    amazonDiv = document.createElement('div');
    amazonDiv.id = 'ads';
    amazonDiv.style.overflow = 'hidden';
    document.body.appendChild(amazonDiv);
    // Tạo script và load JS từ URL
    var script = document.createElement('script');
    script.src = 'https://mobile-3aj.pages.dev/ads/kokoatv.js';
    script.async = true;
    document.body.appendChild(script);
  }
}

const intervalId = setInterval(() => {
  createAmazonBanner()
  // Lấy tất cả các phần tử trên trang
  const allElements = document.getElementsByTagName('*');

  // Lặp qua từng phần tử
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];

    // Chỉ xem xét các phần tử con trực tiếp là văn bản
    for (let j = 0; j < element.childNodes.length; j++) {
      const node = element.childNodes[j];

      // Kiểm tra xem nút có phải là một nút văn bản và nội dung có chứa "Flicker" không
      if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('popcorn')) {
        node.nodeValue = 'Kokoatv';
      }
    }
  }
  var imgAll = document.querySelectorAll('img[src*=logo], img[src*= Popcorn]');
  for (let img of imgAll) {
    img.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
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

  var buttonHome3 = document.querySelectorAll('.mw-buttons a')
  for (let button of buttonHome3) {
    button.childNodes[0].nodeValue = 'Go to Home ';
  }

  (function() {
    // Hàm xử lý và tải lại iframe
    function processAndReloadIframe(iframe) {
        // Chỉ xử lý nếu nó có thuộc tính sandbox
        if (iframe.hasAttribute('sandbox')) {
            console.log('Found iframe with sandbox. Removing it and reloading...');
            
            // Lấy src hiện tại
            var currentSrc = iframe.src;
            
            // Xóa thuộc tính sandbox
            iframe.removeAttribute('sandbox');
            
            // Đặt lại src để buộc iframe tải lại với quyền mới
            // Cần kiểm tra để tránh reload vô hạn nếu src là about:blank
            if (currentSrc && currentSrc !== 'about:blank') {
                iframe.src = currentSrc;
            }
        }
    }

    // Hàm để quét các iframe trong một phần tử
    function scanForIframes(element) {
        // Tìm tất cả iframe bên trong phần tử này
        let iframes = element.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            processAndReloadIframe(iframes[i]);
        }
        // Kiểm tra chính phần tử đó nếu nó là iframe
        if (element.tagName === 'IFRAME') {
            processAndReloadIframe(element);
        }
    }

    // Sử dụng MutationObserver để theo dõi các thay đổi
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                // Node.ELEMENT_NODE là 1
                if (node.nodeType === 1) { 
                    scanForIframes(node);
                }
            });
        });
    });

    // Bắt đầu quan sát
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Chạy quét một lần cho các iframe đã có sẵn khi script được inject
    console.log('Initial scan for existing iframes...');
    scanForIframes(document.documentElement);
})();


  /*var ads = document.querySelectorAll('iframe');
  for (let ad of ads) {
      try {
          if (!document.querySelector('#iframe-embed')) {
              var spans = ad.contentWindow.document.querySelectorAll('span');
              for (let span of spans) {
                  span.click();
              }
          }
      } catch (e) { }
  }*/

  var apkLink = document.querySelector('a[href*=apk]');
  if (apkLink) {
    apkLink.style.display = 'none';
  }

  /*var shareCloseButton = document.querySelector('#modalshare .modal-header button');
  if (shareCloseButton) {
      shareCloseButton.click();
  }*/

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

  var footerAll2 = document.querySelectorAll('footer');
  for (let footer of footerAll2) {
    footer.style.display = 'none';
  }

  /*var con = document.querySelector('#content');
  if (con && !con.querySelector('.donate-banner')) {
    const ig = document.createElement('img');
    ig.src = 'https://mobile-3aj.pages.dev/kokoatv/donate-kokoatv.png';
    ig.style.width = '100%';
    ig.style.height = 'auto';
    ig.className = 'donate-banner';

    con.appendChild(ig);
  }*/

  runCount++;
  if (runCount >= 3) {
    clearInterval(intervalId);
  }
}, 1000);

/*(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
  }

  await sleep(2000);
  let runCount = 0;
  let maxRuns = 5;
  let previousUrl = window.location.href;
  let intervalId;
  saveCurrentDateToLocalStorage();


  function startInterval() {
    intervalId = setInterval(() => {
      if (runCount < maxRuns) {
        modifyPage();
        runCount++;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  startInterval();

  document.addEventListener('click', function () {
    let currentUrl = window.location.href;

    if (currentUrl !== previousUrl) {
      previousUrl = currentUrl;
      if (!history.state || history.state.url !== currentUrl) {
        window.history.pushState({ url: currentUrl }, '', currentUrl);
      }
      clearInterval(intervalId);
      runCount = 0;
      startInterval();
    }
  });

  function locationAction() {
    fetch('https://ipwho.is/')
      .then(response => response.json())
      .then(data => {
        const countryCode = data.country_code; // Ví dụ: 'IN' cho Ấn Độ, 'SG' cho Singapore

        if (countryCode === 'SG' || countryCode == "IN" || countryCode == "PK") {
          document.body.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
      });
  }


  function modifyPage() {
    //locationAction()
    var matIcons = document.querySelectorAll('mat-icon[svgicon=long_logo]');

    if (matIcons.length > 0) {
      for (let i = 0; i < 2 && i < matIcons.length; i++) {
        var matIcon = matIcons[i];

        var img = document.createElement('img');
        img.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
        img.alt = 'KokoaTV Logo';
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.maxWidth = '50px';

        matIcon.replaceWith(img);
        img.addEventListener('click', function () {
          window.location.href = '/';
        });
      }
    }

    var matAction = document.querySelector('mat-card-actions');
    if (matAction) {
      matAction.style.setProperty('display', 'none', 'important');
    }

    var ads = document.querySelectorAll('iframe');
    ads.forEach(function (ad) {
      ad.style.display = 'none';
    });

    var accounts = document.querySelectorAll('app-account');
    accounts.forEach(function (account) {
      account.style.display = 'none';
    });

    var account2 = document.querySelector('.mt-3');
    if (account2) {
      account2.style.display = 'none';
    }

    var footers = document.querySelectorAll('app-footer');
    footers.forEach(function (footer) {
      footer.style.display = 'none';
    });

    var con = document.querySelector('app-user-layout');
    if (con && !con.querySelector('.donate-banner')) {
      const ig = document.createElement('img');
      ig.src = 'https://mobile-3aj.pages.dev/kokoatv/donate-kokoatv.png';
      ig.style.width = '100%';
      ig.style.height = 'auto';
      ig.className = 'donate-banner';

      con.appendChild(ig);
    }
  }

  return 'done';
})();*/
/*(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function saveCurrentDateToLocalStorage() {
    const now = new Date();
    const formattedDate = now.toISOString();
    localStorage.setItem('lasttime', formattedDate);
  }

  function getIframeDocument() {
    const iframe = document.querySelector('iframe'); // Adjust selector if needed
    if (iframe && iframe.contentDocument) {
      return iframe.contentDocument;
    }
    return null;
  }

  await sleep(2000);
  let runCount = 0;
  let maxRuns = 5;
  let intervalId;
  let previousUrl = window.location.href;
  saveCurrentDateToLocalStorage();

  function startInterval() {
    intervalId = setInterval(() => {
      const iframeDoc = getIframeDocument();
      if (!iframeDoc) return;

      const hasVideo = iframeDoc.querySelector('video') !== null;

      if (hasVideo) {
        if (runCount < maxRuns) {
          modifyPage(iframeDoc);
          runCount++;
        } else {
          clearInterval(intervalId);
        }
      } else {
        modifyPage(iframeDoc);
      }
    }, 1000);
  }

  document.addEventListener('click', function () {
    let currentUrl = window.location.href;

    if (currentUrl !== previousUrl) {
      previousUrl = currentUrl;
      if (!history.state || history.state.url !== currentUrl) {
        window.history.pushState({ url: currentUrl }, '', currentUrl);
      }
      clearInterval(intervalId);
      runCount = 0;
      startInterval();
    }
  });

  function modifyPage(doc) {
    var matIcons = doc.querySelectorAll('mat-icon[svgicon=long_logo]');
    for (let i = 0; i < 2 && i < matIcons.length; i++) {
      var matIcon = matIcons[i];

      var img = document.createElement('img');
      img.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
      img.alt = 'KokoaTV Logo';
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.maxWidth = '50px';

      matIcon.replaceWith(img);
      img.addEventListener('click', function () {
        doc.location.href = '/';
      });
    }

    var matAction = doc.querySelector('mat-card-actions');
    if (matAction) matAction.style.setProperty('display', 'none', 'important');

    var ads = doc.querySelectorAll('iframe');
    ads.forEach(ad => ad.style.display = 'none');

    var accounts = doc.querySelectorAll('app-account');
    accounts.forEach(account => account.style.display = 'none');

    var account2 = doc.querySelector('.mt-3');
    if (account2) account2.style.display = 'none';

    var footers = doc.querySelectorAll('app-footer');
    footers.forEach(footer => footer.style.display = 'none');

    var con = doc.querySelector('app-user-layout');
    if (con && !con.querySelector('.donate-banner')) {
      const ig = doc.createElement('img');
      ig.src = 'https://mobile-3aj.pages.dev/kokoatv/donate-kokoatv.png';
      ig.style.width = '100%';
      ig.style.height = 'auto';
      ig.className = 'donate-banner';

      con.appendChild(ig);
    }
  }

  startInterval();
})();

/*var logos = document.querySelectorAll('[class*=logo] img[src*=kisskh]');
for (var logo of logos) {
  logo.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv-logo.png';
  logo.alt = 'KokoaTV Logo';
  logo.style.width = '50px';
  logo.style.height = '50px';
  logo.style.maxWidth = '50px';
}
var ad = document.querySelector('[dir*=ltr]')
if (ad) {
  ad.style.display = 'none';
}
var telegram = document.querySelector('.widget_text.section');
if (telegram) {
  telegram.style.display = 'none';
}
var footer = document.querySelector('#footer');
if (footer) {
  footer.style.display = 'none';
}
var topmobile = document.querySelector('.topmobile')
if(topmobile){
  topmobile.style.display = 'none';
}
var con = document.querySelector('#content');
if (con && !con.querySelector('.donate-banner')) {
  const ig = document.createElement('img');
  ig.src = 'https://mobile-3aj.pages.dev/kokoatv/donate-kokoatv.png';
  ig.style.width = '100%';
  ig.style.height = 'auto';
  ig.className = 'donate-banner';
  con.appendChild(ig);
}
if (con && !con.querySelector('#AmazonProduct')) {
  const udiv = document.createElement('div');
  udiv.style.width = '100%';
  udiv.style.height = 'auto';
  udiv.id = 'AmazonProduct';
  con.appendChild(udiv);
}*/



