'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import Image from 'next/image';

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

function FallbackComponent() {
  return (
    <div className="flex items-center justify-center h-96 bg-gray-50">
      <div className="text-center">
        <Image 
          src="/mockup-smartphone.webp" 
          alt="Pflegebuddy App Mockup" 
          width={200} 
          height={400} 
          className="mx-auto mb-4"
        />
        <p className="text-gray-600">3D-Modell wird geladen...</p>
      </div>
    </div>
  );
}

export default function ThreeSceneClient() {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <ThreeScene />
    </ErrorBoundary>
  );
} 