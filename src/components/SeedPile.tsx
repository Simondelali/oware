// src/components/SeedPile.tsx
'use client';
import { useMemo } from 'react';

interface SeedPileProps {
  count: number;
  baseY: number;
}

export function SeedPile({ count, baseY }: SeedPileProps) {
  const positions = useMemo(() => {
    if (count === 0) return [];
    const seeds: [number, number, number][] = [];
    const R = 0.11;
    const H = R * 1.4;
    let placed = 0;
    let layer = 0;

    while (placed < count && layer < 5) {
      const maxInLayer = layer === 0 ? 1 : layer === 1 ? 3 : 4;
      const inLayer = Math.min(maxInLayer, count - placed);
      const radius = layer === 0 ? 0 : layer === 1 ? 0.20 : 0.35;

      for (let i = 0; i < inLayer; i++) {
        const angle = (i / inLayer) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = baseY + layer * H;
        seeds.push([x, y, z]);
        placed++;
      }
      layer++;
    }
    return seeds;
  }, [count, baseY]);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <sphereGeometry args={[0.11, 14, 14]} />
          <meshStandardMaterial color="#D4A017" roughness={0.8} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}