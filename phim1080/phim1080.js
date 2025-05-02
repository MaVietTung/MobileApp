var logoImages = document.querySelectorAll('.logo img');

for(logoImage of logoImages){
logoImage.src = 'https://i.ibb.co/NYn04bY/phim1080-logo.jpg';
logoImage.style.width = '50px';
logoImage.style.height = '50px';
}

var notification = document.querySelector('.notification');
if(notification){
    notification.style.display = 'none';
}

var rophim = document.querySelector('img[src*=rophim]');
if(rophim){
    rophim.style.display = 'none';
}

var rophim2 = document.querySelector('.buttons a[href*=rophim]');
if(rophim2){
    rophim2.style.display = 'none';
}

var footer = document.querySelector('#footer');

if(footer){
    footer.style.display = 'none';
}

var comment = document.querySelector('#comment-tab');

if(comment){
    comment.style.display = 'none';
}

var ccWarnings = document.querySelectorAll('.cc-warning');

for(ccWarning of ccWarnings){
    ccWarning.style.display = 'none';
}

var con = document.querySelector('#content');

const ig = document.createElement('img');

ig.src = 'https://i.ibb.co/YBGqpQP/donate-phim1080.png';

ig.style.width = '100%';
ig.style.height = 'auto';

con.appendChild(ig);