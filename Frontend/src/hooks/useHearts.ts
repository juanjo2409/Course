import { useState, useEffect, useCallback } from 'react';
import { HeartsState } from '../types/gamification.types';
import { gamificationService } from '../services/api/gamificationService';

export const useHearts = () => {
  const [hearts, setHearts] = useState<HeartsState>({
    current: 5,
    max: 5,
    isUnlimited: false,
    nextRegenSeconds: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    gamificationService.getUserProgress()
      .then((data) => setHearts(data.hearts))
      .catch((err) => console.error('[useHearts] Error cargando vidas', err))
      .finally(() => setLoading(false));
  }, []);

  const consumeHeart = useCallback(() => {
    setHearts((prev) => {
      if (prev.isUnlimited || prev.current <= 0) return prev;
      return { ...prev, current: prev.current - 1 };
    });
  }, []);

  const refillHearts = useCallback(() => {
    setHearts((prev) => ({ ...prev, current: prev.max }));
  }, []);

  return { hearts, loading, consumeHeart, refillHearts };
};
