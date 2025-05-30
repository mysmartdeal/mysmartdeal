import HeroSection from "./HeroSection";
import ScrollTopButton from "./ScrollTopButton"; // ✅ 추가

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <main className="flex-grow">{children}</main>

      <footer className="bg-white py-6 text-center text-gray-400 text-sm border-t">
        &copy; 2025 MySmartDeal. All rights reserved.
        <div className="mt-2 space-x-4">
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            개인정보처리방침
          </a>
          <a href="/contact" className="text-blue-500 hover:underline">
            문의하기
          </a>
        </div>
      </footer>
          {/* ✅ 모든 페이지에서 보여질 TOP 버튼 */}
      <scrolltopbutton />
    </div>
  );
}
