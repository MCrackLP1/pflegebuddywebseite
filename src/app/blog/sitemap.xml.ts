import { blogPosts } from './blogPosts';
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://pflegebuddy.de';
  const urls = [
    ...blogPosts.map(post => `${baseUrl}/blog/${post.slug}`),
    ...Array.from(new Set(blogPosts.map(post => `${baseUrl}/blog/autor/${post.author.authorId}`)))
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 