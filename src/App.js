import React, { useEffect } from 'react';
import { GameProvider, useGame } from './GameState';
import GameMap from './GameMap';
import HUD from './HUD';
import './App.css';

function GameContent() {
  const { state, dispatch } = useGame();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (state.battle.isActive) return; // Don't move during battle
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 0, y: -1 } });
          break;
        case 'ArrowDown':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 0, y: 1 } });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: -1, y: 0 } });
          break;
        case 'ArrowRight':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 1, y: 0 } });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, state.battle.isActive]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Educational RPG Adventure</h1>
      </div>
      <div className="game-content">
        <GameMap />
        <HUD />
      </div>
      <div className="game-instructions">
        <p>Use arrow keys to move your armored knight through the medieval village!</p>
        <p>Explore connected roads, visit houses, and cross bridges over water!</p>
        <p>Find 9 different monsters scattered around the village - battles coming soon!</p>
        <p>Stay on grass, roads, and paths. Avoid water, rocks, walls, and buildings!</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App; 