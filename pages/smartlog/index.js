import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// 썸네일 추출 함수: 본문에서 <img src="..."> 첫 번째 것 가져오기
function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(dir);
  const posts = files.map((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    content.thumbnail = extractFirstImage(content.content);
    return content;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return { props: { posts } };
}

export default function SmartlogPage({ posts }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>📝</span> <span>Smartlog 블로그</span>
      </h1>

      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const textPreview = post.content.replace(/<[^>]+>/g, '').slice(0, 60) + '...';

          return (
            <Link href={`/smartlog/${post.slug}`} key={post.slug}>
              <a className="flex items-start gap-4 p-3 border rounded hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 overflow-hidden rounded">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-400 text-xs text-center p-1">
                      {textPreview}
                    </div>
                  )}
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
  );
}
