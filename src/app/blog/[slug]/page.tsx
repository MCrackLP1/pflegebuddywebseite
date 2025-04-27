import React from 'react';
import { notFound } from 'next/navigation';
import { blogPosts } from '../blogPosts';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import type { Metadata } from 'next';
import Script from 'next/script';
import BlogPostClientContent from './BlogPostClientContent';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  
  const ogImageUrl = post.imageUrl || '/default-og-image.jpg';
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...(post.categories || []), ...(post.tags || [])],
    authors: [{ name: post.author.name, url: `https://pflegebuddy.care/blog/autor/${post.author.authorId}` }],
    alternates: {
      canonical: `https://pflegebuddy.care/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: [...(post.categories || []), ...(post.tags || [])],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    }
  };
}

// Diese Funktion generiert statische Pfade für alle Blog-Posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
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
  const shareUrl = `https://pflegebuddy.care/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.imageUrl ? `https://pflegebuddy.care${post.imageUrl}` : undefined,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'description': post.author.bio,
      'image': post.author.avatarUrl ? `https://pflegebuddy.care${post.author.avatarUrl}` : undefined,
      'url': `https://pflegebuddy.care/blog/autor/${post.author.authorId}`
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': shareUrl
    },
    'keywords': [...(post.categories || []), ...(post.tags || [])].join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Pflegebuddy',
      'url': 'https://pflegebuddy.care',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://pflegebuddy.care/logo.png'
      }
    }
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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