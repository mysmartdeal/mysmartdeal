// ✅ [slug].js – 메타태그 + OG 태그 + 라벨 + 링크 복사 + 고정형 상단 토스트 메시지
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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
  const [copied, setCopied] = useState(false);
  const previewText = post.content.replace(/<[^>]+>/g, '').slice(0, 100);
  const ogImage = `/images/smartlog-thumbnails/${slug}.jpg`;
  const fullUrl = `https://mysmartdeal.co.kr/smartlog/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
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

      {copied && (
        <div className="fixed top-4 inset-x-0 mx-auto w-fit bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg animate-fade-in">
          ✅ 링크가 복사되었습니다!
        </div>
      )}

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
