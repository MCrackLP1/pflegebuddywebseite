'use client';
import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onTagChange }: TagFilterProps) {
  if (!tags.length) return null;
  return (
    <div className="py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold text-[#30b9c9] mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border
                ${selectedTags.includes(tag)
                  ? 'bg-[#30b9c9] text-white border-[#30b9c9] shadow-md'
                  : 'bg-[#23243a] text-[#30b9c9] border-[#30b9c9] hover:bg-[#167080] hover:text-white'
                }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 