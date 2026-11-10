import { useState, useCallback } from 'react';
import { LessonDetail, SubmitAnswerResult } from '../types/lesson.types';
import { lessonService } from '../services/api/lessonService';
import { useLessonTimer } from './useLessonTimer';

interface UseLessonRunnerOptions {
  lesson: LessonDetail;
  initialHearts?: number;
  onLessonComplete?: (summary: { totalXp: number; elapsedSeconds: number }) => void;
  onOutOfHearts?: () => void;
}

export const useLessonRunner = ({
  lesson,
  initialHearts = 5,
  onLessonComplete,
  onOutOfHearts,
}: UseLessonRunnerOptions) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<SubmitAnswerResult | null>(null);
  const [accumulatedXp, setAccumulatedXp] = useState<number>(0);
  const [heartsRemaining, setHeartsRemaining] = useState<number>(initialHearts);

  const timer = useLessonTimer({
    targetSeconds: lesson.targetDurationSeconds,
    autoStart: true,
  });

  const currentExercise = lesson.exercises[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.exercises.length - 1;

  const submitAnswer = useCallback(
    async (answerValue: string | string[]) => {
      if (isSubmitting || !currentExercise) return;

      setIsSubmitting(true);
      try {
        const result = await lessonService.submitAnswer({
          lessonId: lesson.id,
          exerciseId: currentExercise.id,
          timeElapsedSeconds: timer.elapsedSeconds,
          answerValue,
        });

        setLastResult(result);

        if (result.isCorrect) {
          setAccumulatedXp((prev) => prev + result.xpEarned);
        } else {
          setHeartsRemaining((prev) => {
            const updated = Math.max(0, prev - 1);
            if (updated === 0) {
              timer.pause();
              onOutOfHearts?.();
            }
            return updated;
          });
        }
      } catch (err) {
        console.error('[useLessonRunner] Error evaluando respuesta:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, currentExercise, lesson.id, timer, onOutOfHearts]
  );

  const nextStep = useCallback(() => {
    setLastResult(null);
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      timer.pause();
      onLessonComplete?.({
        totalXp: accumulatedXp,
        elapsedSeconds: timer.elapsedSeconds,
      });
    }
  }, [isLastStep, accumulatedXp, timer, onLessonComplete]);

  return {
    lesson,
    currentExercise,
    currentStepIndex,
    totalSteps: lesson.exercises.length,
    isLastStep,
    timer,
    isSubmitting,
    lastResult,
    accumulatedXp,
    heartsRemaining,
    submitAnswer,
    nextStep,
  };
};
