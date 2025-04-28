import MainSlider from "../components/MainSlider";
import { useState } from "react";

export default function Home() {
  const [selectedSeries, setSelectedSeries] = useState("전체");

  const products = [
    { id: 1, title: "프렌즈 캠핑카", series: "프렌즈" },
    { id: 2, title: "테크닉 스포츠카", series: "테크닉" },
    { id: 3, title: "시티 소방서", series: "시티" },
    { id: 4, title: "닌자고 드래곤", series: "닌자고" },
    { id: 5, title: "프렌즈 놀이공원", series: "프렌즈" },
    { id: 6, title: "시티 경찰서", series: "시티" },
    { id: 7, title: "테크닉 크레인", series: "테크닉" },
    { id: 8, title: "닌자고 로봇", series: "닌자고" },
  ];

  const filteredProducts = selectedSeries === "전체" 
    ? products 
    : products.filter((product) => product.series === selectedSeries);

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
      "동물의 숲", "아키텍처", "아트", "아바타", "배트맨",
      "블루이", "보타니컬 컬렉션", "Braille Bricks", "브릭헤즈", "시티",
      "클래식", "크리에이터 3in1", "DC", "슈퍼 배드 4", "디즈니", "도트",
      "드림즈", "듀플로", "듀플로 페파 피그", "에듀케이션", "프렌즈",
      "Fortnite", "개비의 매직 하우스", "해리포터", "Icons", "아이디어",
      "쥬라기 월드", "Lord of the Rings", "마블", "마인크래프트", "미니피겨",
      "몽키 키드", "닌자고", "파워업", "SERIOUS PLAY", "소닉 더 헤지혹",
      "스피드 챔피언", "스타워즈", "슈퍼 마리오", "테크닉", "젤다의 전설",
      "웬즈데이", "위키드"
    ].map((series) => (
      <button 
        key={series}
        onClick={() => setSelectedSeries(series)}
        className="bg-blue-200 hover:bg-blue-300 p-2 rounded whitespace-nowrap"
      >
        {series}
      </button>
    ))}
  </div>
</section>



      {/* 할인 상품 리스트 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">{selectedSeries} 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow text-center">
              {product.title}
            </div>
          ))}
        </div>
      </section>

      {/* 쇼핑몰별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">쇼핑몰별</h2>
        <div className="flex flex-wrap gap-2">
          <a href="#" className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded">쿠팡</a>
          <a href="#" className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded">11번가</a>
          <a href="#" className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded">G마켓</a>
          <a href="#" className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded">SSG</a>
          <a 
            href="https://brand.naver.com/legokorea?NaPm=ct%3Dma0rjc0t%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Df7304b2a603598545a25bd98c644045800b6b7a2" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded"
          >
            네이버 공식몰
          </a>
        </div>
      </section>

      {/* 하단 푸터 */}
      <footer className="bg-white mt-16 p-6 text-center text-gray-500 text-sm">
        &copy; 2025 MySmartDeal. All rights reserved.
      </footer>
    </div>
  );
}
