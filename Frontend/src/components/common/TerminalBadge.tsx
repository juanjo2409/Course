import React from 'react';

export interface TerminalBadgeProps {
  label: string;
  variant?: 'emerald' | 'amber' | 'red' | 'zinc' | 'cyan';
  className?: string;
}

export const TerminalBadge: React.FC<TerminalBadgeProps> = ({
  label,
  variant = 'zinc',
  className = '',
}) => {
  const styles = {
    emerald: 'bg-emerald-950/60 text-emerald-400 border-emerald-800',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800',
    red: 'bg-red-950/60 text-red-400 border-red-800',
    zinc: 'bg-zinc-800/80 text-zinc-300 border-zinc-700',
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium border uppercase tracking-wider rounded-none select-none ${styles} ${className}`}
    >
      {label}
    </span>
  );
};
