import React from 'react';
import { useGame, TILE_SIZE } from './GameState';
import { getTileAsset } from './AssetManager';
import Hero from './Hero';
import Monster from './Monster';

function GameMap() {
  const { state } = useGame();
  const { map, hero, monsters } = state;

  return (
    <div className="game-map">
      <div 
        className="map-container"
        style={{
          width: map.width * TILE_SIZE,
          height: map.height * TILE_SIZE,
          position: 'relative',
          border: '2px solid #333'
        }}
      >
        {/* Render tiles */}
        {map.tiles.map((row, y) =>
          row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className="tile"
              style={{
                position: 'absolute',
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundImage: `url(${getTileAsset(tile)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))
        )}
        
        {/* Render hero */}
        <Hero x={hero.x} y={hero.y} />
        
        {/* Render monsters */}
        {monsters
          .filter(monster => !monster.isDefeated)
          .map(monster => (
            <Monster key={monster.id} monster={monster} />
          ))
        }
      </div>
    </div>
  );
}

export default GameMap; 