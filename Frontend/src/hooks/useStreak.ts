import { useState, useEffect, useCallback } from 'react';
import { StreakState } from '../types/gamification.types';
import { gamificationService } from '../services/api/gamificationService';

export const useStreak = () => {
  const [streak, setStreak] = useState<StreakState>({
    currentStreak: 0,
    longestStreak: 0,
    freezeCount: 0,
    lastCompletedDate: null,
    isActiveToday: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    gamificationService.getUserProgress()
      .then((data) => setStreak(data.streak))
      .catch((err) => console.error('[useStreak] Error cargando racha', err))
      .finally(() => setLoading(false));
  }, []);

  const claimStreak = useCallback(async () => {
    try {
      const updated = await gamificationService.claimDailyStreak();
      setStreak(updated);
    } catch (err) {
      console.error('[useStreak] Error al registrar racha', err);
    }
  }, []);

  return { streak, loading, claimStreak };
};
