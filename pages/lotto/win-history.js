import React from "react";
import Layout from "../../components/Layout";

export default function WinHistoryPage() {
  return (
    <Layout>
      <div className="bg-white py-4 px-0">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
          회차별 당첨번호 조회
        </h1>

        <div className="w-full overflow-x-auto">
          <iframe
            src="https://www.dhlottery.co.kr/gameResult.do?method=byWin"
            width="100%"
            height="1600"
            style={{
              minWidth: "1280px",
              border: "none",
            }}
            title="동행복권 회차별 당첨번호"
          />
        </div>
      </div>
    </Layout>
  );
}
