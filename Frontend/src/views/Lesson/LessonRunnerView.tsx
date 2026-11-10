import React, { useState, useEffect } from 'react';
import { LessonDetail } from '../../types/lesson.types';
import { useLessonRunner } from '../../hooks/useLessonRunner';
import { ExerciseHost } from '../../components/runner/ExerciseHost';
import { RunnerFooter } from '../../components/runner/RunnerFooter';
import { HeartMeter } from '../../components/gamification/HeartMeter';
import { SocraticTutor } from '../../components/runner/SocraticTutor';
import { LessonCompleteModal } from '../../components/runner/LessonCompleteModal';
import { soundFx } from '../../services/audio/soundFx';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export interface LessonRunnerViewProps {
  lesson: LessonDetail;
  onExit: () => void;
  onComplete?: (totalXp: number) => void;
}

export const LessonRunnerView: React.FC<LessonRunnerViewProps> = ({
  lesson,
  onExit,
  onComplete,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [showTutor, setShowTutor] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [completedXp, setCompletedXp] = useState<number>(0);
  const [isErrorShaking, setIsErrorShaking] = useState<boolean>(false);
  const [isSuccessGlowing, setIsSuccessGlowing] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const {
    currentExercise,
    currentStepIndex,
    totalSteps,
    timer,
    isSubmitting,
    lastResult,
    accumulatedXp,
    heartsRemaining,
    submitAnswer,
    nextStep,
  } = useLessonRunner({
    lesson,
    onLessonComplete: (summary) => {
      setCompletedXp(summary.totalXp);
      setShowCompleteModal(true);
      onComplete?.(summary.totalXp);
    },
    onOutOfHearts: () => {
      soundFx.playErrorBuzz();
    },
  });

  const canSubmit =
    Array.isArray(currentAnswer)
      ? currentAnswer.length > 0
      : typeof currentAnswer === 'string' && currentAnswer.trim() !== '';

  const handleValidate = async () => {
    if (!canSubmit || isSubmitting) return;
    await submitAnswer(currentAnswer);
  };

  const handleContinue = () => {
    soundFx.playSelectBeep();
    setCurrentAnswer('');
    setIsErrorShaking(false);
    setIsSuccessGlowing(false);
    nextStep();
  };

  const toggleSound = () => {
    const updated = soundFx.toggleMute();
    setIsMuted(updated);
  };

  // Reacción audiovisual al recibir respuesta evaluada
  useEffect(() => {
    if (!lastResult) return;

    if (lastResult.isCorrect) {
      soundFx.playSuccessChime();
      const t = setTimeout(() => {
        setIsSuccessGlowing(true);
        setIsErrorShaking(false);
      }, 0);
      return () => clearTimeout(t);
    } else {
      soundFx.playErrorBuzz();
      const t1 = setTimeout(() => {
        setIsErrorShaking(true);
        setIsSuccessGlowing(false);
      }, 0);
      const t2 = setTimeout(() => setIsErrorShaking(false), 420);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [lastResult]);

  // Atajos de teclado de nivel superior
  useKeyboardShortcuts({
    onEnter: () => {
      if (showCompleteModal) {
        onExit();
      } else if (lastResult !== null) {
        handleContinue();
      } else {
        handleValidate();
      }
    },
    onEscape: () => {
      if (showTutor) {
        setShowTutor(false);
      } else {
        setShowExitConfirm((prev) => !prev);
      }
    },
    onHelp: () => {
      setShowTutor((prev) => !prev);
    },
    onMuteToggle: () => {
      toggleSound();
    },
  });

  return (
    <div
      className={`flex flex-col h-full w-full bg-zinc-950 text-zinc-100 font-mono select-none relative transition-all ${
        isErrorShaking ? 'animate-shake animate-damage' : ''
      } ${isSuccessGlowing ? 'animate-success-glow' : ''}`}
    >
      {/* Sutil overlay de scanlines de terminal */}
      <div className="absolute inset-0 scanline-overlay z-10 pointer-events-none" />

      {/* Barra superior de telemetría de la lección */}
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-6 py-3 rounded-none relative z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs uppercase tracking-wider text-zinc-300 hover:bg-zinc-700 active:bg-zinc-600 rounded-none transition-colors cursor-pointer"
          >
            [ESC] ABANDONAR
          </button>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold tracking-wide text-zinc-300 uppercase">
              MOD::{lesson.title}
            </span>
            <span className="text-[10px] text-zinc-500">
              RECOMPENSA: +{lesson.totalXpReward} XP // GANADO: +{accumulatedXp} XP // META: {lesson.targetDurationSeconds}s
            </span>
          </div>
        </div>

        {/* Barra de progreso de la lección */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-6">
          <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
            <span className="uppercase">RETO {currentStepIndex + 1} DE {totalSteps}</span>
            <span>{Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 border border-zinc-700 rounded-none overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-none transition-all duration-300 ease-out shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Vidas, Cronómetro y Toggle de Audio */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className={`border px-2 py-1 text-[10px] uppercase font-bold rounded-none cursor-pointer ${
              isMuted
                ? 'border-zinc-700 bg-zinc-850 text-zinc-500'
                : 'border-emerald-700 bg-emerald-950/40 text-emerald-400'
            }`}
            title="Alternar sonido [M]"
          >
            {isMuted ? 'SFX: OFF' : 'SFX: ON'}
          </button>
          <HeartMeter current={heartsRemaining} max={5} />
          <div
            className={`border px-2.5 py-1 text-xs font-bold tracking-widest rounded-none ${
              timer.isWithinTarget
                ? 'border-emerald-700 bg-emerald-950/40 text-emerald-400'
                : 'border-amber-700 bg-amber-950/40 text-amber-400'
            }`}
          >
            T+{timer.formattedTime}
          </div>
        </div>
      </header>

      {/* Área Central del Reto Dinámico */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-center relative z-20">
        <div className="w-full max-w-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 rounded-none shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
            <div className="text-[10px] uppercase text-zinc-500 tracking-wider">
              ID: {currentExercise.id} // TIPO: {currentExercise.type}
            </div>
            <div className="text-xs text-emerald-400 font-bold">
              +{currentExercise.baseXp} XP
            </div>
          </div>

          <h2 className="text-base md:text-lg font-bold text-zinc-100 mb-6 border-l-2 border-emerald-500 pl-3 leading-snug">
            {currentExercise.prompt}
          </h2>

          <ExerciseHost
            exercise={currentExercise}
            onAnswerChange={setCurrentAnswer}
            disabled={isSubmitting || lastResult !== null}
          />
        </div>
      </main>

      {/* Barra de acción inferior */}
      <div className="relative z-20">
        <RunnerFooter
          lastResult={lastResult}
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
          onValidate={handleValidate}
          onContinue={handleContinue}
          onOpenHelp={() => setShowTutor(true)}
        />
      </div>

      {/* Drawer del Tutor Socrático */}
      <SocraticTutor
        exercisePrompt={currentExercise.prompt}
        language={currentExercise.language}
        baseHint={currentExercise.hint}
        isOpen={showTutor}
        onClose={() => setShowTutor(false)}
      />

      {/* Modal de Lección Completada con Desglose */}
      {showCompleteModal && (
        <LessonCompleteModal
          totalXp={completedXp}
          timeElapsedSeconds={timer.elapsedSeconds}
          heartsRemaining={heartsRemaining}
          onContinue={onExit}
          onRetry={() => {
            setShowCompleteModal(false);
            window.location.reload();
          }}
        />
      )}

      {/* Modal angular de confirmación de abandono */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="border border-zinc-700 bg-zinc-900 p-6 max-w-sm w-full rounded-none shadow-[4px_4px_0px_#7f1d1d]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-2">
              [ADVERTENCIA] ¿ABANDONAR SESIÓN?
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              El progreso del reto actual se perderá y no se acumulará el bono de agilidad temporal.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs uppercase text-zinc-300 hover:bg-zinc-700 rounded-none cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                onClick={onExit}
                className="border border-red-600 bg-red-600 px-4 py-2 text-xs uppercase text-white hover:bg-red-500 rounded-none cursor-pointer"
              >
                ABANDONAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
