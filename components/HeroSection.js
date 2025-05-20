
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        MySmartDeal
      </h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-6">
       마이 스마트 라이프
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/"
          className="bg-white text-blue-600 font-semibold rounded-full px-6 py-3 shadow hover:scale-105 transition"
        >
          H O M E
        </a>
        <a
          href="/lotto"
          className="bg-yellow-400 text-black font-semibold rounded-full px-6 py-3 shadow hover:scale-105 transition"
        >
          🎯 무료 로또 조합 받기
        </a>
      </div>
    </section>
  );
}
