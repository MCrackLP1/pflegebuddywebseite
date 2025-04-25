'use client';

import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

type BlogHeroProps = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

export default function BlogHero({ searchQuery, setSearchQuery }: BlogHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#30b9c9] to-[#b2ebf2] pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pflege-Blog
        </motion.h1>
        <motion.p 
          className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Aktuelle Einblicke, praktische Tipps und Expertenwissen rund um die Pflege
        </motion.p>

        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Blog durchsuchen..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 text-[#23243a] backdrop-blur shadow-lg 
                       border-2 border-white/20 focus:border-white focus:outline-none transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
} 