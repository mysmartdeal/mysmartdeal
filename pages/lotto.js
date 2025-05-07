import Layout from "../components/Layout";
import { useState } from "react";

export default function LottoPage() {
  const [games, setGames] = useState([]);

  const generateLotto = () => {
    const newGames = [];

    for (let i = 0; i < 5; i++) {
      const numbers = new Set();
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
      }
      newGames.push([...numbers].sort((a, b) => a - b));
    }

    setGames(newGames);
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 무료 로또 조합 받기</h1>
        <p className="text-gray-600 mb-6">버튼을 눌러 5게임의 랜덤 로또 번호를 받아보세요.</p>
        <button
          onClick={generateLotto}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          로또 번호 5게임 생성
        </button>

        {games.length > 0 && (
          <div className="mt-10 space-y-6">
            {games.map((game, gIdx) => (
              <div key={gIdx} className="flex justify-center gap-4">
                {game.map((num, idx) => (
                  <span
                    key={idx}
                    className="w-12 h-12 rounded-full bg-yellow-300 text-black flex items-center justify-center text-lg font-bold shadow"
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
