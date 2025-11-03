// src/components/OwareBoard3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';
import { RealPitBoard } from './RealPitBoard';
import { Hand } from './Hand';
import { Suspense, useState } from 'react';
import { RotateCcw, Brain, Info } from 'lucide-react';

export function OwareBoard3D() {
  const { currentPlayer, isGameOver, winner, isAIThinking, stores, reset, difficulty, setDifficulty } = useGameStore();
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 overflow-hidden">
      {/* 3D Canvas */}
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

      {/* === MAIN UI PANEL (Left) === */}
      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10 max-w-sm">
        <h1 className="text-4xl font-black text-white mb-3 tracking-tight">OWARE</h1>
        
        <div className="mb-4">
          <p className="text-2xl font-bold text-yellow-300">
            {isGameOver
              ? winner === null ? "Draw!" : winner === 0 ? "You Win!" : "AI Wins!"
              : isAIThinking ? "AI thinking..." : currentPlayer === 0 ? "Your Turn" : "AI's Turn"}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-semibold">You</span>
            <span className="text-3xl font-black text-green-400">{stores[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-semibold">AI</span>
            <span className="text-3xl font-black text-red-400">{stores[1]}</span>
          </div>
        </div>
      </div>

      {/* === CONTROL PANEL (Right) === */}
      <div className="absolute top-6 right-6 bg-white/95 p-5 rounded-xl shadow-2xl space-y-4 z-40 border border-amber-200">
        {/* Difficulty */}
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-amber-700" />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-amber-100 text-amber-900 font-bold text-sm cursor-pointer border-2 border-amber-300 hover:bg-amber-200 transition-colors"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* New Game */}
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-bold text-sm hover:from-amber-700 hover:to-amber-800 transition-all shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>

        {/* Show Rules */}
        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
        >
          <Info className="w-4 h-4" />
          {showRules ? 'Hide Rules' : 'Show Rules'}
        </button>

        {/* Game Over Result */}
        {isGameOver && (
          <div className="pt-3 border-t border-amber-200 text-center">
            <p className="text-xl font-bold text-amber-900 mb-1">
              {winner === null ? 'Draw!' : winner === 0 ? 'You Win!' : 'AI Wins!'}
            </p>
            <p className="text-sm text-amber-700 font-medium">
              Final Score: {stores[0]} - {stores[1]}
            </p>
          </div>
        )}
      </div>

      {/* === RULES MODAL === */}
      {showRules && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/98 p-6 rounded-2xl shadow-2xl max-w-2xl z-50 max-h-[80vh] overflow-y-auto border border-amber-200">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-black text-amber-900">Oware Rules</h2>
            <button 
              onClick={() => setShowRules(false)}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-5 text-amber-900">
            <div>
              <h3 className="font-bold text-lg mb-2">Objective</h3>
              <p className="text-sm text-amber-800">
                Capture more seeds than your opponent to win.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">How to Play</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex gap-2"><span className="font-bold">1.</span> Click a pit on your side (bottom row)</li>
                <li className="flex gap-2"><span className="font-bold">2.</span> Seeds are sown counter-clockwise, one per pit</li>
                <li className="flex gap-2"><span className="font-bold">3.</span> If last seed lands in a pit with 2 or 3 seeds, capture them</li>
                <li className="flex gap-2"><span className="font-bold">4.</span> Continue sowing if the last pit had seeds</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Game End</h3>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Game ends when a player cannot move</li>
                <li>• Remaining seeds go to the player whose side they are on</li>
                <li>• Player with 25+ seeds wins</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
              <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
              <p className="text-sm text-amber-800">
                Plan ahead — setting up chains of captures is key to victory!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}