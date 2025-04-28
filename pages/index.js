import MainSlider from "../components/MainSlider";
import { useState } from "react";

export default function Home() {
  const [selectedSeries, setSelectedSeries] = useState("전체");
  const [selectedMall, setSelectedMall] = useState("전체");

  const products = [
    { id: 1, title: "프렌즈 캠핑카", series: "프렌즈", mall: "쿠팡" },
    { id: 2, title: "테크닉 스포츠카", series: "테크닉", mall: "11번가" },
    { id: 3, title: "시티 소방서", series: "시티", mall: "G마켓" },
    { id: 4, title: "닌자고 드래곤", series: "닌자고", mall: "SSG" },
    { id: 5, title: "디즈니 캐슬", series: "디즈니", mall: "네이버 공식몰" },
    { id: 6, title: "스타워즈 X-윙", series: "스타워즈", mall: "공홈" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchSeries = selectedSeries === "전체" || product.series === selectedSeries;
    const matchMall = selectedMall === "전체" || product.mall === selectedMall;
    return matchSeries && matchMall;
  });

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

      {/* 메인 슬라이드 */}
      <MainSlider />

      {/* 시리즈별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">시리즈별</h2>
        <div className="flex overflow-x-auto gap-2 p-2">
          {[
            "전체", "테크닉", "스타워즈", "스피드 챔피언", "Icons", "아이디어", "시티", "배트맨",
            "디즈니", "닌자고", "미니피겨", "마블", "Lord of the Rings"
          ].map((series) => (
            <button 
              key={series}
              onClick={() => setSelectedSeries(series)}
              className={`p-2 rounded whitespace-nowrap ${
                selectedSeries === series ? "bg-blue-500 text-white" : "bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {series}
            </button>
          ))}
        </div>
      </section>

      {/* 쇼핑몰별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">쇼핑몰별</h2>
        <div className="flex flex-wrap gap-2">
          {["전체", "쿠팡", "11번가", "G마켓", "SSG", "네이버 공식몰", "공홈"].map((mall) => (
            <button 
              key={mall}
              onClick={() => setSelectedMall(mall)}
              className={`p-2 rounded ${
                selectedMall === mall ? "bg-yellow-400 text-white" : "bg-yellow-200 hover:bg-yellow-300"
              }`}
            >
              {mall}
            </button>
          ))}
        </div>
      </section>

      {/* 할인 상품 리스트 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">상품 리스트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow text-center">
              {product.title}
            </div>
          ))}
        </div>
      </section>

      {/* 하단 푸터 */}
      <footer className="bg-white mt-16 p-6 text-center text-gray-500 text-sm">
        &copy; 2025 MySmartDeal. All rights reserved.
      </footer>
    </div>
  );
}
