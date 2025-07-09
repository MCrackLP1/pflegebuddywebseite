import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
        crawlDelay: 0, // Faster crawling for Google
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://www.pflegebuddy.app/sitemap.xml',
    host: 'https://www.pflegebuddy.app',
  }
} 