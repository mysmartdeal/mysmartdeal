// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

function Document(props) {
  const { excludeAnalytics } = props;

  return (
    <Html lang="ko">
      <Head>
        {!excludeAnalytics && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-322CF1104G"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-322CF1104G', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            ></script>
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const cookie = ctx.req?.headers?.cookie || "";
  const excludeAnalytics = cookie.includes("exclude_analytics=true");
  return { ...initialProps, excludeAnalytics };
};

export default Document;
