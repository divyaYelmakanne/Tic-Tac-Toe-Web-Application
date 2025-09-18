import { useCallback, useRef } from 'react';

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(true);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    if (!soundEnabledRef.current) return;
    
    initAudioContext();
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [initAudioContext]);

  const playMoveSound = useCallback(() => {
    playTone(800, 0.1, 0.05);
  }, [playTone]);

  const playWinSound = useCallback(() => {
    // Victory fanfare
    setTimeout(() => playTone(523, 0.2, 0.1), 0);    // C
    setTimeout(() => playTone(659, 0.2, 0.1), 100);  // E
    setTimeout(() => playTone(784, 0.2, 0.1), 200);  // G
    setTimeout(() => playTone(1047, 0.4, 0.1), 300); // C
  }, [playTone]);

  const playDrawSound = useCallback(() => {
    // Neutral sound
    setTimeout(() => playTone(400, 0.3, 0.08), 0);
    setTimeout(() => playTone(300, 0.3, 0.08), 150);
  }, [playTone]);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    soundEnabledRef.current = enabled;
  }, []);

  return {
    playMoveSound,
    playWinSound,
    playDrawSound,
    setSoundEnabled,
    soundEnabled: soundEnabledRef.current
  };
};