const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.get('/get_products', (req, res) => {
  const products = require('./11st_lego_products.json');  // JSON 파일 경로
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
