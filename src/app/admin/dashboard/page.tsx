'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/app/blog/blogPosts';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Überprüfen der Authentifizierung bei Seitenladung
    const auth = localStorage.getItem('admin-auth');
    const user = localStorage.getItem('admin-user');
    
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      setUsername(user || '');
      fetchBlogPosts();
    }
  }, [router]);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/blog/list');
      const data = await response.json();
      
      if (response.ok) {
        setBlogPosts(data.posts || []);
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

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-user');
    router.push('/admin');
  };

  const confirmDelete = (slug: string) => {
    setDeleteConfirm(slug);
    setDeleteError('');
    setDeleteSuccess('');
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDelete = async (slug: string) => {
    setIsDeleting(true);
    setDeleteError('');
    
    try {
      const response = await fetch(`/api/blog/delete?slug=${slug}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        if (result.isStaticPost) {
          setDeleteSuccess(`Beitrag "${slug}" ist in der statischen blogPosts.ts Datei definiert. Bitte kontaktiere Mark, damit er den Beitrag von dort entfernt.`);
        } else {
          setDeleteSuccess(`Beitrag "${slug}" wurde erfolgreich gelöscht`);
          // Aktualisiere die Beitragsliste
          setBlogPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
        }
      } else {
        setDeleteError(result.error || 'Fehler beim Löschen des Beitrags');
      }
    } catch (err) {
      setDeleteError('Beitrag konnte nicht gelöscht werden');
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return null; // Oder eine Ladeanzeige
  }

  return (
    <main className="min-h-screen bg-[#23243a] pb-16 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#30b9c9]">Blog-Verwaltung</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-[#f3f6fa]">Angemeldet als: <span className="text-[#30b9c9]">{username}</span></span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>

        {deleteSuccess && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6 text-green-200">
            {deleteSuccess}
          </div>
        )}

        {deleteError && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-red-200">
            {deleteError}
          </div>
        )}

        <div className="bg-[#1a1b2e] rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#f3f6fa]">Blogbeiträge</h2>
            <Link 
              href="/admin/dashboard/new"
              className="px-4 py-2 text-[#1a1b2e] bg-[#30b9c9] rounded-md hover:bg-[#27a0af] transition-colors"
            >
              Neuen Beitrag erstellen
            </Link>
          </div>
          
          <p className="text-[#f3f6fa] mb-4">
            Hier kannst du neue Blogbeiträge erstellen oder löschen.
          </p>
          
          <div className="bg-[#23243a] rounded-lg p-4">
            <h3 className="text-lg font-medium text-[#30b9c9] mb-2">Wichtige Hinweise:</h3>
            <ul className="list-disc list-inside text-[#f3f6fa] space-y-1">
              <li>Du kannst Beiträge erstellen oder löschen</li>
              <li>Neue Beiträge erscheinen jetzt automatisch auf der Website</li>
              <li>Du kannst Bilder im .webp-Format direkt über das Formular hochladen (max. 2MB)</li>
              <li>Verwende Markdown für die Formatierung (Überschriften mit #, Listen mit *, etc.)</li>
            </ul>
          </div>
        </div>

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1b2e] rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#f3f6fa] mb-4">Beitrag löschen?</h3>
              <p className="text-[#f3f6fa] mb-6">
                Möchtest du den Beitrag "{deleteConfirm}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-[#f3f6fa] border border-[#30b9c9]/50 rounded-md hover:bg-[#30b9c9]/10 transition-colors"
                  disabled={isDeleting}
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Wird gelöscht...' : 'Löschen bestätigen'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <Link 
            href="/admin/dashboard/new"
            className="bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-xl p-6 hover:border-[#30b9c9] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[#30b9c9] mb-2">Neuen Beitrag erstellen</h3>
            <p className="text-[#f3f6fa]">
              Erstelle einen neuen Blogbeitrag mit Titel, Inhalt, Bildern und mehr.
            </p>
          </Link>
          
          <div className="bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#30b9c9] mb-4">Deine Beiträge</h3>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-[#30b9c9] text-lg">Beiträge werden geladen...</div>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
                {error}
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-[#f3f6fa] text-lg">Keine Beiträge gefunden</div>
                <div className="text-[#f3f6fa]/70 mt-2">Erstelle deinen ersten Beitrag!</div>
              </div>
            ) : (
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div 
                    key={post.slug} 
                    className="bg-[#23243a] rounded-lg p-4 flex flex-col md:flex-row gap-4 border border-transparent hover:border-[#30b9c9]/30 transition-colors"
                  >
                    <div className="relative w-full md:w-40 h-32 rounded-md overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-[#f3f6fa] mb-1">{post.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((category, index) => (
                          <span key={index} className="px-2 py-0.5 bg-[#30b9c9]/20 text-[#30b9c9] rounded-full text-xs">
                            {category}
                          </span>
                        ))}
                      </div>
                      <p className="text-[#f3f6fa]/70 text-sm mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-[#f3f6fa]/50 text-xs">
                          {formatDate(post.date)} • {post.author.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => confirmDelete(post.slug)}
                            className="px-3 py-1 text-red-300 border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors text-sm"
                          >
                            Löschen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-[#1a1b2e] border border-[#30b9c9]/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#30b9c9] mb-2">So werden deine Beiträge verwaltet</h3>
            <ol className="list-decimal list-inside text-[#f3f6fa] space-y-2 ml-2">
              <li>Du erstellst und speicherst einen neuen Beitrag über das Dashboard</li>
              <li>Der Beitrag wird automatisch in der Blog-Seite angezeigt</li>
              <li>Wenn du einen dynamisch erstellten Beitrag löschst, wird er sofort aus der Anzeige entfernt</li>
              <li>Für ältere statische Beiträge: Diese können nur durch Änderung der Datei <code className="bg-[#23243a] px-2 py-1 rounded text-[#30b9c9]">src/app/blog/blogPosts.ts</code> vollständig entfernt werden</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
} 