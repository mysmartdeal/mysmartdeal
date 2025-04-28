import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">MySmartDeal 시작 페이지</h1>
      <p className="text-lg text-gray-600 text-center">
        이곳은 자동으로 레고 할인 정보를 수집하고 표시하는 플랫폼입니다.
        곧 더 많은 기능이 추가될 예정입니다!
      </p>
    </div>
  );
}
