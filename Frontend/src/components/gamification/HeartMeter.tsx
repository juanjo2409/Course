import React from 'react';

export interface HeartMeterProps {
  current: number;
  max?: number;
  isUnlimited?: boolean;
}

export const HeartMeter: React.FC<HeartMeterProps> = ({
  current,
  max = 5,
  isUnlimited = false,
}) => {
  if (isUnlimited) {
    return (
      <div className="flex items-center gap-1.5 border border-cyan-800 bg-cyan-950/40 px-2.5 py-1 font-mono text-xs text-cyan-300 rounded-none select-none">
        <span className="font-bold tracking-wider">PWR_CELLS:</span>
        <span className="font-bold tracking-widest">[INF]</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-300 rounded-none select-none">
      <span className="text-zinc-500 font-semibold tracking-wider">VIDAS:</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < current;
          return (
            <div
              key={index}
              className={`h-3 w-2.5 border transition-colors rounded-none ${
                isFilled
                  ? 'bg-red-500 border-red-400'
                  : 'bg-zinc-900 border-zinc-700 opacity-40'
              }`}
            />
          );
        })}
      </div>
      <span className={`font-bold ml-0.5 ${current <= 1 ? 'text-red-400' : 'text-zinc-300'}`}>
        [{current}/{max}]
      </span>
    </div>
  );
};
