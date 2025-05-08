import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/11st_lego_products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("/affiliate_cards.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  const handleClick = (url) => {
    const history = JSON.parse(localStorage.getItem("clickHistory") || "{}");
    history[url] = (history[url] || 0) + 1;
    localStorage.setItem("clickHistory", JSON.stringify(history));
  };

  return (
    <Layout>
      {/* 광고 자리 placeholder */}
      <section className="container mx-auto mt-6 px-4 sm:px-6">
        <div className="h-[100px] bg-gray-200 rounded text-center flex items-center justify-center text-gray-500 text-sm sm:text-base">
        </div>
      </section>

      {/* 레고 상품 리스트 */}
      <section className="container mx-auto mt-10 px-2 sm:px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, idx) => (
            <a
              key={idx}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded shadow hover:shadow-lg transition text-center"
            >
              <img
                src={product.image_url}
                alt={product.title}
                className="h-32 mx-auto object-contain mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <p className="text-blue-600 font-bold mt-1 text-xs">{product.price}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 제휴 링크 카드 섹션 */}
      <section id="cards" className="container mx-auto mt-16 px-4 sm:px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">쇼핑몰 레고 할인 모음</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick(item.url)}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="w-full h-[260px] bg-white flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full max-h-[240px] object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base font-bold mt-4">{item.title}</h3>
              <p className="text-blue-600 font-medium text-sm">{item.subtitle}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-white mt-16 py-6 text-center text-gray-400 text-sm px-4">
        &copy; 2025 MySmartDeal. All rights reserved.
      </footer>
    </Layout>
  );
}
