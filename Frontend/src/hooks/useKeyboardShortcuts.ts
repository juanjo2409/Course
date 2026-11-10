import { useEffect } from 'react';

export interface ShortcutHandlers {
  onEnter?: () => void;
  onEscape?: () => void;
  onHelp?: () => void;
  onMuteToggle?: () => void;
  onNumberKey?: (num: number) => void;
}

export const useKeyboardShortcuts = (
  handlers: ShortcutHandlers,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Si el foco está en un input de texto, no interceptar teclas numéricas ni letras
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === 'Enter') {
        // En inputs, Enter sí dispara submit
        e.preventDefault();
        handlers.onEnter?.();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handlers.onEscape?.();
        return;
      }

      // Si está escribiendo en un input, no procesar atajos de caracteres directos
      if (isInput) return;

      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handlers.onHelp?.();
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handlers.onMuteToggle?.();
        return;
      }

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        handlers.onNumberKey?.(num);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, enabled]);
};
