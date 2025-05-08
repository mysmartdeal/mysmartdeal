
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), "public", "lotto-shots");
  let files = [];

  try {
    files = fs
      .readdirSync(dirPath)
      .filter((f) => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png"));
  } catch (e) {
    return res.status(500).json({ error: "폴더를 읽을 수 없습니다." });
  }

  res.status(200).json({ images: files });
}
