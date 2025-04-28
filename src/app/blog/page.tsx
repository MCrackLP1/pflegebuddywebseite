'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import BlogHero from '../components/BlogHero';
import BlogGrid from '../components/BlogGrid';
import CategoryFilter from '../components/CategoryFilter';
import { blogPosts } from './blogPosts';
import TagFilter from '../components/TagFilter';
import { useSearchParams } from 'next/navigation';

function BlogPageContent() {
  // Extract all unique categories and tags from blogPosts
  const allCategories = useMemo(() => Array.from(
    new Set(blogPosts.flatMap(post => post.categories))
  ), []);
  const allTags = useMemo(() => Array.from(
    new Set(blogPosts.flatMap(post => post.tags || []))
  ), []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = useSearchParams();
  useEffect(() => {
    const tag = searchParams.get('tag');
    if (tag && allTags.includes(tag) && !selectedTags.includes(tag)) {
      setSelectedTags([tag]);
    }
  }, [searchParams, allTags, selectedTags]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter posts by search, selected categories AND tags
  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategories.length === 0 || post.categories.some(cat => selectedCategories.includes(cat));
    const tagMatch = selectedTags.length === 0 || post.tags?.some(tag => selectedTags.includes(tag));
    const search = searchQuery.trim().toLowerCase();
    const searchMatch =
      !search ||
      post.title.toLowerCase().includes(search) ||
      post.excerpt?.toLowerCase().includes(search) ||
      post.content?.toLowerCase().includes(search) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search))) ||
      (post.categories && post.categories.some(cat => cat.toLowerCase().includes(search)));
    return categoryMatch && tagMatch && searchMatch;
  });

  return (
    <main className="min-h-screen bg-[#23243a]">
      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto px-4 py-12">
        <CategoryFilter
          categories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagChange={handleTagChange}
        />
        <BlogGrid posts={filteredPosts} />
      </div>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Lade Blog...</div>}>
      <BlogPageContent />
    </Suspense>
  );
} 