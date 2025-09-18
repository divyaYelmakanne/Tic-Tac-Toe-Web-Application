import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, Cell, Move, GameMode, Difficulty } from '@/types/game';

const INITIAL_BOARD: Cell[] = Array(9).fill(null);

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns  
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: [...INITIAL_BOARD],
    currentPlayer: 'X',
    gameMode: 'pvp',
    difficulty: 'medium',
    isGameOver: false,
    winner: null,
    winningCells: [],
    moveHistory: []
  });

  const checkWinner = useCallback((board: Cell[]): { winner: Player | 'draw' | null; winningCells: number[] } => {
    // Check for winning combination
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, winningCells: [a, b, c] };
      }
    }
    
    // Check for draw
    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', winningCells: [] };
    }
    
    return { winner: null, winningCells: [] };
  }, []);

  const makeMove = useCallback((position: number) => {
    setGameState(prev => {
      if (prev.board[position] || prev.isGameOver) return prev;
      
      const newBoard = [...prev.board];
      newBoard[position] = prev.currentPlayer;
      
      const move: Move = {
        position,
        player: prev.currentPlayer,
        timestamp: Date.now()
      };
      
      const { winner, winningCells } = checkWinner(newBoard);
      
      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        isGameOver: winner !== null,
        winner,
        winningCells,
        moveHistory: [...prev.moveHistory, move]
      };
    });
  }, [checkWinner]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: [...INITIAL_BOARD],
      currentPlayer: 'X',
      isGameOver: false,
      winner: null,
      winningCells: [],
      moveHistory: []
    }));
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
  }, []);

  // AI Move Logic
  const getAIMove = useCallback((board: Cell[], difficulty: Difficulty, player: Player): number => {
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[];
    
    if (emptyCells.length === 0) return -1;

    switch (difficulty) {
      case 'easy':
        // Random move
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      case 'medium':
        // 50% optimal, 50% random
        return Math.random() < 0.5 
          ? getBestMove(board, player)
          : emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      case 'hard':
        // Always optimal using minimax
        return getBestMove(board, player);
      
      default:
        return emptyCells[0];
    }
  }, []);

  const getBestMove = useCallback((board: Cell[], player: Player): number => {
    const opponent = player === 'X' ? 'O' : 'X';
    
    // Check if AI can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = player;
        const { winner } = checkWinner(testBoard);
        if (winner === player) return i;
      }
    }
    
    // Check if AI needs to block opponent
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = opponent;
        const { winner } = checkWinner(testBoard);
        if (winner === opponent) return i;
      }
    }
    
    // Take center if available
    if (board[4] === null) return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(pos => board[pos] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any edge
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(pos => board[pos] === null);
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }
    
    return -1;
  }, [checkWinner]);

  // AI Move Effect
  useEffect(() => {
    if (gameState.gameMode === 'pvc' && 
        gameState.currentPlayer === 'O' && 
        !gameState.isGameOver && 
        gameState.board.some(cell => cell !== null)) {
      
      const timeoutId = setTimeout(() => {
        const aiMove = getAIMove(gameState.board, gameState.difficulty, 'O');
        if (aiMove !== -1) {
          makeMove(aiMove);
        }
      }, 500); // AI thinking delay
      
      return () => clearTimeout(timeoutId);
    }
  }, [gameState, getAIMove, makeMove]);

  return {
    gameState,
    makeMove,
    resetGame,
    setGameMode,
    setDifficulty
  };
};