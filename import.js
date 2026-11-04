const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const text = fs.readFileSync(path.join(__dirname, "products-import.csv"), "utf8");

const rows = parse(text, {
  columns: true,
  bom: true,
  skip_empty_lines: true,
  delimiter: [",", ";"],
  trim: true
});

console.log("عدد الصفوف:", rows.length);
console.log(rows[0]);
