var img = document.querySelector('img.img-responsive.visible-xs');
if(img) {
    img.src = 'https://i.ibb.co/C7z9YM5/small-icon.png';
}
var img1 = document.querySelector('img.img-responsive.hidden-xs');
if(img1) {
    img1.src = 'https://i.ibb.co/xXtKZbD/big-icon.png';
}
var lincese = document.querySelector('div.col-pd.text-center');
if(lincese) {
    lincese.style.display = 'none';
}
var userLogin = document.querySelector('a[href="javascript:;"][onclick="Myui.User.Login();"]');
if(userLogin) {
    userLogin.style.display = 'none';
}
var rate = document.querySelector('a.btn.btn-danger');
if(rate) {
    rate.style.display = 'none';
}

var ads = document.querySelectorAll('.adsbygoogle');
for(ad of ads){
    ad.style.display = 'none'
}
var comment = document.querySelectorAll('.myui-panel-box')[2];
if(comment){
    comment.style.display = 'none'
}
var con = document.querySelector('header + .container');

const ig = document.createElement('img');

ig.src = 'https://i.postimg.cc/4x3dvMgQ/donate-dakubao-2.png';
ig.style.width = '100%';
ig.style.height = 'auto';

con.appendChild(ig);