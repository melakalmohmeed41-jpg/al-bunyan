const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('shop.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT
  )
`);
module.exports = db;