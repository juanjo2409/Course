import React, { useState } from 'react';
import { HeartMeter } from '../gamification/HeartMeter';
import { StreakCounter } from '../gamification/StreakCounter';
import { DevCoinBadge } from '../gamification/DevCoinBadge';
import { soundFx } from '../../services/audio/soundFx';

export interface HeaderProps {
  currentStreak?: number;
  heartsRemaining?: number;
  devCoins?: number;
  levelTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStreak = 7,
  heartsRemaining = 5,
  devCoins = 480,
  levelTitle = 'L4 // TERMINAL_OPERATOR',
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const handleToggleSound = () => {
    const updated = soundFx.toggleMute();
    setIsMuted(updated);
  };

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 font-mono rounded-none select-none relative z-30">
      {/* Brand / System Identity */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 bg-emerald-500 rounded-none shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-widest text-zinc-100 uppercase">
            DEV_ACADEMY::SYS
          </span>
          <span className="text-[10px] text-zinc-500 tracking-wider">
            KERNEL_V1.0.4 // SECURE_SHELL
          </span>
        </div>
      </div>

      {/* Gamification Status Bar */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={handleToggleSound}
          className={`border px-2 py-1 text-[10px] uppercase font-bold rounded-none cursor-pointer transition-colors ${
            isMuted
              ? 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              : 'border-emerald-800 bg-emerald-950/40 text-emerald-400'
          }`}
          title="Alternar SFX [M]"
        >
          {isMuted ? 'SFX: OFF' : 'SFX: ON'}
        </button>

        <div className="hidden lg:flex border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400">
          <span className="text-emerald-500 mr-1.5">&gt;</span>
          <span>{levelTitle}</span>
        </div>

        <StreakCounter currentStreak={currentStreak} isActiveToday={true} freezeCount={1} />
        <HeartMeter current={heartsRemaining} max={5} />
        <DevCoinBadge amount={devCoins} />
      </div>
    </header>
  );
};
