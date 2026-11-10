import React from 'react';

export interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: 'emerald' | 'amber' | 'cyan';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  color = 'emerald',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / (total || 1)) * 100)));

  const colorMap = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
  }[color];

  return (
    <div className={`w-full font-mono ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-zinc-400 mb-1">
          <span className="uppercase tracking-wider">PROGRESO [{current}/{total}]</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-zinc-800 border border-zinc-700 rounded-none overflow-hidden">
        <div
          className={`h-full ${colorMap} rounded-none transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
