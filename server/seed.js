const db = require('./db');
const products = require('../products.json');
const insert = db.prepare('INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)');
for (const p of products) {
  insert.run(p.name, p.description, p.price, p.category);
} console.log('تمت إضافة', products.length, 'منتجات');

