
// 내부에 hotNumbers, coldNumbers 직접 정의 (lottoStats.js 필요 없음)
const ranges = {
  "1-9": Array.from({ length: 9 }, (_, i) => i + 1),
  "10-19": Array.from({ length: 10 }, (_, i) => i + 10),
  "20-29": Array.from({ length: 10 }, (_, i) => i + 20),
  "30-39": Array.from({ length: 10 }, (_, i) => i + 30),
  "40-45": Array.from({ length: 6 }, (_, i) => i + 40),
};

const hotNumbers = [33, 34, 37, 40, 12, 45, 13, 14, 18, 27]; // 상위 10개 핫 넘버 (직접 포함)
const coldNumbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(n => !hotNumbers.includes(n));

function generateSmartLottoSet(count = 5, mode = "hot", fixed = []) {
  const pool = mode === "hot" ? hotNumbers.concat(coldNumbers) : coldNumbers.concat(hotNumbers);
  const results = [];

  while (results.length < count) {
    const pick = new Set([...fixed]);

    for (const group of Object.values(ranges)) {
      const candidates = group.filter((n) => pool.includes(n) && !pick.has(n));
      if (candidates.length) {
        pick.add(candidates[Math.floor(Math.random() * candidates.length)]);
      }
      if (pick.size >= 6) break;
    }

    for (const n of pool) {
      if (pick.size < 6) pick.add(n);
    }

    const sorted = Array.from(pick).sort((a, b) => a - b);

    let has3Sequence = false;
    for (let i = 0; i < sorted.length - 2; i++) {
      if (
        sorted[i + 1] - sorted[i] === 1 &&
        sorted[i + 2] - sorted[i + 1] === 1
      ) {
        has3Sequence = true;
        break;
      }
    }

    if (!has3Sequence) results.push(sorted);
  }

  return {
    games: results,
    highlight: hotNumbers
  };
}

export { generateSmartLottoSet };
