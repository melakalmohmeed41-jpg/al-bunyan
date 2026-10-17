console.log("Al-Bunyan website loaded");

const phone = "9647811138601"; // 9647811138601

let products = [];

fetch("products.json")
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
  list.forEach(function (product) {
  
    const box = document.createElement("div");
    box.className = "product";

    const message = encodeURIComponent("اريد طلب: " + product.name);

    box.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>السعر ${product.price} دينار</p>
      <a class="order-btn" href="https://wa.me/${phone}?text=${message}" target="_blank">اطلب الان</a>
    `;

    container.appendChild(box);
  });
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
  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
document.querySelectorAll("#categories button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    selectedCategory = btn.dataset.category;
    applyFilters();
  });
});