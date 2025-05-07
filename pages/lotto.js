
import Layout from "../components/Layout";
import { useState } from "react";
import { generateSmartLottoSet } from "../utils/smartLotto";

export default function LottoPage() {
  const [games, setGames] = useState([]);
  const [mode, setMode] = useState("hot");
  const [fixed, setFixed] = useState("");
  const [highlight, setHighlight] = useState([]);

  const handleGenerate = () => {
    const fixedNums = fixed
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const { games: generated, highlight: hot } = generateSmartLottoSet(5, mode, fixedNums);
    setGames(generated);
    setHighlight(hot);
  };

  const getBallColor = (num) => {
    if (num <= 9) return "bg-yellow-300";
    if (num <= 19) return "bg-sky-300";
    if (num <= 29) return "bg-pink-300";
    if (num <= 39) return "bg-gray-400";
    return "bg-green-400";
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 전략형 로또 조합 추천</h1>
        <p className="text-gray-600 mb-6">
          고정 번호, 추천 모드 등을 설정하고 통계 기반 조합을 생성하세요.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="hot">🔥 자주 나온 번호 기반</option>
            <option value="cold">❄ 잘 안 나온 번호 기반</option>
          </select>
          <input
            type="text"
            value={fixed}
            onChange={(e) => setFixed(e.target.value)}
            placeholder="고정 숫자 (예: 7, 14)"
            className="border px-4 py-2 rounded w-64"
          />
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            조합 생성
          </button>
        </div>

        {games.length > 0 && (
          <div className="mt-10 space-y-6">
            {games.map((game, gIdx) => (
              <div key={gIdx} className="flex justify-center gap-4">
                {game.map((num, idx) => (
                  <span
                    key={idx}
                    className={
                      "w-12 h-12 rounded-full " +
                      getBallColor(num) +
                      " text-black flex items-center justify-center text-lg font-bold shadow" +
                      (highlight.includes(num) ? " ring-4 ring-red-400" : "")
                    }
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
