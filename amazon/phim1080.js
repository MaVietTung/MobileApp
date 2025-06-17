const stores = [
    { linkimg: 'https://m.media-amazon.com/images/I/31QUUyeB5lL._SX300_SY300_QL70_FMwebp_.jpg', linkproduct: 'https://amzn.to/3SWRvH4' },
    { linkimg: 'https://m.media-amazon.com/images/I/61IRxZQKIyL._SX466_.jpg', linkproduct: 'https://amzn.to/45mYYqc' },
    { linkimg: 'https://m.media-amazon.com/images/I/41LLINlLziL._SX300_SY300_QL70_FMwebp_.jpg', linkproduct: 'https://amzn.to/4e8XiCX' },
    { linkimg: 'https://m.media-amazon.com/images/I/41Mz-8+5SBL._SY300_SX300_.jpg', linkproduct: 'https://amzn.to/4jQdXfN' },
    { linkimg: 'https://m.media-amazon.com/images/I/319VhbtqxGL._SX300_SY300_QL70_FMwebp_.jpg', linkproduct: 'https://amzn.to/3FYxAV8' },
    { linkimg: 'https://m.media-amazon.com/images/I/61K6cQhw4EL._SX679_.jpg', linkproduct: 'https://amzn.to/3Tsnzmc' }
  ];
  
  // Xáo trộn và chọn N phần tử
  const shuffleAndPick = (arr, count) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  };
  
  // Render Swiper với danh sách sản phẩm
  const renderSwiper = (products) => {
    const container = document.getElementById('amazon');
    if (!container) return console.error('Không tìm thấy phần tử #amazon');
  
    const swiperEl = document.createElement('div');
    swiperEl.className = 'swiper';
    swiperEl.style.cssText = 'width:auto; margin:40px auto; position:relative';
  
    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';
    swiperEl.appendChild(wrapper);
  
    products.forEach(({ linkimg, linkproduct }) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.style.position = 'relative';
  
      slide.innerHTML = `
        <a href="${linkproduct}" target="_blank">
          <img src="${linkimg}" style="width:100%; border-radius:10px;" />
        </a>
        <button class="copy-btn" data-link="${linkproduct}"
          style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; border: none; border-radius: 8px; background-color: white; color: black; font-weight: bold; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          🔗 Link
        </button>
      `;
      wrapper.appendChild(slide);
    });
  
    ['swiper-pagination', 'swiper-button-prev', 'swiper-button-next'].forEach(cls => {
      const div = document.createElement('div');
      div.className = cls;
      swiperEl.appendChild(div);
    });
  
    container.appendChild(swiperEl);
  
    new Swiper('.swiper', {
      loop: true,
      autoplay: { delay: 3000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  
    // Sự kiện copy
    document.addEventListener('click', e => {
      if (e.target?.classList.contains('copy-btn')) {
        const link = e.target.dataset.link;
        navigator.clipboard.writeText(link).then(() => {
          e.target.innerText = "✅ Copied!";
          setTimeout(() => e.target.innerText = "🔗 Link", 1500);
        });
      }
    });
  };
  
  // Kiểm tra IP và gọi render
  const checkClientLocationAndRender = async () => {
    const notAllowed = ["US", "IN", "IE", "SG", "PL"];
    const products = shuffleAndPick(stores, 5);
  
    try {
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();
      if (data.success && !notAllowed.includes(data.country_code)) {
        products.unshift({
          linkimg: 'https://mobile-3aj.pages.dev/jpavtv/jpavtvbanner.jpg',
          linkproduct: 'https://play.google.com/store/apps/details?id=com.mvtsoftware.jpavtv'
        });
      }
    } catch (err) {
      console.error("Lỗi khi kiểm tra IP:", err);
    }
  
    renderSwiper(products);
  };
  
  // Tải Swiper CSS
  const loadCss = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  
  // Tải JS và callback sau khi load xong
  const loadScript = (src, callback) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  };
  
  // Khởi chạy
  loadCss('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', checkClientLocationAndRender);
  