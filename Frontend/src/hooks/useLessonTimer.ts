import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLessonTimerProps {
  targetSeconds?: number;
  autoStart?: boolean;
}

export interface UseLessonTimerReturn {
  elapsedSeconds: number;
  formattedTime: string;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  isWithinTarget: boolean;
}

export const useLessonTimer = ({
  targetSeconds = 180,
  autoStart = true,
}: UseLessonTimerProps = {}): UseLessonTimerReturn => {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(!autoStart);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setIsPaused(false);
  }, []);

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return {
    elapsedSeconds,
    formattedTime,
    isPaused,
    pause,
    resume,
    reset,
    isWithinTarget: elapsedSeconds <= targetSeconds,
  };
};
