import React from 'react';
import { notFound } from 'next/navigation';
import { blogPosts } from '../blogPosts';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import type { Metadata } from 'next';
import Head from 'next/head';
import BlogPostClientContent from './BlogPostClientContent';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
  };
}

function getReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function getShareUrl(slug: string) {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return `https://pflegebuddy.de/blog/${slug}`;
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Related posts: share at least one category, not the current post
  const related = blogPosts.filter(
    (p) => p.slug !== post.slug && p.categories.some((cat) => post.categories.includes(cat))
  ).slice(0, 3);

  const readingTime = getReadingTime(post.content);

  // Share URLs
  const shareUrl = `https://pflegebuddy.de/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.imageUrl ? `https://pflegebuddy.de${post.imageUrl}` : undefined,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'description': post.author.bio,
      'image': post.author.avatarUrl ? `https://pflegebuddy.de${post.author.avatarUrl}` : undefined,
      'url': `https://pflegebuddy.de/blog/autor/${post.author.authorId}`
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'mainEntityOfPage': shareUrl,
    'keywords': [...(post.categories || []), ...(post.tags || [])].join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Pflegebuddy',
      'url': 'https://pflegebuddy.de',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://pflegebuddy.de/spline/logo.png'
      }
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <main className="min-h-screen bg-[#23243a] pb-16">
        <BlogPostClientContent
          post={post}
          related={related}
          shareUrl={shareUrl}
          shareText={shareText}
          readingTime={readingTime}
        />
      </main>
    </>
  );
} 