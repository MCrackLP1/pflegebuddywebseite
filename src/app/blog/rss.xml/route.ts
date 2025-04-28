import { blogPosts } from '../blogPosts';
import { NextResponse } from 'next/server';

function rfc822(dateString: string) {
  return new Date(dateString).toUTCString();
}

export async function GET() {
  const baseUrl = 'https://pflegebuddy.care';
  const feedItems = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20) // Nur die 20 neuesten Beiträge im Feed
    .map(post => {
      const imageUrl = post.imageUrl ? `${baseUrl}${post.imageUrl}` : null;
      const categories = post.categories?.map(category => 
        `      <category><![CDATA[${category}]]></category>`
      ).join('\n');
      
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content.substring(0, 500)}... <a href="${baseUrl}/blog/${post.slug}">Weiterlesen</a>]]></content:encoded>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
      <pubDate>${rfc822(post.date)}</pubDate>
      <author>info@pflegebuddy.care (${post.author.name})</author>
${categories || ''}
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
  <channel>
    <title>Pflegebuddy Blog</title>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}/blog</link>
    <description>Aktuelle Artikel rund um Pflege, Digitalisierung und Innovationen.</description>
    <lastBuildDate>${rfc822(new Date().toISOString())}</lastBuildDate>
    <language>de-DE</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${baseUrl}/logo.webp</url>
      <title>Pflegebuddy Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
${feedItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
} 