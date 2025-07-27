import React from 'react';
import { useGame, TILE_SIZE, TILE_TYPES, EQUIPMENT_ITEMS } from './GameState'; // Import TILE_TYPES and EQUIPMENT_ITEMS
import { getTileAsset, getItemAsset, getEquipmentAsset } from './AssetManager';
import Hero from './Hero';
import Monster from './Monster';

function GameMap() {
  const { state, dispatch } = useGame();
  const { hero, currentMapId, maps } = state; // Get currentMapId and maps from state
  const currentMap = maps[currentMapId]; // Get the current map data
  const monsters = currentMap.monsters; // Get monsters specific to the current map
  const items = currentMap.items; // Get items specific to the current map

  return (
    <div className="game-map">
      <div 
        className="map-container"
        style={{
          width: currentMap.width * TILE_SIZE,
          height: currentMap.height * TILE_SIZE,
          position: 'relative',
          border: '2px solid #333'
        }}
      >
        {/* Render tiles */}
        {currentMap.tiles.map((row, y) => // Use currentMap.tiles
          row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className="tile"
              data-tile-type={tile}
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
                backgroundRepeat: 'no-repeat',
                cursor: tile === TILE_TYPES.SHOP ? 'pointer' : 'default'
              }}
              title={tile === TILE_TYPES.DUNGEON_ENTRANCE ? 
                (currentMapId === 'main' ? 'Enter Dungeon (Μπείτε στο Μπουντρούμι)' : 'Exit Dungeon (Έξοδος από το Μπουντρούμι)') : 
                tile === TILE_TYPES.VOLCANO_ENTRANCE ? 
                (currentMapId === 'dungeon' ? 'Enter Volcano (Μπείτε στο Ηφαίστειο)' : 'Exit Volcano (Έξοδος από το Ηφαίστειο)') : 
                tile === TILE_TYPES.FOREST_ENTRANCE ? 
                (currentMapId === 'main' ? 'Enter Forest (Μπείτε στο Δάσος)' : 'Exit Forest (Έξοδος από το Δάσος)') : 
                tile === TILE_TYPES.SHOP ? 
                'Shop (Κατάστημα)' : 
                ''}
              onClick={tile === TILE_TYPES.SHOP ? () => {
                console.log('Shop clicked at position:', x, y, 'tile type:', tile);
                // Check if hero is adjacent to the shop
                const heroX = hero.x;
                const heroY = hero.y;
                const isAdjacent = Math.abs(heroX - x) <= 1 && Math.abs(heroY - y) <= 1;
                console.log('Hero position:', heroX, heroY, 'Shop position:', x, y, 'Is adjacent:', isAdjacent);
                
                if (isAdjacent) {
                  // Trigger shop interaction by dispatching a special action
                  dispatch({ type: 'SHOP_INTERACTION', payload: { x, y } });
                } else {
                  console.log('Hero is not adjacent to shop, cannot interact');
                }
              } : undefined}
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
        
        {/* Render potions */}
        {items
          .filter(item => item.type === 'potion' && !item.isCollected)
          .map(potion => (
            <div
              key={`potion-${potion.id}`}
              className="potion"
              style={{
                position: 'absolute',
                left: potion.x * TILE_SIZE + TILE_SIZE * 0.2,
                top: potion.y * TILE_SIZE + TILE_SIZE * 0.2,
                width: TILE_SIZE * 0.6,
                height: TILE_SIZE * 0.6,
                backgroundImage: `url(${getItemAsset('potion')})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid rgba(0, 123, 255, 0.8)',
                borderRadius: '8px',
                zIndex: 5,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
              }}
              title={`Healing Potion (+${potion.healAmount} HP)`}
            />
          ))
        }
        
        {/* Render armor items */}
        {(() => {
          console.log('Current map ID:', currentMapId);
          console.log('All items in current map:', items);
          const armorItems = items.filter(item => 
            item.type === 'armor' && 
            !item.isCollected
          );
          console.log('Armor items to render:', armorItems);
          return armorItems.map(armor => (
            <div
              key={`armor-${armor.id}`}
              className="armor"
              style={{
                position: 'absolute',
                left: armor.x * TILE_SIZE + TILE_SIZE * 0.25,
                top: armor.y * TILE_SIZE + TILE_SIZE * 0.25,
                width: TILE_SIZE * 0.5,
                height: TILE_SIZE * 0.5,
                backgroundImage: `url(${getItemAsset('armor')})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid #FFD700',
                borderRadius: '8px',
                zIndex: 5,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                animation: 'equipment-glow 2s infinite ease-in-out',
                cursor: 'pointer'
              }}
              title={`${armor.name} (-${armor.defense} damage reduction) - Click to collect!`}
              onClick={() => {
                console.log('Armor clicked:', armor);
                console.log('Current map items:', items);
                console.log('Current map ID:', currentMapId);
                dispatch({ type: 'COLLECT_ARMOR', payload: { armorId: armor.id } });
              }}
            />
          ));
        })()}
        
        {/* Render equipment items (always visible as bait, but only collectible when guardian is defeated) */}
        {items
          .filter(item => 
            item.type === 'equipment' && 
            !item.isCollected
          )
          .map(equipment => {
            console.log('Rendering equipment:', equipment);
            console.log('Equipment asset URL:', getEquipmentAsset(equipment.equipmentType));
            const guardianDefeated = equipment.guardedBy ? 
              (Array.isArray(equipment.guardedBy) ? 
                equipment.guardedBy.every(guardianId => 
                  currentMap.monsters.find(monster => monster.id === guardianId)?.isDefeated
                ) : 
                currentMap.monsters.find(monster => monster.id === equipment.guardedBy)?.isDefeated
              ) : true; // Use current map monsters, or true if no guardian
            return (
              <div
                key={`equipment-${equipment.id}`}
                className={`equipment ${guardianDefeated ? 'collectible' : 'locked'}`}
                style={{
                  position: 'absolute',
                  left: equipment.x * TILE_SIZE + TILE_SIZE * 0.25,
                  top: equipment.y * TILE_SIZE + TILE_SIZE * 0.25,
                  width: TILE_SIZE * 0.5,
                  height: TILE_SIZE * 0.5,
                  backgroundImage: `url(${getEquipmentAsset(equipment.equipmentType)})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: guardianDefeated ? '3px solid #00FF00' : '3px solid #FF4444',
                  borderRadius: '8px',
                  zIndex: 5,
                  filter: guardianDefeated ? 
                    'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' : 
                    'drop-shadow(2px 2px 4px rgba(0,0,0,0.5)) brightness(0.7)',
                  animation: guardianDefeated ? 
                    'equipment-glow 2s infinite ease-in-out' : 
                    'equipment-locked-pulse 3s infinite ease-in-out',
                  opacity: guardianDefeated ? 1 : 0.8
                }}
                onError={(e) => {
                  console.error('Equipment image failed to load:', equipment.equipmentType, e);
                }}
                title={guardianDefeated ? 
                  `${EQUIPMENT_ITEMS[equipment.equipmentType]?.name || equipment.equipmentType} - Click to collect!` :
                  `${EQUIPMENT_ITEMS[equipment.equipmentType]?.name || equipment.equipmentType} - Defeat the guardian monster first!`
                }
                onClick={() => {
                  console.log('Equipment clicked:', equipment);
                  console.log('Guardian defeated:', guardianDefeated);
                  if (guardianDefeated) {
                    console.log('Dispatching COLLECT_EQUIPMENT for:', equipment.id);
                    dispatch({ type: 'COLLECT_EQUIPMENT', payload: { equipmentId: equipment.id } });
                  } else {
                    console.log('Equipment not collectible - guardian not defeated');
                  }
                }}
              >
                {/* Add an img element to test loading */}
                <img 
                  src={getEquipmentAsset(equipment.equipmentType)} 
                  alt={equipment.equipmentType}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  onLoad={() => console.log(`${equipment.equipmentType} image loaded successfully`)}
                  onError={(e) => console.error(`${equipment.equipmentType} image failed to load:`, e)}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default GameMap; 