import { Score } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Handshake, RotateCcw } from 'lucide-react';

interface ScoreboardProps {
  scores: Score;
  onResetScores: () => void;
}

export const Scoreboard = ({ scores, onResetScores }: ScoreboardProps) => {
  const totalGames = scores.x + scores.o + scores.draws;
  
  const getWinPercentage = (wins: number) => {
    if (totalGames === 0) return 0;
    return Math.round((wins / totalGames) * 100);
  };

  return (
    <div className="gaming-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Scoreboard</h3>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-border hover:border-primary"
          onClick={onResetScores}
        >
          <RotateCcw size={14} className="mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {/* Player X Score */}
        <div className="score-display">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="symbol-x text-2xl">✕</span>
            <span className="font-semibold">Player X</span>
          </div>
          <div className="text-3xl font-bold symbol-x">{scores.x}</div>
          <div className="text-xs text-muted-foreground">
            {getWinPercentage(scores.x)}% win rate
          </div>
        </div>

        {/* Draws */}
        <div className="score-display">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Handshake size={20} className="text-accent" />
            <span className="font-semibold">Draws</span>
          </div>
          <div className="text-2xl font-bold text-accent">{scores.draws}</div>
        </div>

        {/* Player O Score */}
        <div className="score-display">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="symbol-o text-2xl">○</span>
            <span className="font-semibold">Player O</span>
          </div>
          <div className="text-3xl font-bold symbol-o">{scores.o}</div>
          <div className="text-xs text-muted-foreground">
            {getWinPercentage(scores.o)}% win rate
          </div>
        </div>

        {/* Total Games */}
        <div className="text-center pt-3 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Target size={16} />
            <span className="text-sm">Total Games: {totalGames}</span>
          </div>
        </div>
      </div>
    </div>
  );
};