
import { hotNumbers } from "./lottoStats";

// Define number ranges
const ranges = {
  "1-9": Array.from({ length: 9 }, (_, i) => i + 1),
  "10-19": Array.from({ length: 10 }, (_, i) => i + 10),
  "20-29": Array.from({ length: 10 }, (_, i) => i + 20),
  "30-39": Array.from({ length: 10 }, (_, i) => i + 30),
  "40-45": Array.from({ length: 6 }, (_, i) => i + 40),
};

function generateSmartLottoSet(count = 5) {
  const results = [];

  while (results.length < count) {
    const pick = new Set();

    // 1. 구간 분포 기반으로 각 구간에서 1개씩 시도
    for (const group of Object.values(ranges)) {
      const filtered = group.filter((n) => hotNumbers.includes(n));
      if (filtered.length) {
        pick.add(filtered[Math.floor(Math.random() * filtered.length)]);
      }
      if (pick.size === 6) break;
    }

    // 2. 부족한 경우 hotNumbers에서 추가
    for (const n of hotNumbers) {
      if (pick.size < 6) pick.add(n);
    }

    const sorted = Array.from(pick).sort((a, b) => a - b);

    // 3. 연속 번호 필터: 3개 이상 연속 제거
    let hasSequence = false;
    for (let i = 0; i < sorted.length - 2; i++) {
      if (
        sorted[i + 1] - sorted[i] === 1 &&
        sorted[i + 2] - sorted[i + 1] === 1
      ) {
        hasSequence = true;
        break;
      }
    }
    if (!hasSequence) results.push(sorted);
  }

  return results;
}

export { generateSmartLottoSet };
