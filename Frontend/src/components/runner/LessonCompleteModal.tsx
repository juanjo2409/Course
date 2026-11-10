import React, { useEffect, useState } from 'react';
import { soundFx } from '../../services/audio/soundFx';
import { Button } from '../common/Button';

export interface LessonCompleteModalProps {
  totalXp: number;
  timeElapsedSeconds: number;
  heartsRemaining: number;
  onContinue: () => void;
  onRetry: () => void;
}

export const LessonCompleteModal: React.FC<LessonCompleteModalProps> = ({
  totalXp,
  timeElapsedSeconds,
  heartsRemaining,
  onContinue,
  onRetry,
}) => {
  const [animatedXp, setAnimatedXp] = useState<number>(0);

  const mins = Math.floor(timeElapsedSeconds / 60);
  const secs = timeElapsedSeconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;

  const rank = heartsRemaining >= 5 ? 'S-RANK' : heartsRemaining >= 3 ? 'A-RANK' : 'B-RANK';
  const rankColor = rank === 'S-RANK' ? 'text-amber-400 border-amber-400' : 'text-emerald-400 border-emerald-400';

  useEffect(() => {
    soundFx.playLevelUpFanfare();

    // Animación de conteo de XP
    let current = 0;
    const step = Math.max(1, Math.floor(totalXp / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= totalXp) {
        setAnimatedXp(totalXp);
        clearInterval(timer);
      } else {
        setAnimatedXp(current);
        soundFx.playKeyClick();
      }
    }, 30);

    return () => clearInterval(timer);
  }, [totalXp]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-lg border-2 border-emerald-500 bg-zinc-950 p-8 shadow-[8px_8px_0px_0px_#064e3b] rounded-none animate-in zoom-in-95 duration-200">
        {/* Header de Victoria */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div>
            <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              // TELEMETRÍA DE MISIÓN
            </div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-100 uppercase">
              LECCIÓN COMPLETADA
            </h2>
          </div>
          <div className={`px-3 py-1 text-sm font-bold border-2 ${rankColor} rounded-none`}>
            {rank}
          </div>
        </div>

        {/* Resumen de Recompensas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-zinc-800 bg-zinc-900/80 p-4 rounded-none">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
              EXPERIENCIA TOTAL
            </span>
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              +{animatedXp} <span className="text-xs font-semibold">XP</span>
            </span>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/80 p-4 rounded-none">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
              TIEMPO DE RESOLUCIÓN
            </span>
            <span className="text-2xl font-bold text-zinc-200 tracking-tight">
              {timeFormatted}
            </span>
          </div>
        </div>

        {/* Desglose de Eficiencia */}
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 mb-6 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Puntos Base de Retos:</span>
            <span className="font-bold text-zinc-200">50 XP</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Bono de Agilidad Temporal:</span>
            <span className="font-bold text-emerald-400">+15 XP</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Integridad de Vidas [{heartsRemaining}/5]:</span>
            <span className="font-bold text-zinc-200">100% PRECISIÓN</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onRetry}
            shortcutBadge="[R]"
          >
            REINTENTAR
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onContinue}
            shortcutBadge="[ENTER]"
            autoFocus
          >
            CONTINUAR AL DASHBOARD
          </Button>
        </div>
      </div>
    </div>
  );
};
