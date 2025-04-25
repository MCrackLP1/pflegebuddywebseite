'use client';
import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost } from '../blogPosts';

interface BlogPostClientContentProps {
  post: BlogPost;
  related: BlogPost[];
  shareUrl: string;
  shareText: string;
  readingTime: number;
}

export default function BlogPostClientContent({ post, related, shareUrl, shareText, readingTime }: BlogPostClientContentProps) {
  return (
    <>
      <article className="max-w-3xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-16 backdrop-blur">
        <h1 className="text-3xl font-bold mb-4 text-[#30b9c9]">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((cat) => (
            <span key={cat} className="px-3 py-1 text-xs font-medium text-[#30b9c9] bg-[#23243a] border border-[#30b9c9] rounded-full">
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-4">
          {post.author.avatarUrl && (
            <a href={`/blog/autor/${post.author.authorId}`}><Image src={post.author.avatarUrl} alt={post.author.name} width={40} height={40} className="rounded-full" /></a>
          )}
          <div>
            <a href={`/blog/autor/${post.author.authorId}`} className="font-medium text-[#30b9c9] hover:underline">{post.author.name}</a>
            <time className="block text-sm text-[#f3f6fa]/70">
              {new Date(post.date).toLocaleDateString('de-DE', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          </div>
          <span className="ml-auto text-xs text-[#30b9c9] bg-[#23243a] border border-[#30b9c9] px-2 py-1 rounded-full">{readingTime} Min. Lesezeit</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags && post.tags.map((tag) => (
            <a key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="px-2 py-1 text-xs bg-[#23243a] text-[#30b9c9] border border-[#30b9c9] rounded hover:bg-[#30b9c9] hover:text-white transition-colors">#{tag}</a>
          ))}
        </div>
        <div className="prose max-w-none text-[#f3f6fa] prose-headings:text-[#30b9c9] prose-a:text-[#30b9c9] prose-blockquote:border-[#30b9c9] prose-table:mx-auto prose-table:w-full prose-table:border prose-table:border-[#30b9c9]/30 prose-th:bg-[#23243a] prose-th:text-[#30b9c9] prose-th:p-2 prose-td:p-2 prose-td:border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
        {/* Share Buttons */}
        <div className="mt-10 mb-6 flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-[#f3f6fa]">Teilen:</span>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-[#1877f3] hover:underline font-semibold">Facebook</a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] hover:underline font-semibold">Twitter</a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-[#30b9c9] hover:underline font-semibold">LinkedIn</a>
          <button onClick={() => {navigator.clipboard.writeText(shareUrl)}} className="text-[#f3f6fa] hover:text-[#30b9c9] underline font-semibold">Link kopieren</button>
        </div>
        {/* Comments Placeholder */}
        <div className="mt-10 border-t pt-8 border-[#30b9c9]/30">
          <h3 className="text-lg font-bold mb-2 text-[#30b9c9]">Kommentare</h3>
          <div className="text-[#f3f6fa]/70 italic">Kommentarfunktion folgt bald!</div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-xl font-bold mb-6 text-[#30b9c9]">Weitere Beiträge aus ähnlichen Kategorien</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <a key={rel.slug} href={`/blog/${rel.slug}`} className="block bg-[#23243a]/90 rounded-xl shadow hover:shadow-lg transition-shadow p-4 border border-[#30b9c9]/30">
                <div className="flex items-center gap-4 mb-2">
                  {rel.imageUrl && (
                    <Image src={rel.imageUrl} alt={rel.title} width={60} height={60} className="rounded-lg object-cover" />
                  )}
                  <div>
                    <div className="font-semibold text-[#f3f6fa] line-clamp-2">{rel.title}</div>
                    <div className="text-xs text-[#30b9c9] mt-1">
                      {rel.categories.map((cat) => (
                        <span key={cat} className="mr-1">{cat}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[#f3f6fa]/80 text-sm line-clamp-2">{rel.excerpt}</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
} 