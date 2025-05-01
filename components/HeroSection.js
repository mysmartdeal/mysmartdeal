import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        레고 마니아를 위한 할인 큐레이션 플랫폼
      </h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-8">
        쇼핑몰별 최적의 레고 할인 정보를 한눈에
      </p>
      <a
        href="#cards"
        className="inline-block bg-white text-blue-600 font-semibold rounded-full px-6 py-3 shadow hover:scale-105 transition"
      >
        지금 바로 확인하기
      </a>
    </section>
  );
}
