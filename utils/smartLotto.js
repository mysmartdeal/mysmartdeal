
const hotNumbers = [33, 34, 37, 40, 12, 45, 13, 14, 18, 27];

function getRandomElements(array, count, exclude = []) {
  const filtered = array.filter((n) => !exclude.includes(n));
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSmartLottoSet(count = 5, mode = "hot", fixed = []) {
  const results = [];
  const fullSet = Array.from({ length: 45 }, (_, i) => i + 1);
  const pool = mode === "random" ? fullSet : hotNumbers.concat(fullSet.filter(n => !hotNumbers.includes(n)));

  while (results.length < count) {
    const pick = new Set([...fixed]);

    // True random mode: pick directly from fullSet
    if (mode === "random") {
      const randoms = getRandomElements(fullSet, 6 - pick.size, [...pick]);
      randoms.forEach((n) => pick.add(n));
    } else {
      for (const n of pool) {
        if (pick.size < 6) pick.add(n);
      }
    }

    const sorted = Array.from(pick).sort((a, b) => a - b);

    // 3연속 숫자 필터
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

    results.push(sorted);
  }

  return {
    games: results,
    highlight: hotNumbers
  };
}

export { generateSmartLottoSet };
