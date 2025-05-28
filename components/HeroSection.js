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

      {/* 상단 기본 버튼 3개 */}
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

      {/* 🎯 외부 링크로 변경된 버튼 그룹 */}
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-[300px]">
          <a
            href="https://www.dhlottery.co.kr/gameResult.do?method=byWin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-blue-700 font-semibold rounded-full text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            회차별 당첨번호
          </a>
          <a
            href="https://www.dhlottery.co.kr/store.do?method=topStore&pageGubun=L645"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-blue-700 font-semibold rounded-full text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            당첨판매점 조회
          </a>
        </div>
      </div>
    </section>
  );
}
