import React from 'react';
import { useGame, EQUIPMENT_ITEMS } from './GameState'; // Import EQUIPMENT_ITEMS
import { TILE_SIZE, TILE_TYPES } from './constants'; // Import TILE_TYPES and TILE_SIZE
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
                (currentMapId === 'main' ? 'Enter Dungeon (Μπείτε στο Μπουντρούμι)' : 
                 currentMapId === 'dungeon' ? 'Enter Dungeon Level 2 (Μπείτε στο Μπουντρούμι Επίπεδο 2)' :
                 currentMapId === 'dungeonLevel2' ? 'Exit to Dungeon (Έξοδος στο Μπουντρούμι)' :
                 'Exit Dungeon (Έξοδος από το Μπουντρούμι)') : 
                tile === TILE_TYPES.VOLCANO_ENTRANCE ? 
                (currentMapId === 'dungeon' ? 'Enter Volcano (Μπείτε στο Ηφαίστειο)' : 'Exit Volcano (Έξοδος από το Ηφαίστειο)') : 
                tile === TILE_TYPES.FOREST_ENTRANCE ? 
                (currentMapId === 'main' ? 'Enter Forest (Μπείτε στο Δάσος)' : 'Exit Forest (Έξοδος από το Δάσος)') : 
                tile === TILE_TYPES.VILLAGE_ENTRANCE ? 
                (currentMapId === 'main' ? 'Enter Crossroads (Μπείτε στη Διασταύρωση)' : 'Exit to Village (Έξοδος στο Χωριό)') : 
                tile === TILE_TYPES.TROLL_CASTLE_ENTRANCE ? 
                (currentMapId === 'crossroads' ? 'Enter Troll Castle (Μπείτε στο Κάστρο Τρολ)' : 'Exit Troll Castle (Έξοδος από το Κάστρο Τρολ)') : 
                tile === TILE_TYPES.CROSSROADS_ENTRANCE ? 
                (currentMapId === 'trollCastle' ? 'Return to Crossroads (Επιστροφή στη Διασταύρωση)' : 'Enter Crossroads (Μπείτε στη Διασταύρωση)') : 
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
          .filter(item => item.type === 'healingPotion' && !item.isCollected)
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
                backgroundImage: `url(${getItemAsset('healingPotion')})`,
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
        
        {/* Render boats */}
        {items
          .filter(item => item.type === 'boat' && !item.isCollected)
          .map(boat => (
            <div
              key={`boat-${boat.id}`}
              className="boat"
              style={{
                position: 'absolute',
                left: boat.x * TILE_SIZE + TILE_SIZE * 0.1,
                top: boat.y * TILE_SIZE + TILE_SIZE * 0.1,
                width: TILE_SIZE * (boat.size || 1) * 0.8,
                height: TILE_SIZE * (boat.size || 1) * 0.8,
                backgroundImage: `url(${getItemAsset('boat')})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid rgba(0, 123, 255, 0.8)',
                borderRadius: '8px',
                zIndex: 5,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
              }}
              title="Boat - Decorative item"
            />
          ))
        }
        
        {/* Render road signs */}
        {(() => {
          console.log('All items in map for road sign debugging:', items);
          const roadSigns = items.filter(item => item.type === 'roadSign' && !item.isCollected);
          console.log('Road signs found:', roadSigns);
          console.log('Road sign filter details:', items.map(item => ({ type: item.type, isCollected: item.isCollected })));
          return roadSigns.map(sign => (
            <div
              key={`sign-${sign.id}`}
              className="road-sign"
              style={{
                position: 'absolute',
                left: sign.x * TILE_SIZE + TILE_SIZE * 0.2,
                top: sign.y * TILE_SIZE + TILE_SIZE * 0.2,
                width: TILE_SIZE * 0.6,
                height: TILE_SIZE * 0.6,
                backgroundImage: `url(${getItemAsset('roadSign')})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(255, 255, 0, 0.3)', // Bright yellow background for debugging
                border: '3px solid rgba(255, 165, 0, 0.8)',
                borderRadius: '8px',
                zIndex: 5,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                cursor: 'pointer'
              }}
              title="Click to read sign"
              onClick={() => {
                console.log('Road sign clicked:', sign.text);
                dispatch({ type: 'SHOW_ROAD_SIGN_MESSAGE', payload: { text: sign.text } });
              }}
            />
          ));
        })()}
        
        {/* Render portable items */}
        {(() => {
          const portableItems = items
            .filter(item => (item.type === 'portablePotion' || item.type === 'freezingBomb') && !item.isCollected);
          console.log('Portable items found:', portableItems);
          return portableItems.map(portableItem => {
            // Guardian logic (optional)
            let guardianDefeated = true;
            if (portableItem.guardedBy !== null && portableItem.guardedBy !== undefined) {
              if (Array.isArray(portableItem.guardedBy)) {
                guardianDefeated = portableItem.guardedBy.every(guardianId => {
                  const monster = currentMap.monsters.find(m => m.id === guardianId);
                  return monster?.isDefeated;
                });
              } else {
                const monster = currentMap.monsters.find(m => m.id === portableItem.guardedBy);
                guardianDefeated = monster?.isDefeated;
              }
            }
            return (
              <div
                key={`portable-${portableItem.id}`}
                className={`portable-item ${guardianDefeated ? 'collectible' : 'locked'}`}
                style={{
                  position: 'absolute',
                  left: portableItem.x * TILE_SIZE + TILE_SIZE * 0.2,
                  top: portableItem.y * TILE_SIZE + TILE_SIZE * 0.2,
                  width: TILE_SIZE * 0.6,
                  height: TILE_SIZE * 0.6,
                  backgroundImage: `url(${(() => {
                    const assetUrl = getItemAsset(portableItem.type === 'freezingBomb' ? 'freezingBomb' : 'portablePotion');
                    console.log('Portable item asset URL:', assetUrl);
                    return assetUrl;
                  })()})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: guardianDefeated ? '3px solid rgba(255, 0, 255, 0.8)' : '3px solid #FF4444',
                  borderRadius: '8px',
                  zIndex: 5,
                  filter: guardianDefeated ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5)) brightness(0.75)',
                  animation: guardianDefeated ? 'equipment-glow 2s infinite ease-in-out' : 'equipment-locked-pulse 3s infinite ease-in-out',
                  cursor: guardianDefeated ? 'pointer' : 'not-allowed',
                  opacity: guardianDefeated ? 1 : 0.85
                }}
                title={guardianDefeated ? (
                  portableItem.type === 'freezingBomb' ? `${portableItem.name} (❄️ Παγώνει εχθρούς για 5 γύρους) - Κάνε κλικ για συλλογή!` : `${portableItem.name} (+${portableItem.healAmount} HP) - Click to collect!`
                ) : (
                  portableItem.type === 'freezingBomb' ? `${portableItem.name} (Φρουρείται - νικήστε τον Φρουρό για συλλογή)` : `${portableItem.name} (Φρουρείται - νικήστε τον Φρουρό για συλλογή)`
                )}
                onClick={() => {
                  console.log('Portable item clicked:', portableItem);
                  if (guardianDefeated) {
                    dispatch({ type: 'COLLECT_PORTABLE_ITEM', payload: { itemId: portableItem.id } });
                  }
                }}
              />
            );
          });
        })()}
        
        {/* Render gold piles */}
        {items
          .filter(item => item.type === 'gold' && !item.isCollected)
          .map(goldPile => {
            // Check if hero is within 1 tile of the gold
            const heroDistance = Math.max(
              Math.abs(hero.x - goldPile.x),
              Math.abs(hero.y - goldPile.y)
            );
            const isClickable = heroDistance <= 1;
            
            return (
              <div
                key={`gold-${goldPile.id}`}
                className="gold-pile"
                style={{
                  position: 'absolute',
                  left: goldPile.x * TILE_SIZE + TILE_SIZE * 0.2,
                  top: goldPile.y * TILE_SIZE + TILE_SIZE * 0.2,
                  width: TILE_SIZE * 0.6,
                  height: TILE_SIZE * 0.6,
                  backgroundImage: `url(${getItemAsset('gold')})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '3px solid rgba(255, 215, 0, 0.8)',
                  borderRadius: '8px',
                  zIndex: 5,
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                  animation: isClickable ? 'gold-glow 2s infinite ease-in-out' : 'none',
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: isClickable ? 1 : 0.7
                }}
                title={isClickable ? 
                  `Gold Pile (${goldPile.amount} gold) - Click to collect!` : 
                  `Gold Pile (${goldPile.amount} gold) - Too far away (Distance: ${heroDistance})`
                }
                onClick={() => {
                  if (isClickable) {
                    console.log('Gold pile clicked:', goldPile);
                    dispatch({ type: 'COLLECT_GOLD', payload: { itemId: goldPile.id, amount: goldPile.amount } });
                  }
                }}
              />
            );
          })}
        
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
              className={`armor ${armor.name === 'Red Armor' ? 'red-armor' : ''}`}
              style={{
                position: 'absolute',
                left: armor.x * TILE_SIZE + TILE_SIZE * 0.25,
                top: armor.y * TILE_SIZE + TILE_SIZE * 0.25,
                width: TILE_SIZE * 0.5,
                height: TILE_SIZE * 0.5,
                backgroundImage: `url(${getEquipmentAsset(
                  armor.name === 'Red Armor' ? 'redArmor' : 
                  armor.name === 'Dungeon Armor' ? 'dungeonArmor' : 
                  'armor'
                )})`,
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
              title={`${armor.name} (-${armor.defense} damage reduction${armor.fireImmune ? ', Fire Immune' : ''}) - Click to collect!`}
              onClick={() => {
                console.log('Armor clicked:', armor);
                console.log('Armor asset URL:', getEquipmentAsset(
                  armor.name === 'Red Armor' ? 'redArmor' : 
                  armor.name === 'Dungeon Armor' ? 'dungeonArmor' : 
                  'armor'
                ));
                console.log('Current map items:', items);
                console.log('Current map ID:', currentMapId);
                dispatch({ type: 'COLLECT_ARMOR', payload: { armorId: armor.id } });
              }}
            />
          ));
        })()}
        
        {/* Render equipment items (always visible as bait, but only collectible when guardian is defeated) */}
        {(() => {
          const equipmentItems = items.filter(item => 
            item.type === 'equipment' && 
            !item.isCollected
          );
          console.log('All items in map:', items);
          console.log('Equipment items found:', equipmentItems);
          return equipmentItems.map(equipment => {
            console.log('Rendering equipment:', equipment);
            console.log('Equipment type:', equipment.equipmentType);
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
                  backgroundImage: `url(${(() => {
                    const assetUrl = getEquipmentAsset(equipment.equipmentType);
                    console.log('Equipment asset URL for', equipment.equipmentType, ':', assetUrl);
                    return assetUrl;
                  })()})`,
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
              />
            );
          });
        })()}

        {/* Render books */}
        {currentMap.items.filter(item => item.type === 'book' && !item.isCollected).map(book => {
          // If a book requires a monster defeated, enforce it
          let canRead = true;
          if (book.requiresMonsterDefeated) {
            const guardian = currentMap.monsters.find(m => m.id === book.requiresMonsterDefeated);
            canRead = guardian?.isDefeated;
          }
          return (
          <div
            key={book.id}
            className="map-item book"
            style={{
              position: 'absolute',
              left: book.x * TILE_SIZE + TILE_SIZE * 0.2,
              top: book.y * TILE_SIZE + TILE_SIZE * 0.2,
              width: TILE_SIZE * 0.6,
              height: TILE_SIZE * 0.6,
              backgroundImage: `url(${getItemAsset('book')})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '3px solid rgba(139, 69, 19, 0.8)',
              borderRadius: '8px',
              zIndex: 10,
              filter: canRead ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' : 'grayscale(60%) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
              cursor: canRead ? 'pointer' : 'not-allowed',
              opacity: canRead ? 1 : 0.8
            }}
            onClick={() => {
              if (canRead) {
                dispatch({ type: 'OPEN_BOOK', payload: { bookType: book.bookType } });
              }
            }}
            title={canRead ? book.name : `${book.name} (Ξεκλειδώνεται όταν νικηθεί ο φρουρός)`}
          />
          );
        })}

        {/* Render treasure */}
        {currentMap.items.filter(item => item.type === 'treasure' && !item.isCollected).map(treasure => (
          <div
            key={treasure.id}
            className="map-item treasure"
            style={{
              position: 'absolute',
              left: treasure.x * TILE_SIZE,
              top: treasure.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
              backgroundImage: `url(${getItemAsset('treasure')})`,
              backgroundSize: 'cover',
              cursor: 'pointer',
              zIndex: 10
            }}
            onClick={() => dispatch({ type: 'COLLECT_TREASURE', payload: { treasureId: treasure.id } })}
            title={treasure.name}
          />
        ))}

        {/* Render boats */}
        {currentMap.items.filter(item => item.type === 'boat').map(boat => {
          // Check if hero is within 1 tile of the boat (accounting for 2x2 size)
          const boatSize = boat.size || 1;
          const boatEndX = boat.x + boatSize - 1;
          const boatEndY = boat.y + boatSize - 1;
          
          let distanceX, distanceY;
          
          if (hero.x < boat.x) {
            // Hero is to the left of boat
            distanceX = boat.x - hero.x;
          } else if (hero.x > boatEndX) {
            // Hero is to the right of boat
            distanceX = hero.x - boatEndX;
          } else {
            // Hero is within boat's X range
            distanceX = 0;
          }
          
          if (hero.y < boat.y) {
            // Hero is above boat
            distanceY = boat.y - hero.y;
          } else if (hero.y > boatEndY) {
            // Hero is below boat
            distanceY = hero.y - boatEndY;
          } else {
            // Hero is within boat's Y range
            distanceY = 0;
          }
          
          // Use the maximum distance (correct for proximity calculation)
          const heroDistance = Math.max(distanceX, distanceY);
          const isClickable = heroDistance <= 1 && !boat.isCollected;
          
          return (
            <div
              key={boat.id}
              className="map-item boat"
              style={{
                position: 'absolute',
                left: boat.x * TILE_SIZE,
                top: boat.y * TILE_SIZE,
                width: (boat.size || 1) * TILE_SIZE,
                height: (boat.size || 1) * TILE_SIZE,
                backgroundImage: `url(${getItemAsset('boat')})`,
                backgroundSize: 'cover',
                cursor: isClickable ? 'pointer' : 'default',
                zIndex: 10,
                opacity: boat.isCollected ? 0.4 : (isClickable ? 1 : 0.7),
                filter: boat.isCollected ? 'grayscale(100%)' : 'none'
              }}
              onClick={() => {
                if (isClickable) {
                  // Boat click triggers map transition
                  dispatch({ type: 'BOAT_INTERACTION' });
                }
              }}
              title={boat.isCollected ? `${boat.name} (Deactivated)` : (isClickable ? boat.name : `${boat.name} (Too far away - Distance: ${heroDistance})`)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GameMap;