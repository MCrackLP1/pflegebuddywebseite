import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/app/blog/blogPosts';

// Diese Konfiguration verhindert statisches Rendering für API-Routen
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const blogPost = await req.json() as BlogPost;
    
    // Validierung der Eingaben
    if (!blogPost.title || !blogPost.excerpt || !blogPost.content || !blogPost.slug) {
      return NextResponse.json(
        { error: 'Fehlende Pflichtfelder' },
        { status: 400 }
      );
    }
    
    // Überprüfe Blog-Format und vervollständige fehlende Daten
    if (!blogPost.author) {
      blogPost.author = {
        name: "Tim Werner",
        avatarUrl: "/spline/author-tim.webp",
        authorId: "tim-werner",
        bio: "Pflegewissenschaftler, Co-Autor bei Pflegebuddy. Setzt sich für Reformen und digitale Lösungen in der Pflege ein."
      };
    }
    
    // 1. Speicherung als JSON-Datei im Dateisystem für spätere Verwendung
    const postsDir = path.join(process.cwd(), 'blog-posts');
    
    // Erstelle Verzeichnis, falls es nicht existiert
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }
    
    const filePath = path.join(postsDir, `${blogPost.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(blogPost, null, 2));
    
    // 2. Erstelle einen JavaScript-Code-Block im Format, der in blogPosts.ts eingefügt werden kann
    const blogPostFormatted = `  {
    title: "${blogPost.title.replace(/"/g, '\\"')}",
    excerpt: "${blogPost.excerpt.replace(/"/g, '\\"')}",
    imageUrl: "${blogPost.imageUrl}",
    categories: [${blogPost.categories.map(cat => `"${cat.replace(/"/g, '\\"')}"`).join(', ')}],
    tags: [${blogPost.tags.map(tag => `"${tag.replace(/"/g, '\\"')}"`).join(', ')}],
    slug: "${blogPost.slug}",
    date: "${blogPost.date}",
    content: \`
${blogPost.content}
\`,
    author: {
      name: "${blogPost.author.name.replace(/"/g, '\\"')}",
      avatarUrl: "${blogPost.author.avatarUrl}",
      authorId: "${blogPost.author.authorId}",
      bio: "${blogPost.author.bio?.replace(/"/g, '\\"')}"
    }
  },`;
    
    // Speichere den formatierten Code in einer separaten Datei
    const formattedFilePath = path.join(postsDir, `${blogPost.slug}.formatted.js`);
    fs.writeFileSync(formattedFilePath, blogPostFormatted);
    
    // Optional: Versuche den Beitrag direkt in die blogPosts.ts-Datei einzufügen
    // Dies ist ein riskanter Vorgang und sollte bei Bedarf auskommentiert werden
    // Hier wird der neue Beitrag an erster Stelle eingefügt
    
    /*
    try {
      const blogPostsFilePath = path.join(process.cwd(), 'src', 'app', 'blog', 'blogPosts.ts');
      let blogPostsContent = fs.readFileSync(blogPostsFilePath, 'utf8');
      
      // Suche nach dem Array-Start
      const arrayStartPattern = 'export const blogPosts: BlogPost[] = [';
      const arrayStartIndex = blogPostsContent.indexOf(arrayStartPattern);
      
      if (arrayStartIndex !== -1) {
        // Füge den neuen Beitrag direkt nach dem Array-Start ein
        const insertPosition = arrayStartIndex + arrayStartPattern.length;
        blogPostsContent = 
          blogPostsContent.substring(0, insertPosition) + 
          '\n' + blogPostFormatted + '\n' +
          blogPostsContent.substring(insertPosition);
        
        fs.writeFileSync(blogPostsFilePath, blogPostsContent);
      }
    } catch (error) {
      console.error('Fehler beim direkten Einfügen in blogPosts.ts:', error);
      // Kein Fehler werfen, da die Speicherung trotzdem erfolgreich war
    }
    */
    
    return NextResponse.json({ 
      success: true,
      message: 'Blogbeitrag erfolgreich gespeichert. Der Beitrag kann jetzt manuell in die blogPosts.ts-Datei übertragen werden.',
      formattedFilePath: `blog-posts/${blogPost.slug}.formatted.js`
    });
  } catch (error) {
    console.error('Fehler beim Speichern des Blogbeitrags:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 