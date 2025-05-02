(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await sleep(2000);
  let runCount = 0;
let maxRuns = 3;

const intervalId = setInterval(() => {
  const hasVideo = document.querySelector('video') !== null;

  if (hasVideo) {
    if (runCount < maxRuns) {
      modifyPage();
      runCount++;
    } else {
      clearInterval(intervalId);
    }
  } else {
    modifyPage();
  }
}, 1000);

function modifyPage() {
  var matIcons = document.querySelectorAll('mat-icon[svgicon=long_logo]');

  if (matIcons.length > 0) {
    for (let i = 0; i < 2 && i < matIcons.length; i++) {
      var matIcon = matIcons[i];

      var img = document.createElement('img');
      img.src = 'https://i.ibb.co/zhNpmJt9/kokoatv-logo.png';
      img.alt = 'KokoaTV Logo';
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.maxWidth = '50px';

      matIcon.replaceWith(img);
    }
  }

  var accounts = document.querySelectorAll('app-account');
  accounts.forEach(function(account) {
    account.style.display = 'none';
  });

  var account2 = document.querySelector('.mt-3');
  if(account2){
    account2.style.display = 'none'
  }

  var footers = document.querySelectorAll('app-footer');
  footers.forEach(function(footer) {
    footer.style.display = 'none';
  });



  var con = document.querySelector('app-user-layout');
  if (con && !con.querySelector('.donate-banner')) {
    const ig = document.createElement('img');
    ig.src = 'https://i.postimg.cc/761npCM7/donate-pandratv.png';
    ig.style.width = '100%';
    ig.style.height = 'auto';
    ig.className = 'donate-banner';

    con.appendChild(ig);
  }
}
  return 'done';
})();