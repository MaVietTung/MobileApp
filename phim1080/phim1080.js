var logoImages = document.querySelectorAll('.logo img')
for(logoImage of logoImages){
logoImage.src = "https://i.ibb.co/NYn04bY/phim1080-logo.jpg"
logoImage.style.width = '50px'
logoImage.style.height = '50px'
}

var footer = document.querySelector('#footer')
if(footer){
    footer.style.display = 'none'
}

var comment = document.querySelector('#comment-tab')
if(comment){
    comment.style.display = 'none'
}

var ccWarnings = document.querySelectorAll('.cc-warning')
for(ccWarning of ccWarnings){
    ccWarning.style.display = 'none'
}