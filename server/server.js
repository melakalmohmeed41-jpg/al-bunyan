const express = require("express");
const app = express();const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("مرحبا من سيرفر البنيان");
});
const fs = require("fs");
const path = require("path");

app.get("/api/products", function (req, res) {
  const filePath = path.join(__dirname, "..", "products.json");
  const data = fs.readFileSync(filePath, "utf8");
  res.json(JSON.parse(data));
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});

