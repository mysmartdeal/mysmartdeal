import Layout from "../components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-16 bg-white shadow-md rounded-xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          🔐 개인정보처리방침
        </h1>

        <p className="text-gray-700 mb-6">
          mysmartdeal.co.kr은(는) 이용자의 개인정보를 소중히 여기며, 아래와 같은 방침에 따라 수집, 이용, 보관됩니다.
        </p>

        <Section title="1. 수집하는 개인정보 항목" items={[
          "방문자 IP 및 브라우저 정보 (광고 및 분석용)",
          "쿠키(Cookie)를 통한 사용자 행동 정보",
        ]} />

        <Section title="2. 개인정보의 수집 및 이용 목적" items={[
          "광고 최적화 및 사용자 맞춤 콘텐츠 제공",
          "사이트 개선 및 통계 분석",
        ]} />

        <h2 className="text-xl font-semibold mt-10 mb-2 text-gray-800">
          3. 개인정보 보관 및 이용 기간
        </h2>
        <p className="text-gray-700 mb-6">
          mysmartdeal.co.kr은(는) Google Analytics 및 광고 도구(Ezoic)를 통해 정보를 수집하며, 이 정보는 시스템 목적에 따라 자동 보관됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-2 text-gray-800">
          4. 제3자 제공
        </h2>
        <p className="text-gray-700 mb-6">
          광고 및 분석 서비스를 위해 Google, Ezoic과 같은 제휴사에 데이터 일부가 전송될 수 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-2 text-gray-800">
          5. 쿠키 사용 및 차단 방법
        </h2>
        <p className="text-gray-700 mb-6">
          이 사이트는 쿠키를 사용하여 사용자 행동을 분석하며, 사용자는 브라우저 설정을 통해 이를 차단할 수 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-2 text-gray-800">
          6. 문의
        </h2>
        <p className="text-gray-700 mb-6">
          문의 사항은 <strong>contact@mysmartdeal.co.kr</strong> 로 연락주시기 바랍니다.
        </p>

        <p className="text-sm text-gray-400 mt-12">최종 수정일: 2025년 5월</p>
      </div>
    </Layout>
  );
}

function Section({ title, items }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
