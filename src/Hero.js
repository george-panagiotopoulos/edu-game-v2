import React from 'react';
import { TILE_SIZE } from './GameState';
import { getHeroAsset } from './AssetManager';

function Hero({ x, y }) {
  return (
    <div
      className="hero"
      style={{
        position: 'absolute',
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(${getHeroAsset()})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 10,
        transition: 'all 0.2s ease',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
      }}
    />
  );
}

export default Hero; 