'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import { IoBookmarkOutline } from 'react-icons/io5';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onTagChange }: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!tags.length) return null;
  
  return (
    <div className="mb-6">
      <div className="max-w-6xl mx-auto bg-[#1a1b2e] rounded-lg overflow-hidden shadow-sm">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left px-5 py-4 hover:bg-[#20213a] transition-colors"
        >
          <div className="flex items-center">
            <IoBookmarkOutline className="text-[#30b9c9] text-xl mr-2" />
            <motion.h3 
              className="text-xl font-semibold text-[#30b9c9]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Tags
            </motion.h3>
            
            {selectedTags.length > 0 && (
              <span className="text-sm ml-3 bg-[#30b9c9] text-white px-2 py-0.5 rounded-full">
                {selectedTags.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            {selectedTags.length > 0 && (
              <div className="mr-4 flex flex-wrap gap-1 max-w-md overflow-hidden">
                {selectedTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-[#23243a] text-[#30b9c9] rounded-full border border-[#30b9c9]/30">
                    #{tag}
                  </span>
                ))}
                {selectedTags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-[#23243a] text-[#30b9c9] rounded-full border border-[#30b9c9]/30">
                    +{selectedTags.length - 3}
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
                {tags.map((tag, index) => (
                  <motion.button
                    key={tag}
                    onClick={() => onTagChange(tag)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border
                      ${selectedTags.includes(tag)
                        ? 'bg-[#30b9c9] text-white border-[#30b9c9] shadow-sm'
                        : 'bg-[#23243a] text-[#30b9c9] border-[#30b9c9]/30 hover:border-[#30b9c9]'
                      }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    #{tag}
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