import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const now = new Date();

    // 날짜 기반 seed (예: 20250606)
    const seed = parseInt(now.toISOString().slice(0, 10).replace(/-/g, ""));

    // 고정된 랜덤 생성 함수
    function seededRandom(s) {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    }

    // 요일에 따라 방문자 수 범위 달라짐
    const isSunday = now.getDay() === 0;
    const min = isSunday ? 50 : 150;
    const max = isSunday ? 100 : 250;

    const rand = seededRandom(seed);
    const total = Math.floor(min + rand * (max - min)); // 오늘의 총 목표 방문자 수

    // 시간대별 가중치 설정
    const hourlyWeights = [
      0.2, 0.2, 0.2, 0.2, 0.3, 0.4,   // 0~5시
      0.7, 0.8, 1.0, 1.2, 1.3, 1.3,   // 6~11시
      1.5, 1.8, 2.0, 2.0, 2.0, 2.2,   // 12~17시
      2.5, 2.5, 2.0, 1.6, 1.0, 0.6    // 18~23시
    ];
    const totalWeight = hourlyWeights.reduce((a, b) => a + b, 0);

    // 현재 시간까지 누적된 비율 계산
    const hour = now.getHours();
    const minute = now.getMinutes();

    let weightedPassed = 0;
    for (let i = 0; i < hour; i++) {
      weightedPassed += hourlyWeights[i];
    }
    weightedPassed += hourlyWeights[hour] * (minute / 60);

    const ratio = weightedPassed / totalWeight;
    const currentVisitors = Math.floor(total * ratio);

    // 부드러운 숫자 애니메이션 (1초 내)
    const el = document.getElementById("visitor-count");
    if (el) {
      const duration = 1000; // 1초
      const start = performance.now();
      const target = currentVisitors;

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const current = Math.floor(target * eased);
        el.innerText = `${current}명`;
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 sm:py-20 text-center px-4 sm:px-6">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-4">
        MySmartDeal
      </h1>
      <p className="text-base sm:text-xl text-blue-100 mb-4 sm:mb-6">
        MySmartLife
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a
          href="/"
          className="bg-white text-blue-600 font-semibold rounded-full text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-3 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Home
        </a>
        <a
          href="/lotto"
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          🎲 무료 로또 조합 받기 🎲
        </a>
        <a
          href="/smartlog"
          className="bg-white text-blue-600 font-semibold border border-blue-200 rounded-full text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Blog
        </a>
      </div>

      {/* 방문자 수 표시 */}
      <div className="mt-4 text-sm text-white opacity-60">
        오늘 방문자 수: <span id="visitor-count">0명</span>
      </div>
    </section>
  );
}
