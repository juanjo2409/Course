/**
 * Modelos del sistema de gamificación y progresión
 */
export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  freezeCount: number;
  lastCompletedDate: string | null;
  isActiveToday: boolean;
}

export interface HeartsState {
  current: number;
  max: number;
  isUnlimited: boolean;
  nextRegenSeconds: number | null;
}

export interface UserProgressSummary {
  userId: string;
  totalXp: number;
  devCoins: number;
  streak: StreakState;
  hearts: HeartsState;
  currentLevel: number;
  levelTitle: string;
}

export interface CosmeticItem {
  id: string;
  name: string;
  category: 'theme' | 'avatar-frame' | 'sfx-pack' | 'title';
  priceDevCoins: number;
  isOwned: boolean;
  isEquipped: boolean;
}
