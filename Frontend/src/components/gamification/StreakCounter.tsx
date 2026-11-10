import React from 'react';

export interface StreakCounterProps {
  currentStreak: number;
  freezeCount?: number;
  isActiveToday?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  freezeCount = 0,
  isActiveToday = false,
}) => {
  return (
    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs select-none rounded-none">
      <span className="text-zinc-500 font-semibold tracking-wider">RACHA:</span>
      <div className="flex items-center gap-1">
        <span
          className={`h-2 w-2 rounded-none ${
            isActiveToday ? 'bg-amber-400 animate-pulse' : 'bg-zinc-700'
          }`}
        />
        <span className="font-bold text-amber-400 tracking-wider">
          {currentStreak}D
        </span>
      </div>
      {freezeCount > 0 && (
        <span className="border-l border-zinc-800 pl-2 text-cyan-400 text-[10px]" title="Escudos de racha disponibles">
          [FZ:{freezeCount}]
        </span>
      )}
    </div>
  );
};
