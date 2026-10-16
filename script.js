console.log("Al-Bunyan website loaded");

const phone = "964XXXXXXXXXX"; // 9647811138601

const products = [
  { id: 1, name: "سلك كهربائي 2.5مم", description: "سلك نحاسي عالي الجودة", price: 5000 },
  { id: 2, name: "مفتاح انارة مزدوج", description: "مفتاح انارة بلاستيكي متين", price: 3000 },
  { id: 3, name: "قاطع كهربائي 20 امبير", description: "قاطع اوتوماتيكي يحمي الدائرة", price: 7500 },
  { id: 4, name: "لمبة LED 12 واط", description: "إنارة موفرة للطاقة", price: 2500 }
];

function renderProducts(list) {
  const container = document.getElementById("products-container");
  container.innerHTML = "<h2>منتجاتنا</h2>";

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

renderProducts(products);

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const text = searchInput.value.trim();
  const filtered = products.filter(function (product) {
    return product.name.includes(text);
  });
  renderProducts(filtered);
});