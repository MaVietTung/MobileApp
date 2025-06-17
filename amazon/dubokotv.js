var stores = [ {
    linkimg: 'https://m.media-amazon.com/images/I/61BJypg9XsL._AC_SX679_.jpg',
    linkproduct: 'https://amzn.to/3TcViQJ'
  },
  {
    linkimg: 'https://m.media-amazon.com/images/I/51WyZ0rPveL._AC_SX679_.jpg',
    linkproduct: 'https://amzn.to/3FCtd24'
  },
  {
    linkimg: 'https://m.media-amazon.com/images/I/71icKMNl4OS._AC_SX679_.jpg',
    linkproduct: 'https://amzn.to/3FVPLLc'
  },
  {
    linkimg: 'https://m.media-amazon.com/images/I/711PoknqL6S._AC_SX679_.jpg',
    linkproduct: 'https://amzn.to/441JRjs'
  },
  {
    linkimg: 'https://m.media-amazon.com/images/I/71PA07Cw6sL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    linkproduct: 'https://amzn.to/3ZyuKge'
  }
  ,
  {
    linkimg: 'https://m.media-amazon.com/images/I/31RWzzZ8nXL._SX300_SY300_QL70_FMwebp_.jpg',
    linkproduct: 'https://amzn.to/4kZq1fQ'
  }];
  
  // Hàm xáo trộn và chọn n phần tử
  function shuffleAndPick(arr, count) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy.slice(0, count);
  }
  
  // Hàm tạo Swiper sau khi có products
  function renderSwiper(products) {
    const swiperEl = document.createElement('div');
    swiperEl.className = 'swiper';
    swiperEl.style.width = 'auto';
    swiperEl.style.margin = '40px auto';
    swiperEl.style.position = 'relative';
  
    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';
    swiperEl.appendChild(wrapper);
  
    products.forEach((p) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.style.position = 'relative';
  
      slide.innerHTML = `
        <a href="${p.linkproduct}" target="_blank">
          <img src="${p.linkimg}" style="width:100%; border-radius:10px;" />
        </a>
        <button class="copy-btn" data-link="${p.linkproduct}"
          style="position: absolute; top: 0px; left: 10px; padding: 6px 12px; border: none; border-radius: 8px; background-color: white; color: black; font-weight: bold; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          🔗 Link
        </button>
      `;
      wrapper.appendChild(slide);
    });
  
    swiperEl.appendChild(document.createElement('div')).className = 'swiper-pagination';
    swiperEl.appendChild(document.createElement('div')).className = 'swiper-button-prev';
    swiperEl.appendChild(document.createElement('div')).className = 'swiper-button-next';
  
    const container = document.getElementById('amazon');
    if (container) {
      container.appendChild(swiperEl);
    } else {
      console.error('Không tìm thấy phần tử #amazon');
    }
  
    new Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 3000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  
    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('copy-btn')) {
        const link = e.target.getAttribute('data-link');
        navigator.clipboard.writeText(link).then(() => {
          e.target.innerText = "✅ Copied!";
          setTimeout(() => e.target.innerText = "🔗 Link", 1500);
        });
      }
    });
  }
  
  // Hàm xử lý IP và gọi render
  async function checkClientLocationAndRender() {
    const notallowedCountryCodes = ["US", "IN", "IE", "SG", "PL"];
    const products = shuffleAndPick(stores, 5);
  
    try {
      const response = await fetch("https://ipwho.is/");
      const data = await response.json();
  
      if (data.success) {
        const code = data.country_code;
        if (!notallowedCountryCodes.includes(code)) {
          products.push({
            linkimg: 'https://mobile-3aj.pages.dev/jpavtv/jpavtvbanner.jpg',
            linkproduct: 'https://play.google.com/store/apps/details?id=com.mvtsoftware.jpavtv'
          });
        }
      } else {
        console.warn('Không lấy được thông tin quốc gia:', data.message);
      }
    } catch (e) {
      console.error("Lỗi khi kiểm tra IP:", e);
    }
  
    renderSwiper(products);
  }
  
  // Load Swiper CSS
  const swiperCss = document.createElement('link');
  swiperCss.rel = 'stylesheet';
  swiperCss.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
  document.head.appendChild(swiperCss);
  
  // Load Swiper JS và gọi hàm chính
  const swiperJs = document.createElement('script');
  swiperJs.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
  swiperJs.onload = () => {
    checkClientLocationAndRender();
  };
  document.body.appendChild(swiperJs);
  