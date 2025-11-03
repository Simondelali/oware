// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { Home, RotateCcw, Settings, Trophy, Users, HelpCircle } from 'lucide-react';
import { OwareBoard3D } from '@/components/OwareBoard3D';
import { useGameStore } from '@/store/gameStore';

export default function OwareGame() {
  const { stores, reset, difficulty, setDifficulty, isGameOver, winner, isAIThinking } = useGameStore();
  const [showRules, setShowRules] = useState(false);

  const playerScore = stores[0];
  const opponentScore = stores[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-md bg-black/30 border-b border-orange-700/30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-2xl">🎲</span>
              </div>
              <span className="text-2xl font-bold text-white">Ghana Games</span>
            </a>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
                <HelpCircle className="w-5 h-5" />
              </button>
              <a href="/">
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Game Area */}
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">OWARE</h1>
          <p className="text-orange-200 text-lg">Traditional Ghanaian Strategy Game</p>
        </div>

        {/* Players Info */}
        <div className="flex justify-between items-center mb-6">
          {/* Opponent */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-red-500/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white/70 text-sm font-semibold">Opponent</div>
              <div className="text-2xl font-black text-white">{opponentScore} seeds</div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex gap-3">
            <button 
              onClick={reset}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold transition-all hover:scale-105 flex items-center gap-2 border border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </button>
          </div>

          {/* Player */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-green-500/50">
            <div>
              <div className="text-white/70 text-sm font-semibold text-right">You</div>
              <div className="text-2xl font-black text-white text-right">{playerScore} seeds</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Game Board - 3D Canvas */}
        <div className="relative h-[600px] bg-black/20 rounded-3xl overflow-hidden border-4 border-amber-950/50 shadow-2xl">
          <OwareBoard3D />
        </div>

        {/* Game Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-orange-300 text-sm font-bold mb-1">Game Mode</div>
            <div className="text-white text-lg font-bold">Player vs AI</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-orange-300 text-sm font-bold mb-1">Difficulty</div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-transparent text-white text-lg font-bold cursor-pointer"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-orange-300 text-sm font-bold mb-1">Total Seeds</div>
            <div className="text-white text-lg font-bold">48 seeds</div>
          </div>
        </div>

        {/* Quick Rules */}
        <div className="mt-8 bg-gradient-to-r from-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
          <h3 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Quick Rules
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-orange-100">
            <div>
              <span className="font-bold text-orange-300">1. Select a pit</span> from your side to distribute seeds
            </div>
            <div>
              <span className="font-bold text-orange-300">2. Capture seeds</span> when your last seed lands in opponent's pit with 2-3 seeds
            </div>
            <div>
              <span className="font-bold text-orange-300">3. Win the game</span> by capturing more than 24 seeds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}