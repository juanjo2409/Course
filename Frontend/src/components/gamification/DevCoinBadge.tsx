import React from 'react';

export interface DevCoinBadgeProps {
  amount: number;
}

export const DevCoinBadge: React.FC<DevCoinBadgeProps> = ({ amount }) => {
  return (
    <div className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-300 rounded-none select-none">
      <span className="text-emerald-500 font-bold">$DEV:</span>
      <span className="font-bold tracking-wider text-emerald-400">{amount}</span>
    </div>
  );
};
