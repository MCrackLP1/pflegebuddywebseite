'use client';
import React from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '../blog/blogPosts';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          imageUrl={post.imageUrl}
          categories={post.categories}
          slug={post.slug}
          date={post.date}
        />
      ))}
    </div>
  );
} 