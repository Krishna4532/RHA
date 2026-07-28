"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function FloatingHalo() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 3]} />
      <meshStandardMaterial emissive="#F58220" emissiveIntensity={0.35} transparent opacity={0.15} />
    </mesh>
  );
}

export function IntroScene() {
  const background = useMemo(() => new THREE.Color('#000000'), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }}>
        <color attach="background" args={[background]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 4]} intensity={1.4} color="#F58220" />
        <FloatingHalo />
      </Canvas>
    </div>
  );
}
