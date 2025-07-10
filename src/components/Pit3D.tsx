// src/components/Pit3D.tsx
'use client';

import { useGameStore } from '@/store/gameStore';
import { SeedPile } from './SeedPile';
import { Html } from '@react-three/drei';
import { useState } from 'react';

interface Pit3DProps {
  index: number;
  seeds: number;
  position: [number, number, number];
}

export function Pit3D({ index, seeds, position }: Pit3DProps) {
  const { makeMove, currentPlayer, isGameOver, isAIThinking } = useGameStore();
  const [isHovered, setIsHovered] = useState(false);

  const isPlayerPit = currentPlayer === 0 && index < 6;
  const canClick = isPlayerPit && seeds > 0 && !isGameOver && !isAIThinking;

  return (
    <group position={position}>
      {/* === HOLE CUT INTO BOARD (NO WALL) === */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[1.5, 1.5, 2.4, 32, 1, true]} />
        <meshStandardMaterial
          color="#3A2818"
          roughness={1.0}
          side={2}
        />
      </mesh>

      {/* === SMOOTH BOWL BOTTOM (REAL DEPTH) === */}
      <mesh position={[0, -1.0, 0]} receiveShadow>
        <sphereGeometry args={[1.2, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2.3]} />
        <meshStandardMaterial
          color="#4A3728"
          roughness={1.0}
        />
      </mesh>

      {/* === CLICK GLOW === */}
      {canClick && (
        <>
          <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.4, 1.7, 32]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={isHovered ? 1.5 : 0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </>
      )}

      {/* === SEEDS (DEEP INSIDE) === */}
      {seeds > 0 && (
        <>
          <SeedPile count={seeds} baseY={-1.1} />
          <Html center position={[0, 1.4, 0]}>
            <div style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '20px',
              textShadow: '0 0 6px black',
              pointerEvents: 'none',
            }}>
              {seeds}
            </div>
          </Html>
        </>
      )}
    </group>
  );
}