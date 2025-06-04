import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const now = new Date();
    const dayKey = now.toLocaleDateString();
    const isSunday = now.getDay() === 0;
    const min = isSunday ? 50 : 150;
    const max = isSunday ? 100 : 250;

    // 오늘의 목표 총 허수 방문자 수
    let total = localStorage.getItem(`fakeVisitors_${dayKey}`);
    if (!total) {
      total = Math.floor(Math.random() * (max - min + 1)) + min;
      localStorage.setItem(`fakeVisitors_${dayKey}`, total);
    } else {
      total = parseInt(total);
    }

    // 0시부터 지금까지 지난 분 수
    const minutesPassed = now.getHours() * 60 + now.getMinutes();
    const totalMinutes = 1440; // 하루 1440분

    // 분당 증가량 * 누적 분 수 * 아주 살짝 랜덤성
    const perMinute = total / totalMinutes;
    const fluctuation = 0.9 + Math.random() * 0.2; // 0.9 ~ 1.1
    const currentVisitors = Math.floor(perMinute * minutesPassed * fluctuation);

    // 애니메이션: 숫자가 0에서 자연스럽게 올라감
    const el = document.getElementById("visitor-count");
    if (el) {
      let count = 0;
      const duration = 1000; // 총 애니메이션 시간 (ms)
      const steps = Math.min(currentVisitors, 60); // 최대 60스텝
      const increment = Math.ceil(currentVisitors / steps);
      const intervalTime = Math.floor(duration / steps);

      const interval = setInterval(() => {
        count += increment;
        if (count >= currentVisitors) {
          count = currentVisitors;
          clearInterval(interval);
        }
        el.innerText = `${count}명`;
      }, intervalTime);
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
