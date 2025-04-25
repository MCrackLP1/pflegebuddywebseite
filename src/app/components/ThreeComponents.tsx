'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/spline/smartphone.glb');
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
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
      position={[0, 0.2, 0]}
      rotation={[-Math.PI * 0.08, 0, Math.PI]}
    />
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[600px] relative mx-auto">
      <Canvas
        camera={{ position: [1, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
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
          <Environment preset="city" background={false} blur={0.4} />
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