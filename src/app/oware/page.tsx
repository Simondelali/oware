// src/app/page.tsx
'use client';

import { OwareBoard3D } from '@/components/OwareBoard3D';
import { useGameStore } from '@/store/gameStore';
import { RotateCcw, Brain, Info } from 'lucide-react';
import { useState } from 'react';

export default function OwarePage() {
  const { reset, difficulty, setDifficulty, isGameOver, winner, stores } = useGameStore();
  const [showRules, setShowRules] = useState(false);
  
  return (
    <div className="relative">
      <OwareBoard3D />
      
      <div className="absolute top-4 right-4 bg-white/95 p-5 rounded-xl shadow-xl space-y-3 z-40">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-amber-700" />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-amber-100 text-amber-900 text-sm font-semibold cursor-pointer border-2 border-amber-300 hover:bg-amber-200 transition-colors"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-700 text-white rounded-lg text-sm font-bold hover:bg-amber-800 transition-colors shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          New Game
        </button>

        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
        >
          <Info className="w-4 h-4" />
          {showRules ? 'Hide Rules' : 'Show Rules'}
        </button>

        {isGameOver && (
          <div className="pt-3 border-t border-amber-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-900 mb-2">
                {winner === null ? 'Draw!' : winner === 0 ? 'You Win!' : 'AI Wins!'}
              </p>
              <p className="text-sm text-amber-700">
                Final Score: {stores[0]} - {stores[1]}
              </p>
            </div>
          </div>
        )}
      </div>

      {showRules && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/98 p-6 rounded-xl shadow-2xl max-w-2xl z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-amber-900">Anan-Anan Rules</h2>
            <button 
              onClick={() => setShowRules(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4 text-amber-900">
            <div>
              <h3 className="font-bold text-lg mb-2">Objective</h3>
              <p className="text-sm text-amber-800">
                Capture more seeds than your opponent before the game ends.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">How to Play</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Click any pit on your side (bottom row) that has seeds</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Seeds are distributed counter-clockwise, one per pit</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>If last seed lands in a non-empty pit, pick up those seeds and continue</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Turn ends when last seed lands in an empty pit</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Capturing Seeds</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>During distribution:</strong> If a pit on YOUR side reaches exactly 4 seeds, you capture them</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Last seed special rule:</strong> If the last seed makes ANY pit have 4 seeds, you capture them (even from opponent's side!)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Game End</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>When only 8 seeds remain on the board, the last player to capture takes all 8</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>If one side becomes empty, remaining seeds go to the player on whose side they are</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Player with the most captured seeds wins!</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
              <h3 className="font-bold text-lg mb-2">Quick Tips</h3>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Watch for pits with 3 seeds - you can capture with your last seed!</li>
                <li>• Plan your moves to create capture opportunities</li>
                <li>• The relay rule lets you make multiple captures in one turn</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}