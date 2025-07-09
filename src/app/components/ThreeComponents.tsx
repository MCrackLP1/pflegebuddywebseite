'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/spline/smartphone.glb');
  const { gl } = useThree();
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material && child.material.map) {
            child.material.map.anisotropy = gl.capabilities.getMaxAnisotropy();
            child.material.map.minFilter = THREE.LinearFilter;
            child.material.map.magFilter = THREE.NearestFilter;
            child.material.map.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, gl]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = (Math.sin(state.clock.elapsedTime * 0.5) * (Math.PI / 8)) - (Math.PI / 32);
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={8.3}
      position={[0, 0, 0]}
      rotation={[-Math.PI * 0.08, 0, Math.PI]}
    />
  );
}

function Fallback() {
  return <group />;
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [1, 0, 10.5], fov: 48 }}
      style={{ width: '100%', height: '400px', background: 'transparent' }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={<Fallback />}>
        {/* Simple lighting setup instead of Environment to avoid HDR loading issues */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <hemisphereLight intensity={0.2} />
        <Model />
      </Suspense>
    </Canvas>
  );
} 