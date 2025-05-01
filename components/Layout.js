import HeroSection from "./HeroSection";

export default function Layout({ children }) {
  return (
    <div>
      <HeroSection />  {/* 상단 공통 Hero */}
      {children}        {/* 페이지별 본문 */}
    </div>
  );
}
