'use client';

import { motion } from 'framer-motion';

interface StoreProps {
  seeds: number;
  player: 'South' | 'North';
}

export function Store({ seeds, player }: StoreProps) {
  return (
    <div className="relative w-24 h-48 bg-amber-800 rounded-full border-8 border-amber-950 flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-700 to-transparent opacity-50" />
      <span className="text-sm font-semibold">{player}</span>
      <motion.span
        key={seeds}
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold drop-shadow-lg"
      >
        {seeds}
      </motion.span>
    </div>
  );
}