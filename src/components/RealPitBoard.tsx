// src/components/RealPitBoard.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { SeedPile } from './SeedPile';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';

export function RealPitBoard() {
  const { board, stores, currentPlayer, isGameOver, isAIThinking, makeMove } = useGameStore();
  const { scene } = useThree();
  const [boardMesh, setBoardMesh] = useState<THREE.Mesh | null>(null);
  const [hoveredPit, setHoveredPit] = useState<number | null>(null);

  useEffect(() => {
    // === WOOD TEXTURE ===
    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load('/wood.jpg'); // Put a real wood texture in public/wood.jpg
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(8, 4);

    const normalMap = textureLoader.load('/wood-normal.jpg'); // Optional: add normal map
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(8, 4);

    // === BOARD BRUSH ===
    const boardGeometry = new THREE.BoxGeometry(24, 3, 14);
    const boardMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      normalMap: normalMap,
      roughness: 0.8,
      metalness: 0.1,
      color: '#8B6F47',
    });

    const boardBrush = new Brush(boardGeometry, boardMaterial);
    boardBrush.castShadow = true;
    boardBrush.receiveShadow = true;

    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal', 'uv'];

    // === PIT CUTTER (DEEP, ROUND, CARVED) ===
    const pitGeometry = new THREE.CylinderGeometry(1.6, 1.8, 3.5, 32, 1, false, 0, Math.PI * 2);
    const pitBrush = new Brush(pitGeometry);
    pitBrush.position.y = -0.2;

    // === STORE CUTTER (LARGER, DEEP) ===
    const storeGeometry = new THREE.CylinderGeometry(2.8, 3.0, 4.5, 32);
    const storeBrush = new Brush(storeGeometry);

    // === PIT POSITIONS ===
    const pitPositions: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const row = i < 6 ? 1 : 0;
      const col = i < 6 ? i : i - 6;
      const x = (col - 2.5) * 3.6;
      const z = row === 0 ? -4.6 : 4.6;
      pitPositions.push([x, 0, z]);
    }

    // === CUT PITS ===
    let result = boardBrush;
    pitPositions.forEach(pos => {
      const cutter = pitBrush.clone();
      cutter.position.set(...pos);
      cutter.updateMatrixWorld();
      result = evaluator.evaluate(result, cutter, SUBTRACTION);
    });

    // === CUT STORES ===
    const storePos: [number, number, number][] = [[-12.5, 0, 0], [12.5, 0, 0]];
    storePos.forEach(pos => {
      const cutter = storeBrush.clone();
      cutter.position.set(...pos);
      cutter.updateMatrixWorld();
      result = evaluator.evaluate(result, cutter, SUBTRACTION);
    });

    // === ADD WOOD GRAIN TO INNER WALLS ===
    result.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = boardMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    setBoardMesh(result);

    return () => {
      result.geometry.dispose();
      if (Array.isArray(result.material)) {
        result.material.forEach(m => m.dispose());
      } else {
        result.material.dispose();
      }
    };
  }, []);

  const handlePitClick = (index: number) => {
    const isPlayerPit = currentPlayer === 0 && index < 6;
    if (isPlayerPit && board[index] > 0 && !isGameOver && !isAIThinking) {
      makeMove(index);
    }
  };

  const getPitPos = (i: number): [number, number, number] => {
    const row = i < 6 ? 1 : 0;
    const col = i < 6 ? i : i - 6;
    const x = (col - 2.5) * 3.6;
    const z = row === 0 ? -4.6 : 4.6;
    return [x, 1.6, z];
  };

  return (
    <group>
      {/* === REALISTIC WOODEN BOARD === */}
      {boardMesh && <primitive object={boardMesh} />}

      {/* === CLICKABLE PITS (INVISIBLE) === */}
      {board.map((count, i) => {
        const isPlayerPit = currentPlayer === 0 && i < 6;
        const canClick = isPlayerPit && count > 0 && !isGameOver && !isAIThinking;
        const isHovered = hoveredPit === i;

        return (
          <group key={`pit-${i}`} position={getPitPos(i)}>
            <mesh
              onClick={() => handlePitClick(i)}
              onPointerOver={() => canClick && setHoveredPit(i)}
              onPointerOut={() => setHoveredPit(null)}
              visible={false}
            >
              <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* HOVER GLOW */}
            {canClick && isHovered && (
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.4, 1.8, 32]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={1.5}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* === SEEDS (DEEP IN PITS) === */}
      {board.map((count, i) => {
        if (count === 0) return null;
        const pos = getPitPos(i);
        pos[1] = -0.8;
        return (
          <group key={`seeds-${i}`} position={pos}>
            <SeedPile count={count} baseY={-1.4} />
          </group>
        );
      })}

      {/* === STORES === */}
      {stores[0] > 0 && (
        <group position={[-12.5, -1.2, 0]}>
          <SeedPile count={stores[0]} baseY={-1.8} />
        </group>
      )}
      {stores[1] > 0 && (
        <group position={[12.5, -1.2, 0]}>
          <SeedPile count={stores[1]} baseY={-1.8} />
        </group>
      )}
    </group>
  );
}