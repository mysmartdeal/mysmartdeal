// lib/analytics.js

/**
 * 안전한 GA 이벤트 전송 함수
 * 관리자 쿠키가 설정된 경우에는 GA 호출 생략됨
 */
export const trackEvent = (eventName, options = {}) => {
  if (
    typeof window !== "undefined" &&
    !document.cookie.includes("exclude_analytics=true")
  ) {
    window.gtag?.("event", eventName, options);
  }
};
