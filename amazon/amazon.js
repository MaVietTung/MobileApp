const products = [];
const href = window.location.href;

switch (true) {
  case href.includes('missav'):
    products = [ {
      linkimg: 'https://images-na.ssl-images-amazon.com/images/I/6134gR-j5kL._AC_UL600_SR600,400_.jpg',
      linkproduct: 'https://amzn.to/3ZuQREh'
    },
    {
      linkimg: 'https://m.media-amazon.com/images/I/71taFV+bVZL._AC_SY300_SX300_.jpg',
      linkproduct: 'https://amzn.to/4l5zx0X'
    },
    {
      linkimg: 'https://m.media-amazon.com/images/I/51qiE+X+42L._AC_SX679_.jpg',
      linkproduct: 'https://amzn.to/3Zz5M09'
    },
    {
      linkimg: 'https://m.media-amazon.com/images/I/61NtcjW9VPL._AC_SX679_.jpg',
      linkproduct: 'https://amzn.to/4mYfwv7'
    },
    {
      linkimg: 'https://m.media-amazon.com/images/I/71QH9AA42ML.__AC_SX300_SY300_QL70_FMwebp_.jpg',
      linkproduct: 'https://amzn.to/45pxZKD'
    }
    ,
    {
      linkimg: 'https://m.media-amazon.com/images/I/51e52o8WhYL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
      linkproduct: 'https://amzn.to/3HGmm8o'
    }];
    break;
  default:
    break;
}


// Load Swiper CSS
const swiperCss = document.createElement('link');
swiperCss.rel = 'stylesheet';
swiperCss.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
document.head.appendChild(swiperCss);

// Load Swiper JS
const swiperJs = document.createElement('script');
swiperJs.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
swiperJs.onload = () => {
  // Tạo phần tử swiper
  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper';
  swiperEl.style.width = 'auto';
  swiperEl.style.margin = '40px auto';
  swiperEl.style.position = 'relative';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  swiperEl.appendChild(wrapper);

  // Tạo slide từ mảng products
  products.forEach((p, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.style.position = 'relative';

    slide.innerHTML = `
      <a href="${p.linkproduct}" target="_blank">
        <img src="${p.linkimg}" style="width:100%; border-radius:10px;" />
      </a>
      <button class="copy-btn" data-link="${p.linkproduct}"
        style="
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 6px 12px;
          border: none;
          border-radius: 8px;
          background-color: white;
          color: black;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">🔗 Link</button>
    `;
    wrapper.appendChild(slide);
  });

  // Navigation & pagination
  const nextBtn = document.createElement('div');
  nextBtn.className = 'swiper-button-next';
  const prevBtn = document.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination';

  swiperEl.appendChild(pagination);
  swiperEl.appendChild(prevBtn);
  swiperEl.appendChild(nextBtn);
  
  const container = document.getElementById('amazon');
  if (container) {
    container.appendChild(swiperEl);
  } else {
    console.error('Không tìm thấy phần tử #amazon');
  }

  // Khởi tạo Swiper
  new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });

  // Xử lý nút Copy Link
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('copy-btn')) {
      const link = e.target.getAttribute('data-link');
      navigator.clipboard.writeText(link).then(() => {
        e.target.innerText = "✅ Copied!";
        setTimeout(() => e.target.innerText = "🔗 Link", 1500);
      });
    }
  });
};

document.body.appendChild(swiperJs);