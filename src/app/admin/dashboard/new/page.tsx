'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Vordefinierte Kategorien und Tags von bestehenden Blogbeiträgen
// const PREDEFINED_CATEGORIES = [ ... ];
// const PREDEFINED_TAGS = [ ... ];

export default function NewBlogPost() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  // Blog-Formular Daten
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('/spline/');
  const [categories, setCategories] = useState(['Pflege']);
  const [tags, setTags] = useState(['']);
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('Pflege');
  const [tagsInput, setTagsInput] = useState('');
  
  // Status-Variablen
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Neue Zustände für den Bildupload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Überprüfen der Authentifizierung bei Seitenladung
    const auth = localStorage.getItem('admin-auth');
    
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      
      // Restore form data from localStorage if available
      const savedFormData = localStorage.getItem('blog-creator-form');
      if (savedFormData) {
        try {
          const formData = JSON.parse(savedFormData);
          setTitle(formData.title || '');
          setExcerpt(formData.excerpt || '');
          setImageUrl(formData.imageUrl || '/spline/');
          setCategories(formData.categories || ['Pflege']);
          setTags(formData.tags || ['']);
          setSlug(formData.slug || '');
          setContent(formData.content || '');
          setCategoriesInput(formData.categoriesInput || 'Pflege');
          setTagsInput(formData.tagsInput || '');
        } catch (err) {
          console.error('Error parsing saved form data:', err);
        }
      }
    }
  }, [router]);
  
  useEffect(() => {
    // Slug aus Titel generieren
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title]);
  
  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriesInput(e.target.value);
    setCategories(e.target.value.split(',').map(cat => cat.trim()).filter(cat => cat !== ''));
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setTags(e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''));
  };
  
  const handleRemoveCategory = (category: string) => {
    const newCategories = categories.filter(cat => cat !== category);
    setCategories(newCategories);
    setCategoriesInput(newCategories.join(', '));
  };
  
  const handleRemoveTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    setTagsInput(newTags.join(', '));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    // Blogbeitrag-Objekt erstellen
    const blogPost = {
      title,
      excerpt,
      imageUrl,
      categories,
      tags,
      slug,
      date: dateString,
      content,
      author: {
        name: "Tim Werner",
        avatarUrl: "/spline/author-tim.webp",
        authorId: "tim-werner",
        bio: "Pflegewissenschaftler, Co-Autor bei Pflegebuddy. Setzt sich für Reformen und digitale Lösungen in der Pflege ein."
      }
    };
    
    try {
      // Senden des Blogbeitrags an eine API-Route
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPost),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Speichern des Blogbeitrags');
      }
      
      setSuccess(`
        Dein Blogbeitrag wurde erfolgreich gespeichert!
        
        Der Beitrag wird jetzt automatisch auf der Blog-Seite angezeigt und ist sofort für Besucher sichtbar.
        
        Zusätzlich wurde eine formatierte Version deines Beitrags in der Datei "${result.formattedFilePath}" gespeichert, 
        falls Mark den Beitrag später fest in die blogPosts.ts-Datei übernehmen möchte.
      `);
      
      // Optional: Formular zurücksetzen
      setTitle('');
      setExcerpt('');
      setImageUrl('/spline/');
      setCategoriesInput('Pflege');
      setCategories(['Pflege']);
      setTagsInput('');
      setTags(['']);
      setSlug('');
      setContent('');
      
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte speichere deinen Beitrag lokal und sende ihn per E-Mail an Mark.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePreview = () => {
    // Save form state to localStorage before preview
    const formState = {
      title,
      excerpt,
      imageUrl,
      categories,
      tags,
      slug,
      content,
      categoriesInput,
      tagsInput
    };
    localStorage.setItem('blog-creator-form', JSON.stringify(formState));
    
    // Speichere Formularinhalte im localStorage für die Vorschau
    const previewData = {
      title,
      excerpt,
      imageUrl,
      categories,
      tags,
      slug,
      date: new Date().toISOString().split('T')[0],
      content,
      author: {
        name: "Tim Werner",
        avatarUrl: "/spline/author-tim.webp"
      }
    };
    localStorage.setItem('blog-preview', JSON.stringify(previewData));
    
    // Zur Vorschauseite navigieren
    router.push('/admin/dashboard/preview');
  };
  
  // Neue Funktion für den Bildupload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Überprüfe Dateiendung
    if (!file.name.endsWith('.webp')) {
      setUploadError('Nur .webp-Dateien sind erlaubt');
      return;
    }
    
    // Überprüfe Dateigröße (max 2MB)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in Bytes
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Die Datei darf maximal 2MB groß sein');
      return;
    }
    
    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Hochladen');
      }
      
      setImageUrl(result.url);
      setUploadSuccess(`Bild erfolgreich hochgeladen: ${result.url}`);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setUploadError('Fehler beim Hochladen des Bildes. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (!isAuthenticated) {
    return null; // Oder eine Ladeanzeige
  }

  return (
    <main className="min-h-screen bg-[#23243a] pb-16 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#30b9c9]">Neuen Blogbeitrag erstellen</h1>
          
          <Link 
            href="/admin/dashboard"
            className="px-4 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
          >
            Zurück zum Dashboard
          </Link>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200 whitespace-pre-line">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-[#f3f6fa] mb-2">
                  Titel*
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-[#f3f6fa] mb-2">
                  Kurzbeschreibung* (wird in der Blogübersicht angezeigt)
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="imageUpload" className="block text-[#f3f6fa] mb-2">
                  Bild hochladen* (nur .webp-Format)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    id="imageUpload"
                    ref={fileInputRef}
                    accept=".webp"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                  />
                  
                  {uploadError && (
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  )}
                  
                  {uploadSuccess && (
                    <p className="text-green-400 text-sm">{uploadSuccess}</p>
                  )}
                  
                  {isUploading && (
                    <p className="text-[#30b9c9] text-sm">Bild wird hochgeladen...</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-[#f3f6fa] mb-2">
                  Bild-URL* (wird automatisch ausgefüllt nach Upload)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                  required
                />
                {imageUrl && imageUrl !== '/spline/' && (
                  <div className="mt-2 border border-[#30b9c9]/30 rounded-md p-2 bg-[#1a1b2e]/50">
                    <p className="text-sm text-[#f3f6fa] mb-1">Bildvorschau:</p>
                    <img 
                      src={imageUrl} 
                      alt="Vorschau"
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="categories" className="block text-[#f3f6fa] mb-2">
                  Kategorien* (durch Kommas getrennt)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    id="categories"
                    value={categoriesInput}
                    onChange={handleCategoriesChange}
                    className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                    required
                  />
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-[#30b9c9]/20 text-[#30b9c9] rounded-md text-sm flex items-center gap-1"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-1 text-[#30b9c9] hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-[#f3f6fa] mb-2">
                  Tags* (durch Kommas getrennt)
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    id="tags"
                    value={tagsInput}
                    onChange={handleTagsChange}
                    className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                    required
                  />
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-[#30b9c9]/10 text-[#30b9c9] rounded-md text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-[#30b9c9] hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-[#f3f6fa] mb-2">
                  URL-Slug* (wird automatisch generiert)
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9]"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-[#f3f6fa] mb-2">
                Inhalt* (Markdown-Format)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-2 bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-md text-[#f3f6fa] focus:outline-none focus:border-[#30b9c9] font-mono"
                required
              />
              <p className="text-sm text-[#f3f6fa]/70 mt-2">
                Verwende Markdown für die Formatierung:<br />
                # Überschrift 1<br />
                ## Überschrift 2<br />
                **Fett** oder *Kursiv*<br />
                - Listenpunkt<br />
                [Link](https://example.com)
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handlePreview}
              className="px-6 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
            >
              Vorschau
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Wird gespeichert...' : 'Beitrag speichern'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 