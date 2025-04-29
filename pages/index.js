import MainSlider from "../components/MainSlider";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("전체");
  const [selectedMall, setSelectedMall] = useState("전체");

  useEffect(() => {
    fetch("/11st_lego_products.json")  // 11번가 레고 상품 JSON 파일 경로 수정
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
            "테크닉", "스타워즈", "스피드 챔피언", "Icons", "아이디어", "시티", "배트맨", "디즈니", "닌자고", "미니피겨", "마블", "Lord of the Rings",
            "동물의 숲", "아키텍처", "아트", "아바타", "블루이", "보타니컬 컬렉션", "Braille Bricks", "브릭헤즈", "클래식", "크리에이터 3in1",
            "DC", "슈퍼 배드 4", "도트", "드림즈", "듀플로", "듀플로 페파 피그", "에듀케이션", "프렌즈", "Fortnite", "개비의 매직 하우스",
            "해리포터", "쥬라기 월드", "마인크래프트", "몽키 키드", "파워업", "SERIOUS PLAY", "소닉 더 헤지혹", "슈퍼 마리오", "젤다의 전설",
            "웬즈데이", "위키드"
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
          {filteredProducts.map((product, idx) => (
            <a 
              key={idx} 
              href={product.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition"
            >
              <img src={product.image_url} alt={product.title} className="h-40 mx-auto object-contain mb-2" />
              <h3 className="text-md font-semibold">{product.title}</h3>
              <p className="text-blue-600 font-bold mt-2">{product.price}</p>
            </a>
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
