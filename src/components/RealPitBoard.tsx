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
  const boardRef = useRef<THREE.Mesh | null>(null);
  const [boardMesh, setBoardMesh] = useState<THREE.Mesh | null>(null);
  const [hoveredPit, setHoveredPit] = useState<number | null>(null);

  useEffect(() => {
    if (boardRef.current) {
      scene.remove(boardRef.current);
      boardRef.current.geometry.dispose();
      if (Array.isArray(boardRef.current.material)) {
        boardRef.current.material.forEach(m => m.dispose());
      } else {
        boardRef.current.material.dispose();
      }
    }

    const boardBrush = new Brush(new THREE.BoxGeometry(22, 2.4, 13));
    boardBrush.material = new THREE.MeshStandardMaterial({
      color: '#8B6F47',
      roughness: 0.9,
    });

    const evaluator = new Evaluator();
    evaluator.attributes = ['position', 'normal', 'uv'];

    const pitCutter = new Brush(new THREE.CylinderGeometry(1.5, 1.5, 3, 32));
    const storeCutter = new Brush(new THREE.CylinderGeometry(2.4, 2.4, 4, 32));

    const pitPositions: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const row = i < 6 ? 1 : 0;
      const col = i < 6 ? i : i - 6;
      const x = (col - 2.5) * 3.3;
      const z = row === 0 ? -4.0 : 4.0;
      pitPositions.push([x, 0, z]);
    }

    let result = boardBrush;
    pitPositions.forEach(pos => {
      const cutter = pitCutter.clone();
      cutter.position.set(...pos);
      cutter.updateMatrixWorld();
      result = evaluator.evaluate(result, cutter, SUBTRACTION);
    });

    const storePos: [number, number, number][] = [[-11, 0, 0], [11, 0, 0]];
    storePos.forEach(pos => {
      const cutter = storeCutter.clone();
      cutter.position.set(...pos);
      cutter.updateMatrixWorld();
      result = evaluator.evaluate(result, cutter, SUBTRACTION);
    });

    result.castShadow = true;
    result.receiveShadow = true;
    boardRef.current = result;
    setBoardMesh(result);

    return () => {
      if (boardRef.current) {
        boardRef.current.geometry.dispose();
        if (Array.isArray(boardRef.current.material)) {
          boardRef.current.material.forEach(m => m.dispose());
        } else {
          boardRef.current.material.dispose();
        }
      }
    };
  }, []);

  const handlePitClick = (index: number) => {
    const isPlayerPit = currentPlayer === 0 && index < 6;
    if (isPlayerPit && board[index] > 0 && !isGameOver && !isAIThinking) {
      console.log(`CLICKED PIT ${index}`);
      makeMove(index);
    }
  };

  const getPitPos = (i: number): [number, number, number] => {
    const row = i < 6 ? 1 : 0;
    const col = i < 6 ? i : i - 6;
    const x = (col - 2.5) * 3.3;
    const z = row === 0 ? -4.0 : 4.0;
    return [x, 1.2, z]; // Top of board
  };

  return (
    <group>
      {/* === CSG BOARD === */}
      {boardMesh && <primitive object={boardMesh} />}

      {/* === CLICKABLE + HOVER PITS === */}
      {board.map((count, i) => {
        const isPlayerPit = currentPlayer === 0 && i < 6;
        const canClick = isPlayerPit && count > 0 && !isGameOver && !isAIThinking;
        const isHovered = hoveredPit === i;

        return (
          <group key={`pit-${i}`} position={getPitPos(i)}>
            {/* Invisible Click Mesh */}
            <mesh
              onClick={() => handlePitClick(i)}
              onPointerOver={() => canClick && setHoveredPit(i)}
              onPointerOut={() => setHoveredPit(null)}
              visible={false}
            >
              <cylinderGeometry args={[1.4, 1.4, 0.1, 32]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Hover Glow */}
            {canClick && isHovered && (
              <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.3, 1.6, 32]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={1.2}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            )}
          </group>
        );
      })}

      {/* === SEEDS IN PITS === */}
      {board.map((count, i) => {
        if (count === 0) return null;
        const pos = getPitPos(i);
        pos[1] = 0; // Inside hole
        return (
          <group key={`seeds-${i}`} position={pos}>
            <SeedPile count={count} baseY={-1.0} />
            <Html center position={[0, 1.8, 0]}>
              <div style={{
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '20px',
                textShadow: '0 0 6px black',
                pointerEvents: 'none'
              }}>
                {count}
              </div>
            </Html>
          </group>
        );
      })}

      {/* === STORES === */}
      {stores[0] > 0 && (
        <group position={[-11, 0, 0]}>
          <SeedPile count={stores[0]} baseY={-1.5} />
          <Html center position={[0, 3.5, 0]}>
            <div style={{
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '28px',
              textShadow: '0 0 8px black',
              pointerEvents: 'none'
            }}>
              YOU: {stores[0]}
            </div>
          </Html>
        </group>
      )}
      {stores[1] > 0 && (
        <group position={[11, 0, 0]}>
          <SeedPile count={stores[1]} baseY={-1.5} />
          <Html center position={[0, 3.5, 0]}>
            <div style={{
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '28px',
              textShadow: '0 0 8px black',
              pointerEvents: 'none'
            }}>
              AI: {stores[1]}
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}