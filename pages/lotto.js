import Head from 'next/head';
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { getHotColdNumbers } from "../utils/statistics";

export default function LottoPage() {
  const [games, setGames] = useState([]);
  const [fixed, setFixed] = useState("");
  const [hot, setHot] = useState([]);
  const [cold, setCold] = useState([]);
  const [selectedHot, setSelectedHot] = useState([]);
  const [excludedCold, setExcludedCold] = useState([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [nextRound, setNextRound] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [aiCombos, setAiCombos] = useState([]);

  useEffect(() => {
    fetch("/api/lotto-images")
      .then((res) => res.json())
      .then((data) => setGallery(data.images || []));

    getHotColdNumbers().then(({ hot, cold }) => {
      setHot(hot);
      setCold(cold);
    });

    fetch("/lotto_history.json")
      .then((res) => res.json())
      .then((data) => {
        const last = data[0];
        setNextRound(last.round + 1);
      });

    fetch("/ai_lotto_result.json")
      .then((res) => res.json())
      .then((data) => setAiCombos(data));
  }, []);

  const toggleHotSelect = (num) => {
    setSelectedHot((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const toggleColdExclude = (num) => {
    if (typeof num !== "number" || isNaN(num) || num < 1 || num > 45) return;
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

  const applyUserConditions = (comboList, fixed, excluded, include) => {
    return comboList.filter(({ combo }) => {
      const hasFixed = fixed.every((n) => combo.includes(n));
      const hasExcluded = excluded.every((n) => !combo.includes(n));
      const hasIncluded = include.length === 0 || include.some((n) => combo.includes(n));
      return hasFixed && hasExcluded && hasIncluded;
    });
  };

  const generateComboWithConditions = (fixed = [], excluded = []) => {
    const combo = [...fixed];
    while (combo.length < 6) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!combo.includes(n) && !excluded.includes(n)) combo.push(n);
    }
    return combo.sort((a, b) => a - b);
  };

  const handleGenerate = () => {
    const fixedNums = fixed
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const validExcludedCold = excludedCold
      .filter((n) => typeof n === "number" && !isNaN(n) && n >= 1 && n <= 45);

    const generated = [];
    const filtered = applyUserConditions(aiCombos, fixedNums, validExcludedCold, selectedHot);

    for (let i = 0; i < 5; i++) {
      const chance = Math.random();
      if (chance < 0.2 && selectedHot.length > 0 && selectedHot.length <= 6) {
        // 20% 확률로 HOT 번호 모두 포함된 조합 생성
        let combo = [...selectedHot];
        while (combo.length < 6) {
          const n = Math.floor(Math.random() * 45) + 1;
          if (!combo.includes(n) && !validExcludedCold.includes(n)) combo.push(n);
        }
        generated.push(combo.sort((a, b) => a - b));
      } else {
        if (filtered.length > 0) {
          const randomCombo = filtered[Math.floor(Math.random() * filtered.length)].combo;
          generated.push([...randomCombo]);
        } else {
          const combo = generateComboWithConditions(fixedNums, validExcludedCold);
          generated.push(combo);
        }
      }
    }

    setGames(generated);
    setGeneratedAt(new Date().toLocaleString("ko-KR"));
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-xl sm:text-3xl font-bold leading-tight sm:leading-normal tracking-tight mb-2 sm:mb-4">
          AI 기반 무료 로또 조합기
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-snug sm:leading-normal tracking-tight mb-6">
          머신러닝 기반으로 생성된 8,145,060가지 조합 중 조건에 맞는 5게임을 추천합니다.
        </p>

        {/* HOT 번호 선택 */}
        <div className="mb-6 text-center px-4 sm:px-6">
          <h3 className="font-semibold mb-2">🔥 포함할 상위 10개 HOT(많이 나온) 번호</h3>
          <div className="inline-flex flex-wrap justify-center gap-2">
            {hot.map((num) => (
              <button
                key={num}
                onClick={() => toggleHotSelect(num)}
                className={`w-10 h-10 text-sm sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full font-bold flex items-center justify-center ${
                  selectedHot.includes(num) ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <button
              onClick={() => setSelectedHot([])}
              className="px-4 py-1.5 border border-blue-500 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition"
            >
              🔄 HOT 초기화
            </button>
          </div>
        </div>

        {/* COLD 번호 제외 */}
        <div className="mb-6 text-center px-4 sm:px-6">
          <h3 className="font-semibold mb-2">❄️ 제외할 상위 10개 COLD(적게 나온) 번호</h3>
          <div className="inline-flex flex-wrap justify-center gap-2">
            {cold.map((num) => (
              <button
                key={num}
                onClick={() => toggleColdExclude(num)}
                className={`w-10 h-10 text-sm sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-full font-bold flex items-center justify-center ${
                  excludedCold.includes(num) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <button
              onClick={() => setExcludedCold([])}
              className="px-4 py-1.5 border border-blue-500 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition"
            >
              🔄 COLD 초기화
            </button>
          </div>
        </div>

        {/* 고정 입력 + 버튼 */}
        <div className="mb-6">
          <input
            type="text"
            value={fixed}
            onChange={(e) => setFixed(e.target.value)}
            placeholder="고정 숫자 (예: 7, 14)"
            className="border px-4 py-2 rounded w-64 mx-auto block mb-2"
          />
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition mx-auto block"
          >
            🎯 AI 기반 5게임 추천 받기
          </button>
          {nextRound && (
            <div className="text-base text-blue-600 font-semibold mt-4">
              진행 중인 회차: {nextRound}회
            </div>
          )}
        </div>

        {/* 결과 */}
        {games.length > 0 && (
          <>
            <div className="mt-6 space-y-4">
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
            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-1">
                생성 일시: {generatedAt}
              </div>
              <div className="text-xs text-gray-400">
                ※ 이 조합은 AI 추천 기반이며 당첨을 보장하지 않습니다.
              </div>
            </div>
          </>
        )}

        {/* 갤러리 */}
        <div className="mt-20 text-left max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">-최근 당첨 결과-</h2>
          <div className="flex flex-col items-center gap-6">
            {gallery.map((file, idx) => (
              <div key={idx} className="w-full flex justify-center">
                <img
                  src={`/lotto-shots/${file}`}
                  alt={file}
                  className="object-contain w-full max-w-[700px] sm:max-w-[900px] lg:max-w-[1200px] max-h-[600px] h-auto rounded shadow"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
