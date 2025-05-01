
import Layout from "../components/Layout";
// import MainSlider from "../components/MainSlider";
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

  return (
    <Layout>
      {/* 광고 자리 placeholder (슬라이더 대신) */}
      <section className="container mx-auto mt-10 mb-10">
        <div className="h-[120px] bg-gray-200 rounded text-center flex items-center justify-center text-gray-500">
          광고 자리 (Google AdSense 예정)
        </div>
      </section>

      {/* <MainSlider /> */}

      <section className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
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

      <section id="cards" className="container mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">제휴 쇼핑몰 레고 할인 모음</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded shadow hover:shadow-md transition text-center"
            >
              <div className="w-full h-[300px] bg-white flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold mt-3">{item.title}</h3>
              <p className="text-blue-600 font-medium">{item.subtitle}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="bg-white mt-16 p-6 text-center text-gray-500 text-sm">
        &copy; 2025 MySmartDeal. All rights reserved.
      </footer>
    </Layout>
  );
}
