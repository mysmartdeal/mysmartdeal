// pages/lotto.js
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { getHotColdNumbers } from "../utils/statistics";

export default function LottoPage() {
  const [games, setGames] = useState([]);
  const [fixed, setFixed] = useState("");
  const [selectedHot, setSelectedHot] = useState([]);
  const [excludedCold, setExcludedCold] = useState([]);
  const [hot, setHot] = useState([]);
  const [cold, setCold] = useState([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("/api/lotto-images")
      .then((res) => res.json())
      .then((data) => setGallery(data.images || []));

    getHotColdNumbers().then(({ hot, cold }) => {
      setHot(hot);
      setCold(cold);
    });
  }, []);

  const toggleHotSelect = (num) => {
    setSelectedHot((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const toggleColdExclude = (num) => {
    setExcludedCold((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const getBallColor = (num) => {
    if (num <= 9) return "bg-yellow-300";
    if (num <= 19) return "bg-sky-300";
    if (num <= 29) return "bg-pink-300";
    if (num <= 39) return "bg-gray-400";
    return "bg-green-400";
  };

  const handleGenerate = async () => {
    const fixedNums = fixed
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const filteredCold = cold.filter((n) => !excludedCold.includes(n));
    const generated = [];

    for (let i = 0; i < 5; i++) {
      const pick = new Set(fixedNums);

      // Hot 번호 중 선택된 번호 랜덤 1~2개
      const hotCopy = [...selectedHot];
      while (pick.size < fixedNums.length + 2 && hotCopy.length > 0) {
        const index = Math.floor(Math.random() * hotCopy.length);
        pick.add(hotCopy.splice(index, 1)[0]);
      }

      // Cold 번호 중 1개
      while (pick.size < fixedNums.length + 3 && filteredCold.length > 0) {
        const n = filteredCold[Math.floor(Math.random() * filteredCold.length)];
        pick.add(n);
      }

      // 나머지 랜덤
      while (pick.size < 6) {
        const n = Math.floor(Math.random() * 45) + 1;
        pick.add(n);
      }

      generated.push([...pick].sort((a, b) => a - b));
    }

    setGames(generated);
    setGeneratedAt(new Date().toLocaleString("ko-KR"));
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 전략적 조합 생성기</h1>

        {/* 고정 숫자 입력 */}
        <div className="mb-4">
          <input
            type="text"
            value={fixed}
            onChange={(e) => setFixed(e.target.value)}
            placeholder="고정 숫자 (예: 7, 14)"
            className="border px-4 py-2 rounded w-64"
          />
        </div>

        {/* HOT 번호 선택 */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">🔥 포함할 HOT(자주 나온) 번호</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {hot.map((num) => (
              <button
                key={num}
                onClick={() => toggleHotSelect(num)}
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${
                  selectedHot.includes(num)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* COLD 번호 제외 */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">❄️ 제외할 COLD(자주 안나온) 번호</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {cold.map((num) => (
              <button
                key={num}
                onClick={() => toggleColdExclude(num)}
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center ${
                  excludedCold.includes(num)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition mb-4"
        >
          조합 생성
        </button>

        {generatedAt && (
          <div className="text-sm text-gray-500 mb-6">생성 일시: {generatedAt}</div>
        )}

        {games.length > 0 && (
          <div className="space-y-6">
            {games.map((game, gIdx) => (
              <div key={gIdx} className="flex justify-center gap-2 sm:gap-4">
                {game.map((num, idx) => (
                  <span
                    key={idx}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${getBallColor(
                      num
                    )} text-xs sm:text-base md:text-lg text-black flex items-center justify-center font-bold shadow`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
