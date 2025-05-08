import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/app/blog/blogPosts';

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug-Parameter fehlt' },
        { status: 400 }
      );
    }
    
    const postsDir = path.join(process.cwd(), 'blog-posts');
    const filePath = path.join(postsDir, `${slug}.json`);
    
    // Überprüfe, ob Datei existiert
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Blog-Beitrag wurde nicht gefunden' },
        { status: 404 }
      );
    }
    
    // Lese Datei und parse JSON
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const post = JSON.parse(fileContent) as BlogPost;
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Fehler beim Abrufen des Blog-Beitrags:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 