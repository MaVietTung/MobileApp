// Tracking ID của bạn
const trackingID = "020099008110-20";

// Danh sách sản phẩm Amazon
const asinList = [
  {
    asin: "B09B8V8MQL",
    title: "Echo Dot (5th Gen, 2022)",
    image: "https://m.media-amazon.com/images/I/71yRY8YlAbL._AC_SY450_.jpg"
  },
  {
    asin: "B07ZZWZG5L",
    title: "Fire TV Stick with Alexa",
    image: "https://m.media-amazon.com/images/I/71Wt1thqZEL._AC_SY300_SX300_.jpg"
  },
  {
    asin: "B08KTZ8249",
    title: "Kindle Paperwhite (8GB)",
    image: "https://m.media-amazon.com/images/I/71FWKtSIYUL._AC_SX679_.jpg"
  }
];

// Tạo link affiliate từ ASIN
function generateAffiliateLink(asin) {
  return `https://www.amazon.com/dp/${asin}?tag=${trackingID}`;
}

// Tạo banner trong div có ID 'AmazonProduct'
function createAmazonBanner() {
  const container = document.getElementById("AmazonProduct");
  if (!container) return;

  // Thêm CSS chỉ 1 lần
  if (!document.getElementById("amazonBannerStyle")) {
    const style = document.createElement("style");
    style.id = "amazonBannerStyle";
    style.textContent = `
      .carousel-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 16px;
        padding: 20px 0;
      }
      .amazon-product-card {
        flex: 0 0 auto;
        min-width: 300px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        scroll-snap-align: start;
        position: relative;
      }
      .amazon-product-card img {
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: block;
      }
      .btn-copy {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0,0,0,0.7);
        color: #fff;
        border: none;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
      }
      .btn-copy:hover {
        background: #ff9900;
      }
      .amazon-product-card h4 {
        font-size: 15px;
        margin: 10px;
      }
      .btn-view {
        display: block;
        margin: 0 10px 10px;
        padding: 8px;
        background: #ff9900;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 5px;
      }
      .btn-view:hover {
        background: #cc7a00;
      }
    `;
    document.head.appendChild(style);
  }

  const carousel = document.createElement("div");
  carousel.className = "carousel-container";

  asinList.forEach(item => {
    const link = generateAffiliateLink(item.asin);

    const card = document.createElement("div");
    card.className = "amazon-product-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <button class="btn-copy">📋 Copy Link</button>
      <h4>${item.title}</h4>
      <a href="${link}" target="_blank" class="btn-view">🔗 Xem trên Amazon</a>
    `;

    card.querySelector(".btn-copy").addEventListener("click", () => {
      navigator.clipboard.writeText(link)
        .then(() => alert("✅ Link đã được copy!"))
        .catch(() => alert("❌ Không thể copy link."));
    });

    carousel.appendChild(card);
  });

  container.appendChild(carousel);
}

// Quan sát xem #AmazonProduct có xuất hiện chưa
const observer = new MutationObserver(() => {
  const container = document.getElementById("AmazonProduct");
  if (container && !container.dataset.loaded) {
    container.dataset.loaded = "true";
    createAmazonBanner();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
