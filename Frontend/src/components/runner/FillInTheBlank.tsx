import React, { useState } from 'react';
import { FillInTheBlankExercise } from '../../types/lesson.types';
import { soundFx } from '../../services/audio/soundFx';

export interface FillInTheBlankProps {
  exercise: FillInTheBlankExercise;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const FillInTheBlank: React.FC<FillInTheBlankProps> = ({
  exercise,
  onValueChange,
  disabled = false,
}) => {
  const [tokenValue, setTokenValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    soundFx.playKeyClick();
    setTokenValue(nextVal);
    onValueChange(nextVal);
  };

  // Divide la plantilla por el marcador de espacio en blanco
  const lines = exercise.template.split('\n');

  return (
    <div className="flex flex-col gap-4 font-mono select-none">
      {/* Editor tipo IDE con gutter de números de línea */}
      <div className="border border-zinc-800 bg-zinc-950 p-4 shadow-inner rounded-none">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-wider">
          <span>// EDITOR DE CÓDIGO -- {exercise.language.toUpperCase()}</span>
          <span>UTF-8 // LF</span>
        </div>

        <div className="font-mono text-xs leading-6">
          {lines.map((line, lineIdx) => {
            const lineNumber = (lineIdx + 1).toString().padStart(2, '0');
            const hasBlank = line.includes('____') || line.includes('[BLANK]');

            if (hasBlank) {
              const [before, after] = line.split(/____|\[BLANK\]/);
              return (
                <div key={lineIdx} className="flex items-center group">
                  <span className="w-8 text-zinc-650 text-right pr-4 select-none opacity-60">
                    {lineNumber}
                  </span>
                  <div className="flex-1 text-zinc-200 whitespace-pre">
                    <span>{before}</span>
                    <input
                      type="text"
                      value={tokenValue}
                      onChange={handleChange}
                      disabled={disabled}
                      placeholder={exercise.placeholder || 'palabra_clave'}
                      className="inline-block mx-1.5 px-2 py-0.5 text-xs bg-zinc-900 border-b-2 border-emerald-400 text-emerald-300 font-bold tracking-wide focus:outline-none focus:bg-zinc-850 focus:border-emerald-300 rounded-none disabled:opacity-50 transition-all"
                      style={{ width: `${Math.max(10, tokenValue.length + 3)}ch` }}
                      autoFocus
                    />
                    <span>{after}</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={lineIdx} className="flex items-center">
                <span className="w-8 text-zinc-650 text-right pr-4 select-none opacity-60">
                  {lineNumber}
                </span>
                <span className="text-zinc-300 whitespace-pre">{line}</span>
              </div>
            );
          })}
        </div>
      </div>

      {exercise.hint && (
        <div className="border-l-2 border-amber-500 bg-amber-950/20 px-3 py-2 text-xs text-amber-300/80 rounded-none flex items-center justify-between">
          <div>
            <span className="font-bold mr-1">[PISTA_SOCRÁTICA]:</span>
            {exercise.hint}
          </div>
          <span className="text-[10px] text-amber-400/60 uppercase">Pulsa [H] para más pistas</span>
        </div>
      )}
    </div>
  );
};
