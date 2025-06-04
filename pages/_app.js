import "../styles/globals.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [excludeTracking, setExcludeTracking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isExcluded = document.cookie.includes("exclude_analytics=true");
    setExcludeTracking(isExcluded);

    const handleRouteChange = (url) => {
      if (!isExcluded && typeof window !== "undefined") {
        window.gtag?.("config", "G-322CF1104G", {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      {!excludeTracking && typeof window !== "undefined" && (
        <>
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
                gtag('config', 'G-322CF1104G', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}
