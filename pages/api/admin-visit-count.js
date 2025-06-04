// pages/api/admin-visit-count.js
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        // 오빠가 발급받은 서비스 계정 키 넣기
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analyticsDataClient = google.analyticsdata({ version: "v1beta", auth });

    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [
          {
            startDate: dateStr,
            endDate: dateStr,
          },
        ],
        metrics: [{ name: "activeUsers" }],
      },
    });

    const count = response.data.rows?.[0]?.metricValues?.[0]?.value || 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error("GA API error:", error);
    res.status(500).json({ count: null, error: "GA 요청 실패" });
  }
}
