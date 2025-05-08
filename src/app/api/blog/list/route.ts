import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost, blogPosts } from '@/app/blog/blogPosts';

export async function GET() {
  try {
    // Zuerst importieren wir die statischen Blogposts aus der blogPosts.ts Datei
    const staticPosts = [...blogPosts];
    
    const postsDir = path.join(process.cwd(), 'blog-posts');
    let dynamicPosts: BlogPost[] = [];
    
    // Check if directory exists
    if (fs.existsSync(postsDir)) {
      // Read all JSON files in the directory
      const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
          const post = JSON.parse(fileContent) as BlogPost;
          
          // Überprüfe, ob der Beitrag nicht bereits in den statischen Beiträgen vorhanden ist
          if (!staticPosts.some(staticPost => staticPost.slug === post.slug)) {
            dynamicPosts.push(post);
          }
        } catch (error) {
          console.error(`Error parsing ${file}:`, error);
        }
      }
    }
    
    // Kombiniere statische und dynamische Beiträge
    const allPosts = [...staticPosts, ...dynamicPosts];
    
    // Sort posts by date (newest first)
    allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 