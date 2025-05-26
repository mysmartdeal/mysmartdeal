import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  if (!fs.existsSync(dir)) {
    console.warn('📂 smartlog-posts 폴더가 존재하지 않음!');
    return { paths: [], fallback: false };
  }
  const files = fs.readdirSync(dir);
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.json$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/smartlog-posts', `${params.slug}.json`);
  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { post: content } };
}

export default function PostPage({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-lg"></div>
    </div>
  );
}
