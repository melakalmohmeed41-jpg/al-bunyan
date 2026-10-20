const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("مرحبا من سيرفر البنيان");
});
const fs = require("fs");
const path = require("path");
const db = require("./db");

app.get("/api/products", function (req, res) {
    const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});

