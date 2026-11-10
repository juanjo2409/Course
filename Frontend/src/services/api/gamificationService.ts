import { HttpClient } from './client';
import { UserProgressSummary, StreakState } from '../../types/gamification.types';

export const MOCK_USER_PROGRESS: UserProgressSummary = {
  userId: 'usr-dev-001',
  totalXp: 1250,
  devCoins: 480,
  currentLevel: 4,
  levelTitle: 'Terminal Operator',
  streak: {
    currentStreak: 7,
    longestStreak: 14,
    freezeCount: 1,
    lastCompletedDate: new Date().toISOString(),
    isActiveToday: true,
  },
  hearts: {
    current: 5,
    max: 5,
    isUnlimited: false,
    nextRegenSeconds: null,
  },
};

export class GamificationService {
  public async getUserProgress(signal?: AbortSignal): Promise<UserProgressSummary> {
    try {
      return await HttpClient.get<UserProgressSummary>('/gamification/progress', signal);
    } catch {
      return MOCK_USER_PROGRESS;
    }
  }

  public async claimDailyStreak(signal?: AbortSignal): Promise<StreakState> {
    try {
      return await HttpClient.post<StreakState>('/gamification/streak/claim', {}, signal);
    } catch {
      return {
        ...MOCK_USER_PROGRESS.streak,
        currentStreak: MOCK_USER_PROGRESS.streak.currentStreak + 1,
        isActiveToday: true,
      };
    }
  }
}

export const gamificationService = new GamificationService();
