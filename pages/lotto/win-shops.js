import React from "react";
import Layout from "../../components/Layout";

export default function WinShopsPage() {
  return (
    <Layout>
      <div className="bg-white py-4 px-0">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
          당첨판매점 조회
        </h1>

        <div className="w-full overflow-x-auto">
          <iframe
            src="https://www.dhlottery.co.kr/store.do?method=topStore&pageGubun=L645"
            width="100%"
            height="1600"
            style={{
              minWidth: "1280px",
              border: "none",
            }}
            title="동행복권 당첨판매점 조회"
          />
        </div>
      </div>
    </Layout>
  );
}
