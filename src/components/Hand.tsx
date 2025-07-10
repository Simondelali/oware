'use client';

import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';

export function Hand() {
  const { lastMove } = useGameStore();
  const [anim, setAnim] = useState<{ path: number[]; idx: number } | null>(null);

  useEffect(() => {
    if (lastMove?.path && lastMove.path.length > 0) {
      console.log('✋ Hand animation starting, path:', lastMove.path);
      setAnim({ path: lastMove.path, idx: 0 });
    }
  }, [lastMove]);

  useFrame((_, delta) => {
    if (anim) {
      if (anim.idx < anim.path.length) {
        setAnim(prev => prev && { ...prev, idx: prev.idx + delta * 5 });
      } else if (anim.idx >= anim.path.length) {
        // Clear animation after a short delay
        setTimeout(() => setAnim(null), 200);
      }
    }
  });

  if (!anim || anim.path.length === 0) return null;
  
  const currentIndex = Math.floor(anim.idx);
  if (currentIndex >= anim.path.length) return null;

  const pos = getPitPosition(anim.path[currentIndex]);
  const progress = anim.idx - currentIndex;
  
  // Smooth arc motion
  const arcHeight = 3 + Math.sin(progress * Math.PI) * 1.5;
  
  return (
    <group position={[pos[0], arcHeight, pos[2]]}>
      {/* Main seed being moved */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#A0826D" 
          emissive="#FFD700" 
          emissiveIntensity={0.5}
          roughness={0.9}
        />
      </mesh>

      {/* Glow trail effect */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial 
          color="#FFD700" 
          transparent
          opacity={0.3}
          emissive="#FFD700"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Light following the seed */}
      <pointLight 
        intensity={2} 
        color="#FFAA00" 
        distance={5}
        decay={2}
      />

      {/* Additional spotlight for dramatic effect */}
      <spotLight
        position={[0, 2, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#FFD700"
        castShadow={false}
      />
    </group>
  );
}

function getPitPosition(index: number): [number, number, number] {
  const row = index < 6 ? 1 : 0;
  const col = index < 6 ? index : index - 6;
  const x = (col - 2.5) * 3.0;
  const z = row === 0 ? -4.0 : 4.0;
  return [x, 0, z];
}