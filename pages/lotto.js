import Layout from "../components/Layout";
import { useState } from "react";

export default function LottoPage() {
  const [numbers, setNumbers] = useState([]);

  const generateLotto = () => {
    const newNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 45) + 1
    );
    const sorted = [...new Set(newNumbers)].sort((a, b) => a - b);
    while (sorted.length < 6) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!sorted.includes(n)) sorted.push(n);
    }
    setNumbers(sorted.sort((a, b) => a - b));
  };

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 무료 로또 조합 받기</h1>
        <p className="text-gray-600 mb-6">버튼을 눌러 랜덤한 로또 번호 조합을 받아보세요.</p>
        <button
          onClick={generateLotto}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          로또 번호 생성
        </button>

        {numbers.length > 0 && (
          <div className="mt-8 text-xl font-semibold text-gray-800">
            <div className="flex flex-wrap justify-center gap-4">
              {numbers.map((num, idx) => (
                <span key={idx} className="w-12 h-12 rounded-full bg-yellow-300 text-black flex items-center justify-center">
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
