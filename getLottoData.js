
const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async () => {
  const url = "https://www.dhlottery.co.kr/gameResult.do?method=byWin";

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const round = $(".win_result h4 strong").first().text().replace(/[^0-9]/g, "");
    const date = $(".win_result p").text().trim().split("
")[0].replace(/[()]/g, "").trim();
    const balls = [];
    $(".num.win span").each((_, el) => {
      balls.push(parseInt($(el).text().trim()));
    });
    const bonus = parseInt($(".bonus span").text().trim());

    const prize = [];
    $(".tbl_data tbody tr").each((_, row) => {
      const cols = $(row).find("td");
      prize.push({
        rank: $(cols[0]).text().trim(),
        winners: $(cols[1]).text().trim(),
        amount: $(cols[2]).text().trim(),
      });
    });

    const result = {
      round: parseInt(round),
      date,
      numbers: balls,
      bonus,
      prize,
    };

    fs.writeFileSync("public/latest_lotto.json", JSON.stringify(result, null, 2), "utf-8");
    console.log("✅ 최신 로또 결과 저장 완료 → public/latest_lotto.json");
  } catch (err) {
    console.error("❌ 로또 데이터 크롤링 실패:", err);
    process.exit(1);
  }
})();
