
const ranges = {
  "1-9": Array.from({ length: 9 }, (_, i) => i + 1),
  "10-19": Array.from({ length: 10 }, (_, i) => i + 10),
  "20-29": Array.from({ length: 10 }, (_, i) => i + 20),
  "30-39": Array.from({ length: 10 }, (_, i) => i + 30),
  "40-45": Array.from({ length: 6 }, (_, i) => i + 40),
};

const hotNumbers = [33, 34, 37, 40, 12, 45, 13, 14, 18, 27];
const coldNumbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(n => !hotNumbers.includes(n));

function getRandomElements(array, count, exclude = []) {
  const filtered = array.filter((n) => !exclude.includes(n));
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSmartLottoSet(count = 5, mode = "hot", fixed = []) {
  const results = [];
  const pool = mode === "hot"
    ? hotNumbers.concat(coldNumbers)
    : coldNumbers.concat(hotNumbers);

  while (results.length < count) {
    const pick = new Set([...fixed]);

    if (mode === "random") {
      const all = Array.from({ length: 45 }, (_, i) => i + 1).filter(n => !pick.includes(n));
      getRandomElements(all, 6 - pick.size).forEach(n => pick.add(n));
    } else {
      const rangeKeys = Object.keys(ranges).sort(() => 0.5 - Math.random());
      for (let i = 0; i < rangeKeys.length && pick.size < 6; i++) {
        const group = ranges[rangeKeys[i]];
        const candidates = group.filter((n) => pool.includes(n) && !pick.has(n));
        const selected = getRandomElements(candidates, 1, [...pick]);
        if (selected.length) pick.add(selected[0]);
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
      if (has3Sequence) continue;
    }

    results.push(Array.from(pick).sort((a, b) => a - b));
  }

  return {
    games: results,
    highlight: hotNumbers
  };
}

export { generateSmartLottoSet };
export default LottoPage;
