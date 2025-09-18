export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export type GameMode = 'pvp' | 'pvc';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameMode: GameMode;
  difficulty: Difficulty;
  isGameOver: boolean;
  winner: Player | 'draw' | null;
  winningCells: number[];
  moveHistory: Move[];
}

export interface Move {
  position: number;
  player: Player;
  timestamp: number;
}

export interface Score {
  x: number;
  o: number;
  draws: number;
}

export interface PlayerNames {
  x: string;
  o: string;
}

export interface GameSettings {
  playerNames: PlayerNames;
  soundEnabled: boolean;
  difficulty: Difficulty;
}