# Minimax Mastery - Tic-Tac-Toe Game

A React-based Tic-Tac-Toe game that demonstrates the minimax algorithm for AI gameplay. The AI plays optimally, making it unbeatable.

## Features

- Interactive Tic-Tac-Toe board
- AI opponent using minimax algorithm
- Score tracking
- Game controls (reset, new game)
- Responsive design with Tailwind CSS

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

## How to Run

1. Clone the repository:
   ```
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory:
   ```
   cd minimax-mastery-main
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:8080/`

## Game Rules

- Players take turns placing X or O on a 3x3 grid
- The first player to get 3 in a row (horizontally, vertically, or diagonally) wins
- If all 9 squares are filled without a winner, it's a draw
- Play against the AI, which uses the minimax algorithm to play optimally

## Project Structure

- `src/components/` - React components for the game
- `src/hooks/` - Custom hooks for game logic, scoring, and sound
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility functions

## Deployment

This project can be deployed using any static site hosting service like Vercel, Netlify, or GitHub Pages.
