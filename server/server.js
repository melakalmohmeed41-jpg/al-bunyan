const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("مرحبا من سيرفر البنيان");
});
const fs = require("fs");
const path = require("path");
const db = require("./db");
const ADMIN_KEY = process.env.ADMIN_KEY;
app.get("/api/products", function (req, res) {
    const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});
function requireAdmin(req, res, next) {
  if (!ADMIN_KEY || req.headers["x-admin-key"] !== ADMIN_KEY) {
    return res.status(401).json({ error: "غير مصرح" });
  }
  next();
}
app.post("/api/products", requireAdmin, function (req, res) {
  const { name, description, price, category } = req.body;
  const result = db
    .prepare("INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)")
    .run(name, description, price, category);
  res.status(201).json({ id: result.lastInsertRowid, name, description, price, category });
});
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});

