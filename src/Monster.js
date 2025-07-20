import React from 'react';
import { TILE_SIZE } from './GameState';
import { getMonsterAsset } from './AssetManager';

function Monster({ monster }) {
  const isSkeleton = monster.type.includes('skeleton');
  const assetUrl = getMonsterAsset(monster.type);
  
  // Debug logging for skeletons
  if (isSkeleton) {
    console.log(`Skeleton ${monster.type} asset URL:`, assetUrl);
  }
  
  return (
    <div
      className="monster"
      style={{
        position: 'absolute',
        left: monster.x * TILE_SIZE,
        top: monster.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(${assetUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        border: '3px solid rgba(255, 0, 0, 0.8)',
        zIndex: 5,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.7))',
        animation: 'monster-pulse 2s infinite',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={`${monster.type} (${monster.hp}/${monster.maxHp} HP)`}
    >
      {/* Add an img element to test loading */}
      {isSkeleton && (
        <img 
          src={assetUrl} 
          alt={monster.type}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          onLoad={() => console.log(`${monster.type} image loaded successfully`)}
          onError={(e) => console.error(`${monster.type} image failed to load:`, e)}
        />
      )}
    </div>
  );
}

export default Monster; 