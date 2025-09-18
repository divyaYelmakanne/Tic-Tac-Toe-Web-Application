import { GameMode, Difficulty } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Bot, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface GameControlsProps {
  gameMode: GameMode;
  difficulty: Difficulty;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
  isGameActive: boolean;
}

export const GameControls = ({
  gameMode,
  difficulty,
  onGameModeChange,
  onDifficultyChange,
  onReset,
  isGameActive
}: GameControlsProps) => {
  const { soundEnabled, setSoundEnabled } = useSound();

  const getDifficultyClass = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
    }
  };

  return (
    <div className="gaming-card space-y-6">
      <h3 className="text-xl font-bold text-center mb-4">Game Controls</h3>
      
      {/* Game Mode Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Game Mode
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={gameMode === 'pvp' ? 'default' : 'outline'}
            className={`${gameMode === 'pvp' ? 'btn-primary' : 'border-border hover:border-primary'} flex items-center gap-2`}
            onClick={() => onGameModeChange('pvp')}
          >
            <Users size={18} />
            Player vs Player
          </Button>
          <Button
            variant={gameMode === 'pvc' ? 'default' : 'outline'}
            className={`${gameMode === 'pvc' ? 'btn-secondary' : 'border-border hover:border-secondary'} flex items-center gap-2`}
            onClick={() => onGameModeChange('pvc')}
          >
            <Bot size={18} />
            vs Computer
          </Button>
        </div>
      </div>

      {/* AI Difficulty (only show in PvC mode) */}
      {gameMode === 'pvc' && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            AI Difficulty
          </h4>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
              <Badge
                key={diff}
                variant={difficulty === diff ? 'default' : 'outline'}
                className={`
                  cursor-pointer transition-all duration-200 px-3 py-1 capitalize
                  ${difficulty === diff ? getDifficultyClass(diff) : 'hover:border-primary'}
                `}
                onClick={() => onDifficultyChange(diff)}
              >
                {diff}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {difficulty === 'easy' && "AI makes random moves"}
            {difficulty === 'medium' && "AI plays optimally 50% of the time"}
            {difficulty === 'hard' && "AI always plays optimally"}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="btn-accent w-full flex items-center gap-2"
          onClick={onReset}
        >
          <RotateCcw size={18} />
          {isGameActive ? 'Reset Game' : 'New Game'}
        </Button>
        
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 border-border hover:border-accent"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          Sound {soundEnabled ? 'On' : 'Off'}
        </Button>
      </div>
    </div>
  );
};