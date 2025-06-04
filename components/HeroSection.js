import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const now = new Date();
    const dayKey = now.toLocaleDateString(); // 매일 리셋용 키
    const isSunday = now.getDay() === 0;

    // 일요일은 50~100명, 평일/토요일은 100~200명
    const min = isSunday ? 50 : 100;
    const max = isSunday ? 100 : 200;

    // 1. 오늘의 총 방문자 수 결정 (localStorage에 저장)
    let total = localStorage.getItem(`fakeVisitors_${dayKey}`);
    if (!total) {
      total = Math.floor(Math.random() * (max - min + 1)) + min;
      localStorage.setItem(`fakeVisitors_${dayKey}`, total);
    } else {
      total = parseInt(total);
    }

    // 2. 시간대별 분포 가중치 설정
    const hourlyWeights = [
      0.2, 0.2, 0.2, 0.2, 0.4, 0.6,  // 새벽
      1.0, 1.2, 1.4, 1.6, 1.6, 1.5,  // 오전
      2.0, 2.5, 2.2, 2.0, 2.0, 2.5,  // 오후
      3.0, 2.8, 2.6, 2.0, 1.5, 1.0   // 저녁
    ];
    const totalWeight = hourlyWeights.reduce((a, b) => a + b, 0);

    const hour = now.getHours();
    const minute = now.getMinutes();

    // 지금까지 지나온 시간 기준 누적 가중치 계산
    let weightedPassed = 0;
    for (let i = 0; i < hour; i++) {
      weightedPassed += hourlyWeights[i];
    }
    weightedPassed += hourlyWeights[hour] * (minute / 60);

    const ratio = weightedPassed / totalWeight;
    const currentVisitors = Math.floor(total * ratio);

    // 3. DOM에 반영
    const el = document.getElementById("visitor-count");
    if (el) el.innerText = `${currentVisitors}명`;
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
        오늘 방문자 수: <span id="visitor-count">--명</span>
      </div>
    </section>
  );
}
