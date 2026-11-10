import React, { useState, useEffect, useCallback } from 'react';
import { ParsonsProblemExercise, ParsonsBlock } from '../../types/lesson.types';
import { soundFx } from '../../services/audio/soundFx';

export interface ParsonsProblemProps {
  exercise: ParsonsProblemExercise;
  onValueChange: (blockIdsOrder: string[]) => void;
  disabled?: boolean;
}

interface InteractiveParsonsBlock extends ParsonsBlock {
  indentLevel: number;
}

export const ParsonsProblem: React.FC<ParsonsProblemProps> = ({
  exercise,
  onValueChange,
  disabled = false,
}) => {
  const [sourceBlocks, setSourceBlocks] = useState<ParsonsBlock[]>(exercise.scrambledBlocks);
  const [targetBlocks, setTargetBlocks] = useState<InteractiveParsonsBlock[]>([]);

  const moveToTarget = useCallback(
    (block: ParsonsBlock) => {
      if (disabled) return;
      soundFx.playKeyClick();
      setSourceBlocks((prevSource) => prevSource.filter((b) => b.id !== block.id));
      setTargetBlocks((prevTarget) => {
        const next = [...prevTarget, { ...block, indentLevel: 0 }];
        onValueChange(next.map((b) => b.id));
        return next;
      });
    },
    [disabled, onValueChange]
  );

  const moveToSource = (block: InteractiveParsonsBlock) => {
    if (disabled) return;
    soundFx.playSelectBeep();
    setTargetBlocks((prevTarget) => {
      const next = prevTarget.filter((b) => b.id !== block.id);
      onValueChange(next.map((b) => b.id));
      return next;
    });
    setSourceBlocks((prevSource) => [...prevSource, { id: block.id, code: block.code }]);
  };

  const moveUp = (index: number) => {
    if (disabled || index <= 0) return;
    soundFx.playSelectBeep();
    setTargetBlocks((prevTarget) => {
      const updated = [...prevTarget];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      onValueChange(updated.map((b) => b.id));
      return updated;
    });
  };

  const moveDown = (index: number) => {
    if (disabled || index >= targetBlocks.length - 1) return;
    soundFx.playSelectBeep();
    setTargetBlocks((prevTarget) => {
      const updated = [...prevTarget];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      onValueChange(updated.map((b) => b.id));
      return updated;
    });
  };

  const adjustIndent = (index: number, delta: number) => {
    if (disabled) return;
    soundFx.playKeyClick();
    setTargetBlocks((prevTarget) => {
      const updated = [...prevTarget];
      const newIndent = Math.max(0, Math.min(3, updated[index].indentLevel + delta));
      updated[index] = { ...updated[index], indentLevel: newIndent };
      return updated;
    });
  };

  // Soporte de atajo numérico para insertar bloques del pool
  useEffect(() => {
    if (disabled) return;
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= sourceBlocks.length) {
        moveToTarget(sourceBlocks[num - 1]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [sourceBlocks, disabled, moveToTarget]);

  return (
    <div className="flex flex-col gap-6 font-mono select-none">
      {/* Zona de Solución Ordenada */}
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest mb-2">
          <span>// PIPELINE DE EJECUCIÓN (SOLUCIÓN ORDENADA)</span>
          <span className="text-[10px] text-zinc-500">[{targetBlocks.length} BLOQUES EN POSICIÓN]</span>
        </div>
        <div className="min-h-[140px] border-2 border-dashed border-zinc-700 bg-zinc-950/80 p-3 flex flex-col gap-2 rounded-none">
          {targetBlocks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-zinc-600 tracking-wider py-8">
              &gt; HAZ CLIC EN LOS BLOQUES INFERIORES O PRESIONA [1-{sourceBlocks.length}] PARA INSERTAR
            </div>
          ) : (
            targetBlocks.map((block, index) => (
              <div
                key={block.id}
                className="flex items-center justify-between border border-emerald-800 bg-zinc-900 px-3 py-2 text-xs text-emerald-300 rounded-none shadow-[2px_2px_0px_#064e3b]"
                style={{ marginLeft: `${block.indentLevel * 24}px` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 font-bold">{index + 1}.</span>
                  {block.indentLevel > 0 && (
                    <span className="text-zinc-600 text-[10px]">
                      {'│   '.repeat(block.indentLevel)}
                    </span>
                  )}
                  <pre className="font-mono whitespace-pre">{block.code}</pre>
                </div>
                {!disabled && (
                  <div className="flex items-center gap-1">
                    {/* Controles de Indentación */}
                    <button
                      onClick={() => adjustIndent(index, -1)}
                      disabled={block.indentLevel === 0}
                      className="px-1.5 py-0.5 text-[10px] border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 rounded-none cursor-pointer"
                      title="Des-indentar (&lt;&lt;)"
                    >
                      &lt;&lt;
                    </button>
                    <button
                      onClick={() => adjustIndent(index, 1)}
                      disabled={block.indentLevel >= 3}
                      className="px-1.5 py-0.5 text-[10px] border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 rounded-none cursor-pointer"
                      title="Indentar (&gt;&gt;)"
                    >
                      &gt;&gt;
                    </button>
                    {/* Controles de Orden */}
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="px-1.5 py-0.5 text-[10px] border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 rounded-none cursor-pointer"
                      title="Subir"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === targetBlocks.length - 1}
                      className="px-1.5 py-0.5 text-[10px] border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 rounded-none cursor-pointer"
                      title="Bajar"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => moveToSource(block)}
                      className="px-2 py-0.5 text-[10px] border border-red-900 bg-red-950/60 text-red-400 hover:bg-red-900 rounded-none cursor-pointer ml-1"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bloques Disponibles (Fuente desordenada) */}
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest mb-2">
          <span>// POOL DE INSTRUCCIONES DISPONIBLES</span>
          <span className="text-[10px] text-zinc-500">ATAJOS: [1-{sourceBlocks.length}]</span>
        </div>
        <div className="flex flex-wrap gap-2 p-3 border border-zinc-800 bg-zinc-950 rounded-none">
          {sourceBlocks.length === 0 ? (
            <div className="text-xs text-zinc-600 py-2">
              Todos los bloques han sido posicionados en el pipeline de ejecución.
            </div>
          ) : (
            sourceBlocks.map((block, idx) => (
              <button
                key={block.id}
                onClick={() => moveToTarget(block)}
                disabled={disabled}
                className="border border-zinc-700 bg-zinc-900 hover:border-emerald-500 hover:bg-zinc-850 px-3 py-2 text-xs text-zinc-200 font-mono transition-all rounded-none cursor-pointer text-left disabled:cursor-not-allowed shadow-[2px_2px_0px_#27272a] hover:shadow-[3px_3px_0px_#047857]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1 bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {idx + 1}
                  </span>
                  <pre className="whitespace-pre font-mono">{block.code}</pre>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
