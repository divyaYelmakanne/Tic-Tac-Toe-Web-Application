import { useGameLogic } from '@/hooks/useGameLogic';
import { useScore } from '@/hooks/useScore';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { Scoreboard } from './Scoreboard';
import { useEffect } from 'react';

export const TicTacToe = () => {
  const { gameState, makeMove, resetGame, setGameMode, setDifficulty } = useGameLogic();
  const { scores, updateScore, resetScores } = useScore();

  // Update score when game ends
  useEffect(() => {
    if (gameState.isGameOver && gameState.winner) {
      updateScore(gameState.winner);
    }
  }, [gameState.isGameOver, gameState.winner, updateScore]);

  const isGameActive = gameState.board.some(cell => cell !== null);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 animate-glow-pulse">
            <span className="symbol-x">✕</span>
            {" "}Tic Tac Toe{" "}
            <span className="symbol-o">○</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Challenge a friend or test your skills against the AI!
          </p>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Game Controls */}
          <div className="order-2 lg:order-1">
            <GameControls
              gameMode={gameState.gameMode}
              difficulty={gameState.difficulty}
              onGameModeChange={setGameMode}
              onDifficultyChange={setDifficulty}
              onReset={resetGame}
              isGameActive={isGameActive}
            />
          </div>

          {/* Center Panel - Game Board */}
          <div className="order-1 lg:order-2">
            <GameBoard
              board={gameState.board}
              winningCells={gameState.winningCells}
              currentPlayer={gameState.currentPlayer}
              isGameOver={gameState.isGameOver}
              onCellClick={makeMove}
              winner={gameState.winner}
            />
          </div>

          {/* Right Panel - Scoreboard */}
          <div className="order-3">
            <Scoreboard
              scores={scores}
              onResetScores={resetScores}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Built with React, TypeScript & Tailwind CSS</p>
          <p className="mt-1">Featuring AI with Minimax Algorithm</p>
        </div>
      </div>
    </div>
  );
};