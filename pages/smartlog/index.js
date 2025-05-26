import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// 자동 썸네일 경로 추출
function getAutoThumbnailFromSlug(slug) {
  return `/images/smartlog-thumbnails/${slug}.jpg`;
}

// HTML 태그 제거 후 텍스트 요약
function getTextPreview(html, maxLength = 60) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(dir);
  const posts = files.map((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    const slug = file.replace(/\.json$/, '');
    content.slug = slug;
    content.thumbnail = getAutoThumbnailFromSlug(slug);
    return content;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return { props: { posts } };
}

export default function SmartlogPage({ posts }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>📝</span> <span>SmartLog 블로그</span>
      </h1>

      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          const hasImage = post.thumbnail !== null;
          const previewText = getTextPreview(post.content);

          return (
            <Link href={`/smartlog/${post.slug}`} key={post.slug}>
              <a className="flex items-start gap-4 p-3 border rounded hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 overflow-hidden rounded">
                  {hasImage ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-400 text-xs text-center p-1">
                      {previewText}
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
