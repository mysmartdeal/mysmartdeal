import React from "react";
import Layout from "../../components/Layout";

export default function WinShopsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          당첨판매점 조회
        </h1>
        <a
          href="https://www.dhlottery.co.kr/store.do?method=topStore&pageGubun=L645"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
        >
          👉 동행복권 사이트에서 확인하기
        </a>
      </div>
    </Layout>
  );
}
