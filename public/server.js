// public/server.js
const express = require('express');
const app = express();
const port = 5000;

// 11번가 레고 데이터 제공
app.get('/get_products', (req, res) => {
    const products = require('./11st_lego_products.json');  // JSON 데이터 가져오기
    res.json(products);  // 데이터를 JSON 형태로 응답
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
