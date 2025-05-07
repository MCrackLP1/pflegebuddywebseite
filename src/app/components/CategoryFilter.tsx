'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-6">
      <div className="max-w-6xl mx-auto bg-[#1a1b2e] rounded-lg overflow-hidden shadow-sm">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left px-5 py-4 hover:bg-[#20213a] transition-colors"
        >
          <div className="flex items-center">
            <motion.h2 
              className="text-xl font-semibold text-[#30b9c9]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Kategorien
            </motion.h2>
            
            {selectedCategories.length > 0 && (
              <span className="text-sm ml-3 bg-[#30b9c9] text-white px-2 py-0.5 rounded-full">
                {selectedCategories.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            {selectedCategories.length > 0 && (
              <div className="mr-4 flex flex-wrap gap-1 max-w-md overflow-hidden">
                {selectedCategories.slice(0, 3).map((cat) => (
                  <span key={cat} className="px-2 py-0.5 text-xs bg-[#23243a] text-[#30b9c9] rounded-full border border-[#30b9c9]/30">
                    {cat}
                  </span>
                ))}
                {selectedCategories.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-[#23243a] text-[#30b9c9] rounded-full border border-[#30b9c9]/30">
                    +{selectedCategories.length - 3}
                  </span>
                )}
              </div>
            )}
            
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#23243a] p-1 rounded-full"
            >
              <IoChevronDown className="text-[#30b9c9] text-lg" />
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="px-5 py-4 border-t border-[#30b9c9]/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${selectedCategories.includes(category)
                        ? 'bg-[#30b9c9] text-white shadow-md'
                        : 'bg-[#23243a] text-[#30b9c9] border border-[#30b9c9]/30 hover:border-[#30b9c9] hover:bg-[#23243a]'
                      }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 