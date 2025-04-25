'use client';

import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-2xl font-semibold text-[#30b9c9] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Kategorien
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategories.includes(category)
                  ? 'bg-[#30b9c9] text-white shadow-md'
                  : 'bg-[#23243a] text-[#30b9c9] border border-[#30b9c9] hover:bg-[#167080] hover:text-white'
                }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 