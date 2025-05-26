// ✅ [slug].js – 메타태그 + OG 태그 자동 적용
import fs from 'fs';
import path from 'path';
import Head from 'next/head';

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(dir);
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.json$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/smartlog-posts', `${params.slug}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { post: content, slug: params.slug } };
}

export default function PostPage({ post, slug }) {
  const previewText = post.content.replace(/<[^>]+>/g, '').slice(0, 100);
  const ogImage = `/images/smartlog-thumbnails/${slug}.jpg`;
  const fullUrl = `https://mysmartdeal.co.kr/smartlog/${slug}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Head>
        <title>{post.title} | Smartlog</title>
        <meta name="description" content={previewText} />
        <meta name="keywords" content={(post.labels || []).join(', ')} />

        {/* OG 태그 */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={previewText} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={fullUrl} />
      </Head>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-lg"></div>
    </div>
  );
}
