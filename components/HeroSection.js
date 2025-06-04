import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    // 시간대 + 요일 기반 허수 계산
    function getFakeVisitorBase() {
      const hour = new Date().getHours(); // 0~23
      const day = new Date().getDay(); // 0:일 ~ 6:토

      let base = 80;

      if (hour >= 1 && hour <= 6) base = 30;       // 새벽
      else if (hour >= 7 && hour <= 10) base = 70; // 오전
      else if (hour >= 11 && hour <= 17) base = 120; // 낮
      else if (hour >= 18 && hour <= 23) base = 160; // 저녁

      if (day === 0) base -= 30; // 일요일 줄이기
      if (day === 6) base += 20; // 토요일 살짝 올리기

      return base + Math.floor(Math.random() * 40) - 20; // ±20 흔들림
    }

    const fakeCount = getFakeVisitorBase();
    const el = document.getElementById("visitor-count");
    if (el) el.innerText = `${fakeCount}명`;
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

      {/* 허수 방문자 수 표시 */}
      <div className="mt-4 text-sm text-white opacity-60">
        오늘 방문자 수: <span id="visitor-count">--명</span>
      </div>
    </section>
  );
}
