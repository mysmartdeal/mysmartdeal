// pages/api/visitor.js

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';

// ✅ 키 JSON 파일을 프로젝트 루트에 넣었다고 가정
const keyFile = path.join(process.cwd(), 'ga4-key.json'); // 오빠가 받은 키 파일명으로 수정

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyFile,
});

export default async function handler(req, res) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: 'properties/GA4_속성_ID_여기에', // ← 여기에 GA4 속성 ID 입력 (숫자만)
      dateRanges: [{ startDate: 'today', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });

    const todayVisitors = response.rows?.[0]?.metricValues?.[0]?.value || '0';

    res.status(200).json({ visitors: parseInt(todayVisitors) });
  } catch (error) {
    console.error('GA API Error:', error.message);
    res.status(500).json({ error: '방문자 수 조회 실패' });
  }
}
