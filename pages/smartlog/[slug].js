// ✅ [slug].js – 메타태그 + OG 태그 + 라벨 + 링크 복사 + 상단 토스트 + 최신글 + TOP 버튼
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(dir);
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.json$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postDir = path.join(process.cwd(), 'public/smartlog-posts');
  const files = fs.readdirSync(postDir);

  const posts = files.map((file) => {
    const slug = file.replace(/\.json$/, '');
    const content = JSON.parse(fs.readFileSync(path.join(postDir, file), 'utf8'));
    return { slug, ...content };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const currentPost = posts.find((p) => p.slug === params.slug);
  const recentPosts = posts.filter((p) => p.slug !== params.slug).slice(0, 5);

  return {
    props: {
      post: currentPost,
      slug: currentPost.slug,
      recentPosts
    }
  };
}

export default function PostPage({ post, slug, recentPosts }) {
  const [copied, setCopied] = useState(false);
  const previewText = post.content.replace(/<[^>]+>/g, '').slice(0, 100);
  const ogImage = `/images/smartlog-thumbnails/${slug}.jpg`;
  const fullUrl = `https://mysmartdeal.co.kr/smartlog/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <Head>
        <title>{post.title} | Smartlog</title>
        <meta name="description" content={previewText} />
        <meta name="keywords" content={(post.labels || []).join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={previewText} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={fullUrl} />
      </Head>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{post.date}</p>

      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-lg"></div>

      {post.labels && post.labels.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 text-sm text-blue-600">
          {post.labels.map((label) => (
            <span key={label} className="bg-blue-50 px-2 py-1 rounded">
              #{label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={copyLink}
          className="text-gray-600 hover:text-blue-600 text-sm flex items-center gap-1 transition"
        >
          <span className="text-lg">🔗</span> 링크 복사
        </button>
      </div>

      {/* ✅ 복사 알림 메시지 */}
      {copied && (
        <div className="fixed top-4 inset-x-0 mx-auto w-fit bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg animate-fade-in">
          ✅ 링크가 복사되었습니다!
        </div>
      )}

      {/* ✅ 최신 글 목록 */}
      <div className="mt-12 border-t pt-4">
        <h2 className="text-sm font-bold text-gray-600 mb-2">📂 최근 글</h2>
        <ul className="space-y-2">
          {recentPosts.map((item) => (
            <li key={item.slug} className="flex justify-between text-sm text-gray-700 hover:text-blue-600">
              <Link href={`/smartlog/${item.slug}`} className="truncate">
                {item.title}
              </Link>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ TOP 버튼 */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 text-xs rounded shadow"
      >
        ▲ TOP
      </button>

      <style jsx>{`
        .animate-fade-in {
          animation: fadein 0.3s ease-in-out;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
