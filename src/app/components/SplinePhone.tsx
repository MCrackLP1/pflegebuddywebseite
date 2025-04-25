'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ModelCanvas component with no SSR
const ModelCanvas = dynamic(() => import('./ModelCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function SplinePhone() {
  return (
    <div className="w-full h-[600px] relative">
      <ModelCanvas />
    </div>
  );
} 