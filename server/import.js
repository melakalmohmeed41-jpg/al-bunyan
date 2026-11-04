const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const db = require("./db");

const text = fs.readFileSync(path.join(__dirname, "products-import.csv"), "utf8");

const rows = parse(text, {
  columns: true,
  bom: true,
  skip_empty_lines: true,
  delimiter: [",", ";"],
  trim: true
});
const errors = [];
const counts = {};

rows.forEach(function (row, i) {
  const line = i + 2;
  if (!row.name) {
    errors.push("سطر " + line + ": الاسم فاضي");
  }
  const price = Number(row.price);
  if (!row.price || isNaN(price) || price <= 0) {
    errors.push("سطر " + line + ": السعر غلط (" + row.price + ")");
  }
  counts[row.category] = (counts[row.category] || 0) + 1;
});

console.log("عدد الصفوف:", rows.length);
console.log("التصنيفات:", counts);
console.log("عدد الأخطاء:", errors.length);
errors.forEach(function (e) {
  console.log(e);
});
if (errors.length > 0) {
  console.log("وقّفت: صلّح الأخطاء أول.");
  process.exit(1);
}

if (!process.argv.includes("--save")) {
  console.log("هذي تجربة فقط، ما انكتب شي. للحفظ شغّل: node import.js --save");
  process.exit(0);
}

const exists = db.prepare("SELECT id FROM products WHERE name = ?");
const insert = db.prepare(
  "INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)"
);

let added = 0;
let skipped = 0;

db.exec("BEGIN");
try {
  rows.forEach(function (row) {
    if (exists.get(row.name)) {
      skipped++;
      return;
    }
    insert.run(
      row.name,
      row.description || null,
      Number(row.price),
      row.category || null,
      row.image || null
    );
    added++;
  });
  db.exec("COMMIT");
} catch (err) {
  db.exec("ROLLBACK");
  console.log("صار خطأ، ما انحفظ شي:", err.message);
  process.exit(1);
}

console.log("انضاف:", added, "| تخطى (موجود):", skipped);