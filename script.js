console.log("Al-Bunyan website loaded");
const products = [
  { id: 1, name: "سلك كهربائي 2.5مم", description: "سلك نحاسي عالي الجودة", price: 5000 },
  { id: 2, name: "مفتاح انارة مزدوج", description: "مفتاح انارة بلاستيكي متين", price: 3000 },
  { id: 3, name: "قاطع كهربائي 20 امبير", description: "قاطع اوتوماتيكي يحمي الدائرة", price: 7500 },
  { id: 4, name: "لمبة LED 12 واط", description: "إنارة موفرة للطاقة", price: 2500 }
];

console.log(products);
function renderProducts() {
  const container = document.getElementById("products-container");

  products.forEach(function (product) {
    const box = document.createElement("div");
    box.className = "product";

    box.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>السعر ${product.price} دينار</p>
      <button>اطلب الان</button>
    `;

    container.appendChild(box);
  });
}

renderProducts();

console.log(products.length);