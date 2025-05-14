import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { blogPosts } from '@/app/blog/blogPosts';

// Diese Konfiguration ist notwendig, da die Route nextUrl.searchParams verwendet
export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug-Parameter fehlt' },
        { status: 400 }
      );
    }
    
    const postsDir = path.join(process.cwd(), 'blog-posts');
    
    // Überprüfe, ob Verzeichnis existiert und erstelle es, falls nicht
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }
    
    const jsonPath = path.join(postsDir, `${slug}.json`);
    const formattedPath = path.join(postsDir, `${slug}.formatted.js`);
    
    let deleted = false;
    let isStaticPost = false;
    
    // Überprüfe, ob der Beitrag in der statischen Liste existiert
    isStaticPost = blogPosts.some(post => post.slug === slug);
    
    // Lösche JSON-Datei, falls vorhanden
    if (fs.existsSync(jsonPath)) {
      fs.unlinkSync(jsonPath);
      deleted = true;
    }
    
    // Lösche formatierte JS-Datei, falls vorhanden
    if (fs.existsSync(formattedPath)) {
      fs.unlinkSync(formattedPath);
      deleted = true;
    }
    
    // Wenn es ein statischer Beitrag ist, geben wir trotzdem eine Erfolgsmeldung zurück
    if (isStaticPost) {
      return NextResponse.json({ 
        success: true,
        message: 'Dieser Beitrag ist in der statischen blogPosts.ts Datei definiert. Bitte entfernen Sie den Beitrag manuell aus dieser Datei, um ihn vollständig zu löschen.',
        isStaticPost: true,
        slug: slug
      });
    }
    
    // Wenn weder dynamisch noch statisch gefunden wurde
    if (!deleted && !isStaticPost) {
      return NextResponse.json(
        { error: 'Blog-Beitrag wurde nicht gefunden' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Blog-Beitrag wurde erfolgreich gelöscht.',
      slug: slug
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Blog-Beitrags:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 