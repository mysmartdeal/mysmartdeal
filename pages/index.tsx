import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 메뉴바 */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-700">MySmartDeal</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-500">홈</a></li>
            <li><a href="#" className="hover:text-blue-500">시리즈별</a></li>
            <li><a href="#" className="hover:text-blue-500">쇼핑몰별</a></li>
          </ul>
        </div>
      </nav>

      {/* 메인 배너 슬라이드 (간단하게 고정된 3개) */}
      <section className="container mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded shadow">베스트 할인 상품 1</div>
          <div className="bg-white p-6 rounded shadow">베스트 할인 상품 2</div>
          <div className="bg-white p-6 rounded shadow">베스트 할인 상품 3</div>
        </div>
      </section>

      {/* 시리즈별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">시리즈별</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-100 hover:bg-blue-300 p-2 rounded">프렌즈</button>
          <button className="bg-blue-100 hover:bg-blue-300 p-2 rounded">테크닉</button>
          <button className="bg-blue-100 hover:bg-blue-300 p-2 rounded">시티</button>
          <button className="bg-blue-100 hover:bg-blue-300 p-2 rounded">닌자고</button>
        </div>
      </section>

      {/* 쇼핑몰별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">쇼핑몰별</h2>
        <div className="flex space-x-4">
          <button className="bg-yellow-100 hover:bg-yellow-300 p-2 rounded">쿠팡</button>
          <button className="bg-yellow-100 hover:bg-yellow-300 p-2 rounded">11번가</button>
          <button className="bg-yellow-100 hover:bg-yellow-300 p-2 rounded">G마켓</button>
          <button className="bg-yellow-100 hover:bg-yellow-300 p-2 rounded">SSG</button>
        </div>
      </section>

      {/* 할인 상품 리스트 (4개씩 카드형) */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">오늘의 할인 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded shadow">상품 카드 1</div>
          <div className="bg-white p-4 rounded shadow">상품 카드 2</div>
          <div className="bg-white p-4 rounded shadow">상품 카드 3</div>
          <div className="bg-white p-4 rounded shadow">상품 카드 4</div>
        </div>
      </section>

      {/* 하단 푸터 */}
      <footer className="bg-white mt-16 p-6 text-center text-gray-500 text-sm">
        &copy; 2025 MySmartDeal. All rights reserved.
      </footer>
    </div>
  );
}
