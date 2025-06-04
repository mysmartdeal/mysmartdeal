// pages/_app.js
import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head"; // ✅ Head 추가

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* ✅ 전체 페이지 파비콘 적용 */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ✅ 구글 애널리틱스 GA4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-322CF1104G`}
      />
      <Script
  id="gtag-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      if (!document.cookie.includes("exclude_analytics=true")) {
        gtag('config', 'G-322CF1104G', {
          page_path: window.location.pathname,
        });
      }
    `,
  }}
/>

      {/* ✅ 실제 페이지 렌더링 */}
      <Component {...pageProps} />
    </>
  );
}
