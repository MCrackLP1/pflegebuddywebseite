'use client';

import dynamic from 'next/dynamic';

// Dynamically import Three.js components
const ThreeScene = dynamic(() => import('./ThreeComponents'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function ModelCanvas() {
  return <ThreeScene />;
} 