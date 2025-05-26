import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(dir);
  const posts = files.map((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    return content;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return { props: { posts } };
}

export default function SmartlogPage({ posts }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>📝</span> <span>Smartlog 블로그</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link href={`/smartlog/${post.slug}`} key={post.slug}>
            <a className="block border rounded overflow-hidden shadow-sm hover:shadow-md transition bg-white">
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{post.date}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
