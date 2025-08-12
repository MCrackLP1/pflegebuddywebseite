import React from 'react';
import { blogPosts } from '../blogPosts';
import Image from 'next/image';

export default function AutorenUebersicht() {
  // Get all unique authors
  const authors = Array.from(
    new Map(
      blogPosts.map(post => [post.author.authorId, post.author])
    ).values()
  );

  return (
    <main className="min-h-screen bg-[#23243a] pb-16">
      <section className="max-w-4xl mx-auto bg-[#23243a]/90 rounded-3xl shadow-lg p-8 mt-8 backdrop-blur">
        <h1 className="text-2xl font-bold text-[#30b9c9] mb-8 text-center">Unser Team & Autoren</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {authors.map(author => {
            const avatarSrc = author.authorId === 'mark-tietz'
              ? '/author-mark.webp'
              : author.avatarUrl;
            return (
              <a key={author.authorId} href={`/blog/autor/${author.authorId}`} className="flex flex-col items-center bg-[#23243a] border border-[#30b9c9]/30 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                {avatarSrc && (
                  <Image src={avatarSrc} alt={author.name} width={64} height={64} className="rounded-full mb-3" />
                )}
                <div className="font-semibold text-lg text-[#30b9c9] mb-1">{author.name}</div>
                {author.bio && <div className="text-[#f3f6fa]/80 text-sm text-center mb-2">{author.bio}</div>}
                <span className="text-xs text-[#30b9c9]">Alle Beiträge ansehen</span>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
} 