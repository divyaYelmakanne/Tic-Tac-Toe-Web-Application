import { useState, useCallback, useEffect } from 'react';
import { Score, Player } from '@/types/game';

const STORAGE_KEY = 'tic-tac-toe-scores';

const getStoredScores = (): Score => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { x: 0, o: 0, draws: 0 };
  } catch {
    return { x: 0, o: 0, draws: 0 };
  }
};

export const useScore = () => {
  const [scores, setScores] = useState<Score>(getStoredScores);

  const updateScore = useCallback((winner: Player | 'draw' | null) => {
    if (!winner) return;
    
    setScores(prev => {
      const newScores = { ...prev };
      
      if (winner === 'X') newScores.x++;
      else if (winner === 'O') newScores.o++;
      else if (winner === 'draw') newScores.draws++;
      
      return newScores;
    });
  }, []);

  const resetScores = useCallback(() => {
    setScores({ x: 0, o: 0, draws: 0 });
  }, []);

  // Persist scores to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      console.warn('Failed to save scores to localStorage:', error);
    }
  }, [scores]);

  return {
    scores,
    updateScore,
    resetScores
  };
};