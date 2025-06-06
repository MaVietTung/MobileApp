/**
 var script = document.createElement('script');
 script.src = 'https://mobile-3aj.pages.dev/kokoatv/kokoatv.js';
 document.head.appendChild(script);
 */
(async () => {
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

  function modifyPage() {

    fetch("https://ipwho.is/")
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          return;
        }

        const country = data.country_code;
        if (country === "IN") {
          document.body.style.display = 'none';
        } else if (country === "SG") {
          document.body.style.display = 'none';
        }
        else {
          console.log("Người dùng từ nơi khác:", country);
        }
      })
      .catch(err => console.error("Lỗi mạng:", err));
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
})();
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



