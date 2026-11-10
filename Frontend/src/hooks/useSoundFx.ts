import { useState, useCallback } from 'react';
import { soundFx } from '../services/audio/soundFx';

export const useSoundFx = () => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  const toggleMute = useCallback(() => {
    const updated = soundFx.toggleMute();
    setIsMuted(updated);
  }, []);

  const playKeyClick = useCallback(() => soundFx.playKeyClick(), []);
  const playSelectBeep = useCallback(() => soundFx.playSelectBeep(), []);
  const playSuccessChime = useCallback(() => soundFx.playSuccessChime(), []);
  const playErrorBuzz = useCallback(() => soundFx.playErrorBuzz(), []);
  const playLevelUpFanfare = useCallback(() => soundFx.playLevelUpFanfare(), []);

  return {
    isMuted,
    toggleMute,
    playKeyClick,
    playSelectBeep,
    playSuccessChime,
    playErrorBuzz,
    playLevelUpFanfare,
  };
};
