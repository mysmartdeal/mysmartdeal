const express = require('express');
const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');
const app = express();
const PORT = process.env.PORT || 5000;

// 11st 상품 크롤링 함수
async function fetchDataFrom11st() {
  try {
    const response = await axios.get('https://shop.11st.co.kr/stores/201220/category?isCategory=true&sortCd=IM');
    // 크롤링한 데이터를 JSON 형식으로 저장
    fs.writeFileSync('./public/11st_lego_products.json', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching 11st data:', error);
  }
}

// 11st 크롤링: 매 1시간마다 실행
cron.schedule('0 * * * *', fetchDataFrom11st);

// 서버에서 JSON 파일을 클라이언트로 제공
app.get('/products', (req, res) => {
  res.sendFile(__dirname + '/public/11st_lego_products.json');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
