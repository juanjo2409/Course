import React from 'react';
import { SubmitAnswerResult } from '../../types/lesson.types';
import { Button } from '../common/Button';

export interface RunnerFooterProps {
  lastResult: SubmitAnswerResult | null;
  isSubmitting: boolean;
  canSubmit: boolean;
  onValidate: () => void;
  onContinue: () => void;
  onOpenHelp?: () => void;
}

export const RunnerFooter: React.FC<RunnerFooterProps> = ({
  lastResult,
  isSubmitting,
  canSubmit,
  onValidate,
  onContinue,
  onOpenHelp,
}) => {
  return (
    <footer
      className={`border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-none transition-colors select-none ${
        lastResult === null
          ? 'border-zinc-800 bg-zinc-950'
          : lastResult.isCorrect
          ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
          : 'border-red-700 bg-red-950/40 text-red-300'
      }`}
    >
      <div className="flex-1 w-full">
        {lastResult ? (
          <div>
            <div className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-none bg-current" />
              <span>
                {lastResult.isCorrect ? 'VALIDACIÓN EXITOSA (+XP)' : 'SYNTAX_ERROR // 1 CORAZÓN CONSUMIDO'}
              </span>
              {lastResult.hasStreakBonus && (
                <span className="border border-amber-600 bg-amber-950/90 text-amber-300 px-2 py-0.5 text-[10px] ml-2 font-bold tracking-wider">
                  ⚡ BONO DE VELOCIDAD ACTIVO
                </span>
              )}
            </div>
            <p className="text-xs mt-1.5 text-zinc-300 font-mono leading-relaxed">
              {lastResult.explanation}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-[11px] text-zinc-500">
            <span>ATAJOS:</span>
            <span className="border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
              [ENTER] Validar
            </span>
            <span className="border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
              [H] Pista Socrática
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {onOpenHelp && lastResult === null && (
          <Button
            variant="outline"
            size="md"
            onClick={onOpenHelp}
            shortcutBadge="[H]"
          >
            PISTA
          </Button>
        )}

        {lastResult === null ? (
          <Button
            variant="primary"
            size="md"
            onClick={onValidate}
            disabled={!canSubmit || isSubmitting}
            shortcutBadge="[ENTER]"
          >
            {isSubmitting ? 'EVALUANDO BUFFER...' : 'EJECUTAR PRUEBA'}
          </Button>
        ) : (
          <Button
            variant={lastResult.isCorrect ? 'primary' : 'secondary'}
            size="md"
            onClick={onContinue}
            shortcutBadge="[ENTER]"
            autoFocus
          >
            CONTINUAR &gt;&gt;
          </Button>
        )}
      </div>
    </footer>
  );
};
