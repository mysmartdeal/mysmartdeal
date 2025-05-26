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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Smartlog 블로그</h1>
      {posts.map((post) => (
        <Link href={`/smartlog/${post.slug}`} key={post.slug}>
          <a className="block mb-6 p-4 border rounded hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}
