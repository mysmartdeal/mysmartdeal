// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* ✅ 여기 메타 태그 삽입 */}
        <meta name="naver-site-verification" content="fdea2d57e62a836de83af6d940baedf51bf312e0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
