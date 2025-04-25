'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: string[];
  slug: string;
  date: string;
}

export default function BlogCard({
  title,
  excerpt,
  imageUrl,
  categories,
  slug,
  date
}: BlogCardProps) {
  return (
    <motion.article 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-xs font-medium text-[#30b9c9] bg-[#e6f7f9] rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-[#30b9c9] transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <time className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </Link>
    </motion.article>
  );
} 