import React, { useState, useEffect, useCallback } from 'react';
import { MultipleChoiceExercise } from '../../types/lesson.types';
import { soundFx } from '../../services/audio/soundFx';

export interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  onValueChange: (optionId: string) => void;
  disabled?: boolean;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  exercise,
  onValueChange,
  disabled = false,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [showDryRun, setShowDryRun] = useState<boolean>(false);

  const handleSelect = useCallback(
    (id: string) => {
      if (disabled) return;
      soundFx.playSelectBeep();
      setSelectedId(id);
      onValueChange(id);
    },
    [disabled, onValueChange]
  );

  // Soporte de atajo numérico directo para opciones [1, 2, 3, 4]
  useEffect(() => {
    if (disabled) return;
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= exercise.options.length) {
        handleSelect(exercise.options[num - 1].id);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [exercise.options, disabled, handleSelect]);

  return (
    <div className="flex flex-col gap-4 font-mono select-none">
      {exercise.codeSnippet && (
        <div className="border border-zinc-800 bg-zinc-950 p-4 rounded-none shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest mb-2 border-b border-zinc-850 pb-1">
            <span>// CÓDIGO A EVALUAR ({exercise.language.toUpperCase()})</span>
            <button
              onClick={() => {
                soundFx.playKeyClick();
                setShowDryRun(!showDryRun);
              }}
              className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              {showDryRun ? '[-] OCULTAR SIMULACIÓN' : '[+] SIMULAR EN REPL'}
            </button>
          </div>
          <pre className="text-xs text-zinc-300 font-mono overflow-x-auto whitespace-pre leading-5">
            <code>{exercise.codeSnippet}</code>
          </pre>

          {showDryRun && (
            <div className="mt-3 pt-3 border-t border-zinc-850 text-xs text-zinc-400 bg-zinc-900/60 p-3">
              <span className="text-[10px] text-emerald-500 font-bold block mb-1">
                &gt; STDOUT (SIMULADO EN CLIENTE):
              </span>
              <span className="text-zinc-300 font-mono">15</span>
              <span className="text-[10px] text-zinc-600 block mt-1">
                Execution time: 0.14ms // Exit code: 0
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest">
        <span>// SELECCIONA LA SALIDA VÁLIDA:</span>
        <span className="text-[10px] text-zinc-500">ATAJOS: [1-{exercise.options.length}]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {exercise.options.map((option, idx) => {
          const isSelected = selectedId === option.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D...
          const shortcutNum = idx + 1;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={disabled}
              className={`flex items-start gap-3 p-4 border text-left transition-all rounded-none cursor-pointer ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-[3px_3px_0px_#047857]'
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-850 shadow-[2px_2px_0px_#27272a]'
              } disabled:cursor-not-allowed`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center text-xs font-bold border rounded-none ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500 text-black'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                }`}
              >
                {shortcutNum}
              </span>
              <div className="flex-1">
                <span className="text-[10px] text-zinc-500 block uppercase mb-0.5">
                  OPCIÓN [{letter}]
                </span>
                <span className={`text-xs ${option.isCode ? 'font-mono' : ''}`}>
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
