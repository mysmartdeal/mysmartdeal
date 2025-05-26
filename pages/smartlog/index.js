import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '../../components/Layout'; // ✅ 경로 수정

// 텍스트 미리보기 생성
function getTextPreview(html, maxLength = 60) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export async function getStaticProps() {
  const postDir = path.join(process.cwd(), 'public/smartlog-posts');
  const imgDir = path.join(process.cwd(), 'public/images/smartlog-thumbnails');
  const files = fs.readdirSync(postDir);

  const posts = files.map((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(postDir, file), 'utf8'));
    const slug = file.replace(/\.json$/, '');
    const thumbPath = path.join(imgDir, `${slug}.jpg`);
    const thumbnail = fs.existsSync(thumbPath)
      ? `/images/smartlog-thumbnails/${slug}.jpg`
      : `/images/smartlog-thumbnails/smartlog-default.jpg`; // 기본 썸네일
    return { ...content, slug, thumbnail };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return { props: { posts } };
}

export default function SmartlogPage({ posts }) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📝</span> <span>SmartLog 블로그</span>
        </h1>

        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const previewText = getTextPreview(post.content);

            return (
              <Link href={`/smartlog/${post.slug}`} key={post.slug}>
                <a className="flex items-start gap-4 p-3 border rounded hover:bg-gray-50 transition">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 overflow-hidden rounded">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold leading-snug">{post.title}</h2>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
