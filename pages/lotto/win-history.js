// pages/lotto/win-history.js

import React from "react";

export default function WinHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          회차별 당첨번호 조회
        </h1>

        {/* ✅ 축소된 iframe을 감싸는 div */}
        <div style={{ overflowX: "auto" }}>
          <iframe
            src="https://www.dhlottery.co.kr/gameResult.do?method=byWin"
            width="1280"
            height="1400"
            style={{
              transform: "scale(0.9)",
              transformOrigin: "top center",
              border: "1px solid #ccc",
              borderRadius: "12px",
            }}
            title="동행복권 회차별 당첨번호"
          />
        </div>
      </div>
    </div>
  );
}
