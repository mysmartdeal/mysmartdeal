import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 sm:py-20 text-center px-4 sm:px-6">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-4">
        MySmartDeal
      </h1>
      <p className="text-base sm:text-xl text-blue-100 mb-4 sm:mb-6">
        MySmartLife
      </p>

      {/* ✅ 버튼 그룹: 세로 배치, 가로폭 통일 */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a
          href="/"
          className="w-[240px] bg-white text-blue-600 font-semibold rounded-full text-base px-6 py-3 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
        >
          Home
        </a>
        <a
          href="/lotto"
          className="w-[240px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full text-base px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
        >
          🎲 무료 로또 조합 받기 🎲
        </a>
        <a
          href="/smartlog"
          className="w-[240px] bg-white text-blue-600 font-semibold border border-blue-200 rounded-full text-base px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
        >
          Blog
        </a>
      </div>
    </section>
  );
}
