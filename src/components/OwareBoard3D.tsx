// src/components/OwareBoard3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';
import { RealPitBoard } from './RealPitBoard';
import { Hand } from './Hand';
import { Suspense } from 'react';

export function OwareBoard3D() {
  const { currentPlayer, isGameOver, winner, isAIThinking, stores } = useGameStore();

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <Canvas shadows camera={{ position: [0, 10, 16], fov: 50 }}>
        <PerspectiveCamera makeDefault />
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minDistance={12} maxDistance={28} />

        {/* LIGHTING */}
        <directionalLight position={[12, 22, 10]} intensity={2.0} castShadow shadow-mapSize={[4096, 4096]} />
        <ambientLight intensity={0.35} />
        <hemisphereLight intensity={0.6} color="#FDB813" groundColor="#5D4037" />

        <Suspense fallback={null}>
          <RealPitBoard />
          <Hand />
        </Suspense>

        <Environment preset="sunset" />
      </Canvas>

      {/* UI PANEL */}
      <div className="absolute top-4 left-4 bg-gradient-to-br from-amber-900 to-amber-700 text-white p-6 rounded-2xl shadow-2xl max-w-md">
        <h1 className="text-3xl font-bold mb-3">Oware</h1>
        <div className="text-xl font-bold mb-4">
          {isGameOver
            ? winner === null ? "Draw!" : winner === 0 ? "You Win!" : "AI Wins!"
            : isAIThinking ? "AI thinking..." : currentPlayer === 0 ? "Your Turn" : "AI's Turn"}
        </div>
        <div className="flex justify-between text-lg">
          <span>You:</span>
          <span className="font-bold text-2xl text-yellow-300">{stores[0]}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>AI:</span>
          <span className="font-bold text-2xl text-yellow-300">{stores[1]}</span>
        </div>
      </div>

      {/* DEBUG / SETTINGS (Optional) */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg">
          New Game
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Show Rules
        </button>
      </div>
    </div>
  );
}