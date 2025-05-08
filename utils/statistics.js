// utils/statistics.js

export async function getHotColdNumbers(url = "/lotto_history.json") {
  const res = await fetch(url);
  const data = await res.json();

  const freq = Array(46).fill(0); // 1~45 번호별 빈도 초기화

  data.forEach(draw => {
    draw.numbers.forEach(n => freq[n]++);
  });

  const numberFreq = freq
    .map((count, num) => ({ num, count }))
    .slice(1); // 0번 제외, 1~45만

  numberFreq.sort((a, b) => b.count - a.count);

  const hot = numberFreq.slice(0, 10).map(e => e.num);      // 상위 10개
  const cold = numberFreq.slice(-10).map(e => e.num);       // 하위 10개

  return { hot, cold };
}
