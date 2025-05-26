import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">MySmartDeal</h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-6">MySmartLife</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* HOME 버튼 */}
        <a
          href="/"
          className="bg-white text-blue-600 font-semibold rounded-full px-6 py-3 shadow-md border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          🏠 HOME
        </a>

        {/* 로또 버튼 */}
        <a
          href="/lotto"
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          🎯 무료 로또 조합 받기
        </a>

        {/* 블로그 버튼 */}
        <a
          href="/smartlog"
          className="bg-white text-blue-600 font-semibold border border-blue-200 rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          📘 블로그 보기
        </a>
      </div>
    </section>
  );
}
