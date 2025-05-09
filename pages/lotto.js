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

  const evaluateScore = (numbers, hot, cold) => {
    let score = 100;
    const oddCount = numbers.filter(n => n % 2 !== 0).length;
    const sectionCount = [0, 0, 0, 0, 0];

    numbers.forEach(n => {
      if (n <= 9) sectionCount[0]++;
      else if (n <= 19) sectionCount[1]++;
      else if (n <= 29) sectionCount[2]++;
      else if (n <= 39) sectionCount[3]++;
      else sectionCount[4]++;
    });

    const hotMatch = numbers.filter(n => hot.includes(n)).length;
    const coldMatch = numbers.filter(n => cold.includes(n)).length;

    if (hotMatch < 2) score -= 10;
    if (coldMatch > 0) score -= 10;
    if (oddCount < 2 || oddCount > 4) score -= 10;
    if (sectionCount.filter(c => c === 0).length > 2) score -= 10;

    return score;
  };

  const handleGenerate = async () => {
    const { hot, cold } = await getHotColdNumbers();

    const fixedNums = fixed
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const generated = [];

    for (let i = 0; i < 5; i++) {
      const pick = new Set(fixedNums);

      selectedHot.forEach((n) => {
        if (pick.size < 6) pick.add(n);
      });

      while (pick.size < 6) {
        const n = Math.floor(Math.random() * 45) + 1;
        if (!pick.has(n) && !excludedCold.includes(n)) {
          pick.add(n);
        }
      }

      generated.push([...pick].sort((a, b) => a - b));
    }

    setGames(generated);
    setGeneratedAt(new Date().toLocaleString("ko-KR"));
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-xl sm:text-3xl font-bold leading-tight sm:leading-normal tracking-tight mb-2 sm:mb-4">
          통계 기반 무료 로또 조합기
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-snug sm:leading-normal tracking-tight mb-6">
          최근 회차까지 분석한 전략적 번호 추천 서비스
        </p>

        {/* HOT 번호 선택 */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">🔥 포함할 상위 10개 HOT(많이 나온) 번호</h3>
          <div className="inline-flex flex-wrap justify-center gap-[2px] max-w-[260px] sm:max-w-full mx-auto">
            {hot.map((num) => (
              <button
                key={num}
                onClick={() => toggleHotSelect(num)}
                className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                  selectedHot.includes(num) ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* COLD 번호 제외 */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">❄️ 제외할 상위 10개 COLD(적게 나온) 번호</h3>
          <div className="inline-flex flex-wrap justify-center gap-[2px] max-w-[260px] sm:max-w-full mx-auto">
            {cold.map((num) => (
              <button
                key={num}
                onClick={() => toggleColdExclude(num)}
                className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                  excludedCold.includes(num) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* 입력 + 생성 버튼 + 회차 */}
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
            조합 생성
          </button>
          {nextRound && (
            <div className="text-base text-blue-600 font-semibold mt-4">
              진행 중인 회차: {nextRound}회
            </div>
          )}
        </div>

        {/* 결과 + 점수 + 생성일시 + 안내 */}
        {games.length > 0 && (
          <>
            <div className="mt-6 space-y-4">
              {games.map((game, gIdx) => {
                const score = evaluateScore(game, hot, cold);
                return (
                  <div key={gIdx} className="flex flex-col items-center gap-1">
                    <div className="flex justify-center gap-2 sm:gap-4">
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
                    <div className="text-xs text-gray-600">🎯 전략 점수: {score}점</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-1">
                생성 일시: {generatedAt}
              </div>
              <div className="text-xs text-gray-400">
                ※ 이 조합은 통계 기반 추천일 뿐, 당첨을 보장하지 않습니다.<br />
                모든 로또는 결국 확률과 운의 게임입니다.
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
