import React, { useState, useEffect } from 'react';
import { soundFx } from '../../services/audio/soundFx';

export interface SocraticTutorProps {
  exercisePrompt: string;
  language: string;
  baseHint?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SocraticTutor: React.FC<SocraticTutorProps> = ({
  exercisePrompt,
  language,
  baseHint,
  isOpen,
  onClose,
}) => {
  const [revealedTier, setRevealedTier] = useState<number>(1);
  const [displayedText, setDisplayedText] = useState<string>('');

  const hints = [
    {
      tier: 1,
      title: 'TIER 1 // ORIENTACIÓN CONCEPTUAL',
      content: baseHint || `En ${language}, reflexiona sobre el flujo de control: ¿qué instrucción es responsable de devolver el control y el resultado a quien invocó la función?`,
    },
    {
      tier: 2,
      title: 'TIER 2 // ESTRUCTURA SINTÁCTICA',
      content: `Verifica la indentación y las palabras reservadas. En este bloque se requiere una instrucción terminal para emitir el valor evaluado.`,
    },
    {
      tier: 3,
      title: 'TIER 3 // PASO A PASO SOCRÁTICO',
      content: `Paso 1: Identifica el parámetro recibido.\nPaso 2: Observa la operación aritmética.\nPaso 3: Recuerda que omitir el retorno explícito resulta en 'None'.`,
    },
  ];

  const currentHint = hints.find((h) => h.tier === revealedTier) || hints[0];
  const isTyping = displayedText.length < currentHint.content.length;

  // Efecto máquina de escribir (Typewriter) para sensación de terminal interactiva
  useEffect(() => {
    if (!isOpen) return;

    let idx = 0;
    const fullText = currentHint.content;

    const timer = setInterval(() => {
      idx++;
      setDisplayedText(fullText.slice(0, idx));
      if (idx % 4 === 0) {
        soundFx.playKeyClick();
      }
      if (idx >= fullText.length) {
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [revealedTier, isOpen, currentHint.content]);

  if (!isOpen) return null;

  const handleNextTier = (tier: number) => {
    soundFx.playSelectBeep();
    setDisplayedText('');
    setRevealedTier(tier);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex justify-end font-mono select-none">
      <div className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between p-6 shadow-2xl rounded-none animate-in slide-in-from-right duration-200">
        <div>
          {/* Header del Tutor */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-emerald-500 rounded-none animate-pulse" />
              <span className="text-xs font-bold text-zinc-100 uppercase tracking-widest">
                TUTOR_SOCRÁTICO::AI
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-zinc-500 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-600 px-2 py-1 rounded-none cursor-pointer"
            >
              [ESC] CERRAR
            </button>
          </div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
            CONTEXTO: {exercisePrompt.slice(0, 60)}...
          </div>

          {/* Selector de Pistas Progresivas */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                onClick={() => handleNextTier(t)}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase border transition-colors cursor-pointer rounded-none ${
                  revealedTier === t
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                PISTA {t}
              </button>
            ))}
          </div>

          {/* Consola de Salida del Tutor */}
          <div className="border border-zinc-800 bg-zinc-900/90 p-4 min-h-[160px] rounded-none">
            <div className="text-[10px] text-emerald-500 font-bold mb-2">
              &gt; {currentHint.title}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-3.5 bg-emerald-400 ml-1 animate-pulse align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* Footer del Drawer */}
        <div className="pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between items-center">
          <span>SOCRATIC_MODE: PROMPT_DEFENSE_ON</span>
          <span className="text-zinc-400">[H] PARA ALTERNAR</span>
        </div>
      </div>
    </div>
  );
};
