import Layout from "../components/Layout";
import { useState, useEffect } from "react";

export default function LottoPage() {
  const [games, setGames] = useState([]);
  const [fixed, setFixed] = useState("");
  const [highlight, setHighlight] = useState([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [gallery, setGallery] = useState([]);
  const [nextRound, setNextRound] = useState(null);
  const [latestLotto, setLatestLotto] = useState(null);

  useEffect(() => {
    fetch("/lotto_history.json")
      .then((res) => res.json())
      .then(() => {
        const baseRound = 1174;
        const baseDate = new Date("2025-05-31T21:30:00+09:00");
        const now = new Date();
        const msPerWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksPassed = Math.floor((now - baseDate) / msPerWeek);
        const next = baseRound + Math.max(0, weeksPassed);
        setNextRound(next);

        fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${next}`)
          .then(res => res.json())
          .then(data => {
            if (data.returnValue === "success") {
              setLatestLotto({
                round: data.drwNo,
                date: data.drwNoDate,
                numbers: [
                  data.drwtNo1, data.drwtNo2, data.drwtNo3,
                  data.drwtNo4, data.drwtNo5, data.drwtNo6,
                ],
                bonus: data.bnusNo,
                winners: data.firstPrzwnerCo,
                prize: data.firstWinamnt,
                sales: data.totSellamnt,
              });
            }
          });
      });

    fetch("/api/lotto-images")
      .then((res) => res.json())
      .then((data) => setGallery(data.images || []));
  }, []);

  const handleGenerate = () => {
    const fixedNums = fixed
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 45);

    const generateRandomGame = () => {
      const nums = new Set(fixedNums);
      while (nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
      return Array.from(nums).sort((a, b) => a - b);
    };

    const generated = Array.from({ length: 5 }, generateRandomGame);
    setGames(generated);
    setGeneratedAt(new Date().toLocaleString("ko-KR"));
  };

  const getBallColor = (num) => {
    if (num <= 9) return "bg-yellow-500";
    if (num <= 19) return "bg-sky-500";
    if (num <= 29) return "bg-rose-500";
    if (num <= 39) return "bg-gray-500";
    return "bg-emerald-500";
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 완전 랜덤 로또 조합 추천</h1>
        <p className="text-gray-600 mb-6">
          고정 숫자를 입력하면 나머지는 1~45 중 무작위로 조합됩니다.
        </p>

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
          <div className="text-xs text-gray-400 mt-2 mb-4">
            ※ 이 조합은 AI 추천 기반이며 당첨을 보장하지 않습니다.
          </div>
          {nextRound && (
            <div className="text-base text-blue-600 font-semibold mt-4">
              진행 중인 회차: {nextRound}회
            </div>
          )}
        </div>

        {generatedAt && (
          <div className="text-sm text-gray-500 mb-4">
            생성 일시: {generatedAt}
          </div>
        )}

        {games.length > 0 && (
          <div className="mt-10 space-y-6">
            {games.map((game, gIdx) => (
              <div key={gIdx} className="flex justify-center gap-4">
                {game.map((num, idx) => (
                  <span
                    key={idx}
                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full ${getBallColor(
                      num
                    )} text-white text-sm sm:text-base md:text-lg flex items-center justify-center font-bold shadow-md`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {latestLotto && (
          <div className="mt-20 text-left max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">- 최근 당첨 결과 -</h2>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-lg font-semibold mb-2">
                🎯 {latestLotto.round}회 ({latestLotto.date} 추첨)
              </div>
              <div className="flex justify-center gap-2 mb-3">
                {latestLotto.numbers.map((num, idx) => (
                  <span key={idx} className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${getBallColor(num)} text-white flex items-center justify-center font-bold shadow`}>
                    {num}
                  </span>
                ))}
                <span className="text-lg font-bold text-gray-600 px-2">+</span>
                <span className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${getBallColor(latestLotto.bonus)} text-white flex items-center justify-center font-bold shadow`}>
                  {latestLotto.bonus}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                1등 당첨자 <strong>{latestLotto.winners}</strong>명 &nbsp;|&nbsp;
                1인당 <strong>{latestLotto.prize.toLocaleString()}원</strong> &nbsp;|&nbsp;
                총 판매금 <strong>{latestLotto.sales.toLocaleString()}원</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
