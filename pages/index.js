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

      {/* 메인 배너 슬라이드 */}
      <section className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-6 rounded shadow text-center">베스트 상품 1</div>
          <div className="bg-blue-100 p-6 rounded shadow text-center">베스트 상품 2</div>
          <div className="bg-blue-100 p-6 rounded shadow text-center">베스트 상품 3</div>
        </div>
      </section>

      {/* 시리즈별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">시리즈별</h2>
        <div className="flex flex-wrap gap-2">
          {['프렌즈', '테크닉', '시티', '닌자고'].map((series) => (
            <button key={series} className="bg-blue-200 hover:bg-blue-300 p-2 rounded">
              {series}
            </button>
          ))}
        </div>
      </section>

      {/* 쇼핑몰별 필터 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">쇼핑몰별</h2>
        <div className="flex flex-wrap gap-2">
          {['쿠팡', '11번가', 'G마켓', 'SSG'].map((mall) => (
            <button key={mall} className="bg-yellow-200 hover:bg-yellow-300 p-2 rounded">
              {mall}
            </button>
          ))}
        </div>
      </section>

      {/* 할인 상품 리스트 */}
      <section className="container mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">오늘의 할인 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow text-center">
              상품 카드 {idx + 1}
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
