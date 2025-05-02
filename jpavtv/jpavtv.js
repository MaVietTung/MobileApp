var logoImage = document.querySelector('span.text-zinc-50');
if(logoImage){
    logoImage.textContent = 'JPAV';
}

const images = document.querySelectorAll('img[src*=mio]');

const matchingDivs = Array.from(images).map(img => {
  return img.closest('div[class*=grid]');
}).filter(Boolean);

if(matchingDivs[0]){
    matchingDivs[0].style.display = 'none';
}

var logoImage1 = document.querySelector('span.text-primary');
if(logoImage1){
    logoImage1.textContent = 'TV';
}
var lincese = document.querySelector('footer .my-12');
if(lincese){
    lincese.style.display = 'none';
}
var lincese2 = document.querySelector('footer .space-y-4');
if(lincese2){
    lincese2.style.display = 'none';
}   
var pluginbtn = document.querySelector('div[class *= plugin]');
if(pluginbtn){
    pluginbtn.style.display = 'none';         
}
var ad1 = document.querySelector('div[id *= ad]');
if(ad1){
    ad1.style.display = 'none';          
}
var ads = document.querySelectorAll('iframe');
for(let ad of ads){
    ad.style.display = 'none';           
}
var vips = document.querySelectorAll('a[href*=vip]');
for(let vip of vips){
    vip.style.display = 'none';     
}
var con = document.querySelector('footer');

const ig = document.createElement('img');

ig.src = 'https://i.postimg.cc/761npCM7/donate-pandratv.png';

ig.style.width = '100%';
ig.style.height = 'auto';

con.appendChild(ig);