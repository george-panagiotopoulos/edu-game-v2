import React from 'react';
import { TILE_SIZE } from './GameState';
import { getMonsterAsset } from './AssetManager';

function Monster({ monster }) {
  return (
    <div
      className="monster"
      style={{
        position: 'absolute',
        left: monster.x * TILE_SIZE,
        top: monster.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(${getMonsterAsset(monster.type)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 5,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
        animation: 'monster-pulse 2s infinite'
      }}
    />
  );
}

export default Monster; 