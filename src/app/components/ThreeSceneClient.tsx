'use client';

import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeComponents'), {
  ssr: false,
  loading: () => (
    <div className="text-[#30b9c9] flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#30b9c9] mb-2"></div>
        <div>Lade 3D Modell...</div>
      </div>
    </div>
  )
});

export default function ThreeSceneClient() {
  return <ThreeScene />;
} 