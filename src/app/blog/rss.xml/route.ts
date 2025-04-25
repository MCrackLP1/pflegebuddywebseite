import { blogPosts } from '../blogPosts';
import { NextResponse } from 'next/server';

function rfc822(dateString: string) {
  return new Date(dateString).toUTCString();
}

export async function GET() {
  const baseUrl = 'https://pflegebuddy.de';
  const feedItems = blogPosts.map(post => {
    const imageUrl = post.imageUrl ? `${baseUrl}${post.imageUrl}` : null;
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
      <pubDate>${rfc822(post.date)}</pubDate>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Pflegebuddy Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Aktuelle Artikel rund um Pflege, Digitalisierung und Innovationen.</description>
    <language>de</language>
${feedItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  });
} 