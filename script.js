console.log("Al-Bunyan website loaded");

const phone = "9647811138601"; // 9647811138601

let products = [];
const PAGE_SIZE = 20;
let visibleCount = PAGE_SIZE;
const isLocal = location.hostname === "127.0.0.1" || location.hostname === "localhost";

const API_URL = isLocal
  ? "http://localhost:3000/api/products"
  : "products.json";

fetch(API_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data;
    renderProducts(products);
  });

function renderProducts(list) {
  const container = document.getElementById("products-container");
  container.innerHTML = "<h2>منتجاتنا</h2>";
    if (list.length === 0) {
    container.innerHTML += "<p class='no-results'>لا توجد منتجات مطابقة لبحثك</p>";
    return;
  }
    list.slice(0, visibleCount).forEach(function (product) {
    const box = document.createElement("div");
    box.className = "product";

    const message = encodeURIComponent("اريد طلب: " + product.name);
        const imageHtml = product.image
     ? `<img src="${product.image}" alt="${product.name}" onerror="this.remove()">`
      : "";

        box.innerHTML = `
      ${imageHtml}
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">السعر ${product.price} دينار</p>
      <a class="order-btn" href="https://wa.me/${phone}?text=${message}" target="_blank">اطلب الان</a>
    `;
    container.appendChild(box);
  });

  if (list.length > visibleCount) {
    const moreBtn = document.createElement("button");
    moreBtn.textContent = "عرض المزيد";
    moreBtn.className = "more-btn";
    moreBtn.addEventListener("click", function () {
      visibleCount += PAGE_SIZE;
      renderProducts(list);
    });
    container.appendChild(moreBtn);
  }
}

let selectedCategory = "الكل";

const searchInput = document.getElementById("search-input");

function applyFilters() {
  const text = searchInput.value.trim();
  const filtered = products.filter(function (product) {
    const matchesText = product.name.includes(text);
    const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory;
    return matchesText && matchesCategory;
  });
    visibleCount = PAGE_SIZE;
  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
document.querySelectorAll("#categories button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    selectedCategory = btn.dataset.category;
    applyFilters();
  });
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.getElementById("products-container").addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.src;
    lightbox.classList.add("open");
  }
});

lightbox.addEventListener("click", function () {
  lightbox.classList.remove("open");
});