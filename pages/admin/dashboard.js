// pages/admin/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();
  const [gaExcluded, setGaExcluded] = useState(false);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    // 관리자 쿠키 확인
    const isExcluded = document.cookie.includes("exclude_analytics=true");
    setGaExcluded(isExcluded);

    // GA 실제 방문자 수 가져오는 API 연동 (예시, 추후 백엔드 필요)
    // 여기선 임시로 가짜 값 세팅
    fetch("/api/admin-visit-count") // 실제로는 백엔드에서 GA API 호출
      .then((res) => res.json())
      .then((data) => setVisitCount(data.count))
      .catch(() => setVisitCount("불러오기 실패"));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">🔐 관리자 대시보드</h1>

      <div className="mb-4 p-4 rounded bg-white shadow">
        <p className="text-gray-700 font-medium mb-1">
          GA 추적 상태: {gaExcluded ? "❌ 제외됨 (관리자 모드)" : "✅ 추적 중"}
        </p>
        <p className="text-gray-700">
          오늘 방문자 수 (실제 GA 데이터 기준): {visitCount !== null ? visitCount : "불러오는 중..."}
        </p>
      </div>

      <div className="p-4 rounded bg-white shadow">
        <h2 className="font-semibold text-lg mb-2">🛠️ 테스트 기능</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => alert("조합기 초기화 실행됨 (예시 버튼)")}
        >
          조합기 전체 초기화
        </button>
      </div>
    </div>
  );
}
