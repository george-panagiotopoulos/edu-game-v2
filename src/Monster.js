import React from 'react';
import { TILE_SIZE } from './constants';
import { getMonsterAsset } from './AssetManager';

function Monster({ monster }) {
  const isSkeleton = monster.type.includes('skeleton');
  const assetUrl = getMonsterAsset(monster.type);
  const isHydra = monster.type === 'hydra' && monster.isBoss;
  const isBigDragon = monster.type === 'dragon' && monster.isBoss && monster.size === 2;
  const isLargeSnake = monster.type === 'snake' && monster.isBoss && monster.size === 2;
  const isLargeWolf = monster.type === 'large wolf' && monster.size === 2;
  const isLargeSpider = monster.type === 'large spider' && monster.size === 2;
  const isTrollChieftain = monster.type === 'Troll Chieftain' && monster.size === 3;
  const monsterSize = isHydra && monster.size ? monster.size : (isBigDragon || isLargeSnake || isLargeWolf || isLargeSpider ? 2 : isTrollChieftain ? 3 : 1);
  
  // Debug logging for all monsters
  console.log(`Monster ${monster.type} (ID: ${monster.id}) asset URL:`, assetUrl);
  
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
        width: TILE_SIZE * monsterSize,
        height: TILE_SIZE * monsterSize,
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
      title={`${monster.type} (${monster.hp}/${monster.maxHp} HP)${isHydra ? ` - Heads: ${monster.heads}` : ''}${isBigDragon ? ' - Big Dragon' : ''}${isLargeSnake ? ' - Large Snake' : ''}${isLargeWolf ? ' - Large Wolf' : ''}${isLargeSpider ? ' - Large Spider' : ''}${isTrollChieftain ? ' - Troll Chieftain' : ''}`}
      onError={(e) => {
        console.error('Monster image failed to load:', monster.type, assetUrl, e);
      }}
    >
      {/* Add an img element to test loading */}
      {isSkeleton && (
        <img 
          src={assetUrl}
          alt={monster.type}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => {
            console.error('Skeleton image failed to load:', monster.type, assetUrl, e);
          }}
        />
      )}
    </div>
  );
}

export default Monster; 