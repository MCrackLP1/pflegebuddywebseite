'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import BlogHero from '../components/BlogHero';
import BlogGrid from '../components/BlogGrid';
import CategoryFilter from '../components/CategoryFilter';
import { BlogPost } from './blogPosts';
import TagFilter from '../components/TagFilter';
import { useSearchParams } from 'next/navigation';

function BlogPageContent() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Lade Blogposts beim Öffnen der Seite
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/list');
        const data = await response.json();
        
        if (response.ok) {
          setAllPosts(data.posts || []);
        } else {
          setError(data.error || 'Fehler beim Laden der Beiträge');
        }
      } catch (err) {
        setError('Beiträge konnten nicht geladen werden');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Extract all unique categories and tags from allPosts
  const allCategories = useMemo(() => Array.from(
    new Set(allPosts.flatMap(post => post.categories))
  ), [allPosts]);
  const allTags = useMemo(() => Array.from(
    new Set(allPosts.flatMap(post => post.tags || []))
  ), [allPosts]);
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
  const filteredPosts = allPosts.filter(post => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#23243a] flex items-center justify-center">
        <div className="text-[#30b9c9] text-xl">Lade Blogbeiträge...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#23243a] flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 max-w-md">
          {error}
        </div>
      </div>
    );
  }

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