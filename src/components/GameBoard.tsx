import { Cell, Player } from '@/types/game';
import { useSound } from '@/hooks/useSound';
import { useEffect } from 'react';

interface GameBoardProps {
  board: Cell[];
  winningCells: number[];
  currentPlayer: Player;
  isGameOver: boolean;
  onCellClick: (index: number) => void;
  winner: Player | 'draw' | null;
}

export const GameBoard = ({ 
  board, 
  winningCells, 
  currentPlayer, 
  isGameOver, 
  onCellClick,
  winner
}: GameBoardProps) => {
  const { playMoveSound, playWinSound, playDrawSound } = useSound();

  useEffect(() => {
    if (winner === 'draw') {
      playDrawSound();
    } else if (winner === 'X' || winner === 'O') {
      playWinSound();
    }
  }, [winner, playWinSound, playDrawSound]);

  const handleCellClick = (index: number) => {
    if (board[index] || isGameOver) return;
    
    playMoveSound();
    onCellClick(index);
  };

  const getCellSymbol = (cell: Cell) => {
    if (cell === 'X') return '✕';
    if (cell === 'O') return '○';
    return '';
  };

  const getCellSymbolClass = (cell: Cell) => {
    if (cell === 'X') return 'symbol-x';
    if (cell === 'O') return 'symbol-o';
    return '';
  };

  return (
    <div className="gaming-card">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`
              game-cell aspect-square flex items-center justify-center text-6xl font-bold
              ${winningCells.includes(index) ? 'winner' : ''}
              ${!cell && !isGameOver ? 'hover:bg-muted/50' : ''}
            `}
            onClick={() => handleCellClick(index)}
            style={{
              cursor: !cell && !isGameOver ? 'pointer' : 'default'
            }}
          >
            <span 
              className={`${getCellSymbolClass(cell)} ${cell ? 'animate-bounce-in' : ''}`}
            >
              {getCellSymbol(cell)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Game Status */}
      <div className="text-center">
        {isGameOver ? (
          <div className="animate-slide-down">
            {winner === 'draw' ? (
              <div className="text-2xl font-bold text-accent animate-glow-pulse">
                It's a Draw! 🤝
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <span className={winner === 'X' ? 'symbol-x' : 'symbol-o'}>
                  Player {winner} Wins! 🎉
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-xl font-semibold text-muted-foreground">
            <span className={currentPlayer === 'X' ? 'symbol-x' : 'symbol-o'}>
              Player {currentPlayer}'s Turn
            </span>
          </div>
        )}
      </div>
    </div>
  );
};