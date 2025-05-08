import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { getHotColdNumbers } from "../utils/statistics";

export default function LottoPage() {
  const [games, setGames] = useState([]);
  const [generatedAt, setGeneratedAt] = useState("");
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("/api/lotto-images")
      .then((res) => res.json())
      .then((data) => setGallery(data.images || []));
  }, []);

  const getBallColor = (num) => {
    if (num <= 9) return "bg-yellow-300";
    if (num <= 19) return "bg-sky-300";
    if (num <= 29) return "bg-pink-300";
    if (num <= 39) return "bg-gray-400";
    return "bg-green-400";
  };

  const handleGenerate = async () => {
    const { hot, cold } = await getHotColdNumbers();

    const generated = [];

    for (let i = 0; i < 5; i++) {
      const pick = new Set();

      // Hot 번호 2개
      while (pick.size < 2) {
        pick.add(hot[Math.floor(Math.random() * hot.length)]);
      }

      // Cold 번호 1개
      while (pick.size < 3) {
        pick.add(cold[Math.floor(Math.random() * cold.length)]);
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
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🔥 Hot/Cold 기반 조합 추천</h1>
        <p className="text-gray-600 mb-6">
          과거 당첨번호를 분석해 자주 나온 번호와 안 나온 번호를 포함한 전략적 조합을 생성합니다.
        </p>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition mb-4"
        >
          조합 생성
        </button>

        {generatedAt && (
          <div className="text-sm text-gray-500 mb-6">
            생성 일시: {generatedAt}
          </div>
        )}

        {games.length > 0 && (
          <div className="mt-6 space-y-6">
            {games.map((game, gIdx) => (
              <div key={gIdx} className="flex justify-center gap-2 sm:gap-4">
                {game.map((num, idx) => (
                  <span
                    key={idx}
                    className={
                      "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full " +
                      getBallColor(num) +
                      " text-xs sm:text-base md:text-lg text-black flex items-center justify-center font-bold shadow"
                    }
                  >
                    {num}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* 이미지 갤러리 */}
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
