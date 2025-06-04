import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const correctPassword = "jk0330"; // 오빠만 아는 비번

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      document.cookie = "exclude_analytics=true; max-age=2592000; path=/";
      alert("✅ 관리자 모드가 활성화되었습니다. GA 트래킹에서 제외됩니다.");
      window.location.reload(); // ✅ GA 스크립트 실행 전에 강제 새로고침
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-lg font-bold mb-4">관리자 로그인</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
