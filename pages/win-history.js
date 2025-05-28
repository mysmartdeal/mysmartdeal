import React from "react";

export default function WinHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
          회차별 당첨번호 조회
        </h1>

        <iframe
          src="https://www.dhlottery.co.kr/gameResult.do?method=byWin"
          width="100%"
          height="800"
          title="동행복권 회차별 당첨번호"
          className="border rounded-lg"
        />
      </div>
    </div>
  );
}
