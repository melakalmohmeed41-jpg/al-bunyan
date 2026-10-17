const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("مرحبا من سيرفر البنيان");
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});

