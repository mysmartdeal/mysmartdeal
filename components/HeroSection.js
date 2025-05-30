import React from "react";
import { useRouter } from "next/router"; // ✅ 추가

export default function HeroSection() {
  const router = useRouter(); // ✅ 현재 페이지 확인

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

      {/* ✅ /lotto 페이지에서만 링크 복사 버튼 표시 */}
      {router.pathname === "/lotto" && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText("https://www.mysmartdeal.co.kr/lotto");
              alert("📋 로또 조합기 링크가 복사되었습니다!");
            }}
            className="bg-white text-blue-600 font-semibold rounded-full text-sm sm:text-base px-5 py-2 shadow-md border hover:shadow-lg transition"
          >
            🔗 이 페이지 링크 복사
          </button>
        </div>
      )}
    </section>
  );
}
