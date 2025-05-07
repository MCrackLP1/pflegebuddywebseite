import React from 'react';
import { notFound } from 'next/navigation';
import { blogPosts } from '../blogPosts';
import type { Metadata } from 'next';
import Script from 'next/script';
import BlogPostClientContent from './BlogPostClientContent';
import fs from 'fs';
import path from 'path';

// Diese Funktion findet einen Blogbeitrag anhand des Slugs
// Sie sucht sowohl in statischen als auch in dynamischen Beiträgen
async function findBlogPost(slug: string) {
  // Zuerst in statischen Beiträgen suchen
  const staticPost = blogPosts.find((p) => p.slug === slug);
  if (staticPost) return staticPost;
  
  // Wenn nicht gefunden, in dynamischen JSON-Dateien suchen
  const postsDir = path.join(process.cwd(), 'blog-posts');
  const jsonPath = path.join(postsDir, `${slug}.json`);
  
  try {
    if (fs.existsSync(jsonPath)) {
      const fileContent = fs.readFileSync(jsonPath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error(`Error reading or parsing ${jsonPath}:`, error);
  }
  
  // Kein Beitrag gefunden
  return null;
}

// Diese Funktion lädt alle Blogbeiträge (statisch + dynamisch)
async function getAllBlogPosts() {
  const staticPosts = [...blogPosts];
  
  // Dynamische Beiträge aus JSON-Dateien laden
  const postsDir = path.join(process.cwd(), 'blog-posts');
  let dynamicPosts = [];
  
  try {
    if (fs.existsSync(postsDir)) {
      const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
          const post = JSON.parse(fileContent);
          // Überprüfe, ob der Beitrag nicht bereits in den statischen Beiträgen vorhanden ist
          if (!staticPosts.some(staticPost => staticPost.slug === post.slug)) {
            dynamicPosts.push(post);
          }
        } catch (error) {
          console.error(`Error parsing ${file}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading dynamic blog posts:', error);
  }
  
  // Alle Beiträge kombinieren
  return [...staticPosts, ...dynamicPosts];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await findBlogPost(params.slug);
  if (!post) return {};
  
  const ogImageUrl = post.imageUrl || '/default-og-image.webp';
  
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
  const allPosts = await getAllBlogPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await findBlogPost(params.slug);
  if (!post) notFound();

  // Alle Beiträge für die verwandten Beiträge laden
  const allPosts = await getAllBlogPosts();

  // Related posts: share at least one category, not the current post
  const related = allPosts.filter(
    (p) => p.slug !== post.slug && p.categories.some((cat: string) => post.categories.includes(cat))
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
      '@id': `https://pflegebuddy.care/blog/${post.slug}`
    },
    'keywords': [...(post.categories || []), ...(post.tags || [])].join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'Pflegebuddy',
      'url': 'https://pflegebuddy.care',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://pflegebuddy.care/logo.webp'
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