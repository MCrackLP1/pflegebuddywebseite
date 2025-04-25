'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useEffect, useState, Suspense, useRef } from 'react';
import * as THREE from 'three';

function Model() {
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<THREE.Group>();
  const [time, setTime] = useState(0);
  
  try {
    const { scene } = useGLTF('/spline/smartphone.glb');
    
    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = 0.1;
              child.material.metalness = 1.0;
              child.material.envMapIntensity = 2.5;
              if (child.material.color) {
                const color = child.material.color;
                const hsl = {};
                color.getHSL(hsl);
                color.setHSL(hsl.h, Math.min(hsl.s * 1.4, 1.0), hsl.l);
              }
            }
          }
        });
      }
      return () => {
        useGLTF.preload('/spline/smartphone.glb');
      };
    }, [scene]);

    useFrame((state) => {
      if (modelRef.current) {
        modelRef.current.rotation.y = (Math.sin(state.clock.elapsedTime * 0.5) * (Math.PI / 8)) - (Math.PI / 32);
      }
    });

    return (
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={4}
        position={[0.7, 0.2, 0]}
        rotation={[-Math.PI * 0.08, 0, Math.PI]}
      />
    );
  } catch (err) {
    console.error('Error loading model:', err);
    setError(err instanceof Error ? err.message : 'Failed to load model');
    return null;
  }
}

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setMounted(true);
      useGLTF.preload('/spline/smartphone.glb');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-red-50">
        <div className="text-red-600 text-center">
          <p className="font-bold">Fehler beim Laden der 3D-Ansicht</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ 
          position: [1, 0, 6],
          fov: 45 
        }}
        style={{
          background: 'transparent',
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
          outputEncoding: THREE.sRGBEncoding,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={[2, 4]}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <Suspense fallback={null}>
          <Model />
          <Environment 
            preset="city" 
            background={false} 
            blur={0.4}
            intensity={1.2}
          />
          <AccumulativeShadows
            temporal
            frames={100}
            color="black"
            colorBlend={0.5}
            opacity={0.8}
            scale={10}
          >
            <RandomizedLight
              amount={8}
              radius={4}
              ambient={0.5}
              intensity={1}
              position={[5, 5, -10]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </Suspense>
      </Canvas>
    </div>
  );
} 