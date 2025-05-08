'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';

type BlogPostPreview = {
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: string[];
  tags: string[];
  slug: string;
  date: string;
  content: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
};

export default function BlogPreview() {
  const [blogPost, setBlogPost] = useState<BlogPostPreview | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Überprüfen der Authentifizierung bei Seitenladung
    const auth = localStorage.getItem('admin-auth');
    
    if (auth !== 'true') {
      router.push('/admin');
      return;
    }
    
    setIsAuthenticated(true);
    
    // BlogPost aus localStorage laden
    const previewData = localStorage.getItem('blog-preview');
    if (previewData) {
      try {
        const parsedData = JSON.parse(previewData);
        setBlogPost(parsedData);
      } catch (error) {
        console.error('Fehler beim Parsen der Vorschaudaten:', error);
      }
    }
  }, [router]);
  
  if (!isAuthenticated || !blogPost) {
    return (
      <main className="min-h-screen bg-[#23243a] flex items-center justify-center">
        <div className="text-[#f3f6fa] text-xl">Lade Vorschau...</div>
      </main>
    );
  }
  
  // Markdown in HTML umwandeln
  const contentHtml = marked(blogPost.content);
  
  // Datum formatieren
  const formattedDate = new Date(blogPost.date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    // Scroll to top when entering fullscreen mode
    if (!isFullscreen) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="min-h-screen bg-[#23243a] pb-16 pt-20">
      <div className={`mx-auto px-4 transition-all ${isFullscreen ? 'max-w-5xl' : 'max-w-4xl'}`}>
        <div className="bg-[#1a1b2e] p-4 rounded-md mb-6 flex justify-between items-center">
          <h2 className="text-[#30b9c9] font-bold">Vorschau-Modus</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors text-sm"
            >
              {isFullscreen ? 'Kompakte Ansicht' : 'Detailansicht'}
            </button>
            <Link 
              href="/admin/dashboard/new"
              className="px-4 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors text-sm"
            >
              Zurück zum Formular
            </Link>
          </div>
        </div>
        
        <article 
          className={`bg-[#1a1b2e] rounded-xl overflow-hidden cursor-pointer hover:border-[#30b9c9] ${isFullscreen ? 'border-2 border-[#30b9c9]' : 'border border-transparent'} transition-all`}
          onClick={toggleFullscreen}
        >
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={blogPost.imageUrl}
              alt={blogPost.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          
          <div className={`p-6 md:p-8 ${isFullscreen ? 'md:p-10' : ''}`}>
            <div className="flex flex-wrap gap-2 mb-4">
              {blogPost.categories.map((category, index) => (
                <span key={index} className="px-3 py-1 bg-[#30b9c9]/20 text-[#30b9c9] rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
            
            <h1 className={`font-bold text-[#f3f6fa] mb-4 ${isFullscreen ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
              {blogPost.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {blogPost.author.avatarUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={blogPost.author.avatarUrl}
                      alt={blogPost.author.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <span className="text-[#f3f6fa]">{blogPost.author.name}</span>
              </div>
              <span className="text-[#f3f6fa]/70">{formattedDate}</span>
            </div>
            
            {!isFullscreen && (
              <div className="text-[#30b9c9] mb-4 flex items-center">
                <span className="mr-2">Zum Lesen klicken</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div 
              className={`prose prose-invert prose-p:text-[#f3f6fa] prose-headings:text-[#30b9c9] max-w-none mb-8 ${isFullscreen ? '' : 'line-clamp-6'}`}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {!isFullscreen && (
              <div className="text-[#30b9c9] my-4">
                Klicke für die vollständige Ansicht...
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-8">
              {blogPost.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-[#30b9c9]/10 text-[#30b9c9] rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
} 