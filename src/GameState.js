import { createContext, useContext, useReducer } from 'react';
import { generateRandomRiddleForMap } from './RiddleManager';
import { createMainMapState } from './maps/MainMapState';
import { createDungeonMapState } from './maps/DungeonMapState';
import { createDungeonLevel2MapState } from './maps/DungeonLevel2MapState';
import { createVolcanoMapState } from './maps/VolcanoMapState';
import { createForestMapState } from './maps/ForestMapState';
import { createCrossroadsMapState } from './maps/CrossroadsMapState';
import { createTreasureIslandMapState } from './maps/TreasureIslandMapState';
import { createTrollCastleMapState } from './maps/TrollCastleMapState';
import { createDangerousAreaMapState } from './maps/DangerousAreaMapState';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, TILE_TYPES, TRAP_TYPES, EQUIPMENT_TYPES } from './constants';

// Equipment definitions (parametrical system for future expansion)
export const EQUIPMENT_ITEMS = {
  sword: {
    name: 'Iron Sword',
    type: EQUIPMENT_TYPES.WEAPON,
    damageBonus: 3, // adds 1-3 damage
    asset: 'sword.png'
  },
  shield: {
    name: 'Knight Shield',
    type: EQUIPMENT_TYPES.SHIELD, // Use EQUIPMENT_TYPES.SHIELD as the type
    blockChance: 0.25, // 25% chance to block
    asset: 'shield.jpeg'
  },
  ring: {
    name: 'Ring of Knowledge',
    type: EQUIPMENT_TYPES.ACCESSORY,
    charges: 3,
    asset: 'ring.png'
  },
  axe: {
    name: 'Magic Axe',
    type: EQUIPMENT_TYPES.WEAPON,
    damageBonus: 5, // adds 5 damage
    criticalChance: 0.20, // 20% chance of critical strike
    asset: 'axe.png'
  },
  magicShield: {
    name: 'Magic Shield',
    type: EQUIPMENT_TYPES.SHIELD,
    blockChance: 0.25, // 25% chance to block, increases to 40% when HP < 40
    asset: 'magic_shield.png'
  },
  flamingSword: {
    name: 'Flaming Sword',
    type: EQUIPMENT_TYPES.WEAPON,
    damageBonus: 5, // adds 5 damage
    criticalChance: 0.20, // 20% chance of critical strike
    fireEffect: true, // sets target on fire
    asset: 'flaming sword.png'
  },
  redArmor: {
    name: 'Red Armor',
    type: EQUIPMENT_TYPES.ARMOR,
    defense: 4, // -4 damage reduction
    fireImmune: true, // Immune to fire damage
    asset: 'red armor.jpg'
  },
  dungeonArmor: {
    name: 'Dungeon Armor',
    type: EQUIPMENT_TYPES.ARMOR,
    defense: 2, // -2 damage reduction
    asset: 'armor.png'
  },
  armor: {
    name: 'Knight Armor',
    type: EQUIPMENT_TYPES.ARMOR,
    defense: 2,
    asset: 'armor.png'
  },
  spear: {
    name: 'Ice Spear',
    type: EQUIPMENT_TYPES.WEAPON,
    damageBonus: 7, // adds 7 damage
    freezeChance: 0.25, // 25% chance to freeze opponent
    asset: 'spear.png'
  }
};

// Load permanent HP bonus from localStorage
const loadPermanentHpBonus = () => {
  try {
    const saved = localStorage.getItem('permanentHpBonus');
    return saved ? parseInt(saved, 10) : 0;
  } catch (error) {
    console.error('Error loading permanent HP bonus:', error);
    return 0;
  }
};

// Save permanent HP bonus to localStorage
const savePermanentHpBonus = (bonus) => {
  try {
    localStorage.setItem('permanentHpBonus', bonus.toString());
  } catch (error) {
    console.error('Error saving permanent HP bonus:', error);
  }
};

















// Initial game state
const initialState = {
  hero: {
    x: 9,
    y: 7,
    hp: 105, // Set to 105 HP (100 base + 5 permanent bonus)
    maxHp: 105, // Set max HP to 105
    permanentHpBonus: 5, // Set permanent HP bonus to 5
    inventory: [],
    portableItems: [], // New: portable items that can be used during battle
    gold: 0, // New: gold currency
    equipment: {
      weapon: null,
      shield: null,
      armor: null,
      ring: null
    },
    bag: {
      weapon: [],
      shield: [],
      armor: [],
      ring: []
    },
    ringCharges: 0, // Simple counter for ring charges
    onFire: false, // New: fire effect state
    fireDamage: 0, // New: fire damage counter
    isPoisoned: false, // New: poison effect state
    poisonDamage: 0 // New: poison damage counter
  },
  currentMapId: 'main', // New: Track current map
  maps: { // New: Store multiple maps
    main: createMainMapState(),
    dungeon: createDungeonMapState(),
    dungeonLevel2: createDungeonLevel2MapState(),
    volcano: createVolcanoMapState(),
    forest: createForestMapState(),
    crossroads: createCrossroadsMapState(),
    treasureIsland: createTreasureIslandMapState(),
    trollCastle: createTrollCastleMapState(),
    dangerousArea: createDangerousAreaMapState()
  },
  battle: {
    isActive: false,
    currentMonster: null,
    battleQueue: [], // For multiple monster battles
    currentRiddle: null,
    turn: 'hero',
    battleBackground: 'grass', // grass, stone, or castle
    battleMessage: '',
    awaitingRiddleAnswer: false,
    monsterAttacking: false,
    heroAttacking: false,
    attackQueue: [],
    showVictoryPopup: false,
    heroFrozen: false, // New: Hero frozen condition
    monsterFrozen: false, // New: Monster frozen condition
    monsterFrozenTurns: 0 // New: Remaining turns monster is frozen
  },
  shop: {
    isOpen: false
  },
  book: {
    isOpen: false,
    bookType: null
  }
};

// Game state reducer
function gameReducer(state, action) {
  const currentMap = state.maps ? state.maps[state.currentMapId] : null;
  
  // Safety check to ensure currentMap exists
  if (!currentMap && action.type !== 'RESET_PROGRESS') {
    console.error('Current map not found:', state.currentMapId, 'Available maps:', Object.keys(state.maps || {}));
    return state;
  }
  
  switch (action.type) {
    case 'MOVE_HERO':
      if (!currentMap) return state;
      
      const { x, y } = action.payload;
      const newX = Math.max(0, Math.min(currentMap.width - 1, state.hero.x + x));
      const newY = Math.max(0, Math.min(currentMap.height - 1, state.hero.y + y));
      
      // Safety check to ensure tiles exist
      if (!currentMap.tiles || !currentMap.tiles[newY] || !currentMap.tiles[newY][newX]) {
        console.error('Tiles not properly initialized for map:', state.currentMapId, 'at position:', newX, newY);
        return state;
      }
      
      // Check if the new position is walkable
      const tileType = currentMap.tiles[newY][newX];
      const isWalkable = tileType !== TILE_TYPES.WATER && 
                        tileType !== TILE_TYPES.WATER2 &&
                        tileType !== TILE_TYPES.WALL && 
                        tileType !== TILE_TYPES.DUNGEON_WALL &&
                        tileType !== TILE_TYPES.TREE &&
                        tileType !== TILE_TYPES.TREE2 &&
                        tileType !== TILE_TYPES.TREE3 &&
                        tileType !== TILE_TYPES.TREE4 &&
                        tileType !== TILE_TYPES.TREE5 &&
                        tileType !== TILE_TYPES.HOUSE1 &&
                        tileType !== TILE_TYPES.HOUSE2 &&
                        tileType !== TILE_TYPES.HOUSE3 &&
                        tileType !== TILE_TYPES.HOUSE4 &&
                        tileType !== TILE_TYPES.HOUSE5 &&
                        tileType !== TILE_TYPES.WINDMILL &&
                        tileType !== TILE_TYPES.CASTLE &&
                        tileType !== TILE_TYPES.ROCKS &&
                        tileType !== TILE_TYPES.FIRE &&
                        tileType !== TILE_TYPES.SHOP;

      // New: Handle dungeon entrance/exit
      if (tileType === TILE_TYPES.DUNGEON_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'main') {
          newMapId = 'dungeon';
          // Keep hero at the same coordinates in the new map
        } else if (state.currentMapId === 'dungeon') {
          // Check if this is the entrance to dungeon level 2 (at position 17,13)
          if (newX === 17 && newY === 13) {
            newMapId = 'dungeonLevel2';
            // Keep hero at the same coordinates in the new map
          } else {
            newMapId = 'main';
            // Keep hero at the same coordinates in the new map
          }
        } else if (state.currentMapId === 'dungeonLevel2') {
          // Exit from dungeon level 2 back to dungeon (at position 18,1)
          if (newX === 18 && newY === 1) {
            newMapId = 'dungeon';
            // Keep hero at the same coordinates in the new map
          }
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle volcano entrance/exit
      if (tileType === TILE_TYPES.VOLCANO_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'dungeon') {
          newMapId = 'volcano';
          // Keep hero at the same coordinates in the new map
        } else if (state.currentMapId === 'volcano') {
          newMapId = 'dungeon';
          // Keep hero at the same coordinates in the new map
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle forest entrance/exit
      if (tileType === TILE_TYPES.FOREST_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'main') {
          newMapId = 'forest';
          // Keep hero at the same coordinates in the new map
        } else if (state.currentMapId === 'forest') {
          newMapId = 'main';
          // Exit to village at (2,10) as requested
          newHeroX = 2;
          newHeroY = 10;
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle village entrance/exit (for Crossroads transitions)
      if (tileType === TILE_TYPES.VILLAGE_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'main') {
          newMapId = 'crossroads';
          // Hero enters Crossroads at position (17,11) as specified
          newHeroX = 17;
          newHeroY = 11;
        } else if (state.currentMapId === 'crossroads') {
          newMapId = 'main';
          // Hero returns to Village at position (2,9) as specified
          newHeroX = 2;
          newHeroY = 9;
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle Dangerous Area entrance/exit
      if (tileType === TILE_TYPES.DANGEROUS_AREA_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'crossroads') {
          newMapId = 'dangerousArea';
          // Enter at a safe location
          newHeroX = 16;
          newHeroY = 11;
        } else if (state.currentMapId === 'dangerousArea') {
          newMapId = 'crossroads';
          // Return near the sign area
          newHeroX = 8; // tile used for entrance in crossroads top row
          newHeroY = 0;
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle troll castle entrance/exit
      if (tileType === TILE_TYPES.TROLL_CASTLE_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'crossroads') {
          // From Crossroads to Troll Castle
          newMapId = 'trollCastle';
          // Hero will start at (1,1) in Troll Castle
          newHeroX = 0; // 1 in 1-based = 0 in 0-based
          newHeroY = 0; // 1 in 1-based = 0 in 0-based
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle crossroads entrance/exit
      if (tileType === TILE_TYPES.CROSSROADS_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'trollCastle') {
          // From Troll Castle back to Crossroads
          newMapId = 'crossroads';
          // Hero will start at (8,13) in Crossroads
          newHeroX = 7; // 8 in 1-based = 7 in 0-based
          newHeroY = 12; // 13 in 1-based = 12 in 0-based
        }

        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }

      // Handle boat transitions
      if (tileType === TILE_TYPES.BOAT) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'crossroads') {
          // From Crossroads to Treasure Island
          newMapId = 'treasureIsland';
          // Hero will start at (15,4) in Treasure Island
          newHeroX = 14; // 15 in 1-based = 14 in 0-based
          newHeroY = 3;  // 4 in 1-based = 3 in 0-based
        } else if (state.currentMapId === 'treasureIsland') {
          // From Treasure Island back to Crossroads
          newMapId = 'crossroads';
          // Hero will start at (8,3) in Crossroads
          newHeroX = 7; // 8 in 1-based = 7 in 0-based
          newHeroY = 2; // 3 in 1-based = 2 in 0-based
        }

        if (newMapId) {
          return {
            ...state,
            hero: {
              ...state.hero,
              x: newHeroX,
              y: newHeroY,
            },
            currentMapId: newMapId,
            battle: { // Clear any battle state when changing maps
              ...state.battle,
              isActive: false,
              currentMonster: null,
              battleQueue: [],
              currentRiddle: null,
              battleMessage: '',
              awaitingRiddleAnswer: false,
            }
          };
        }
      }

      if (isWalkable) {
        // Check for monsters in proximity from the current map's monsters
        const monstersInProximity = currentMap.monsters.filter(monster => {
          if (monster.isDefeated) return false;
          
          // Handle 2x2 monsters (like hydra)
          const monsterSize = monster.size || 1;
          const monsterEndX = monster.x + monsterSize - 1;
          const monsterEndY = monster.y + monsterSize - 1;
          
          // Check if hero is within the monster's area or proximity
          const withinMonsterArea = newX >= monster.x && newX <= monsterEndX && 
                                   newY >= monster.y && newY <= monsterEndY;
          
          if (withinMonsterArea) return true;
          
          // Check proximity distance - use different logic for 2x2 vs 1x1 monsters
          let distance;
          
          if (monsterSize > 1) {
            // For 2x2 monsters, check distance from nearest edge
            let distanceX, distanceY;
            
            if (newX < monster.x) {
              // Hero is to the left of monster
              distanceX = monster.x - newX;
            } else if (newX > monsterEndX) {
              // Hero is to the right of monster
              distanceX = newX - monsterEndX;
            } else {
              // Hero is within monster's X range
              distanceX = 0;
            }
            
            if (newY < monster.y) {
              // Hero is above monster
              distanceY = monster.y - newY;
            } else if (newY > monsterEndY) {
              // Hero is below monster
              distanceY = newY - monsterEndY;
            } else {
              // Hero is within monster's Y range
              distanceY = 0;
            }
            
            // Use the maximum distance (correct for proximity calculation)
            distance = Math.max(distanceX, distanceY);
          } else {
            // For 1x1 monsters, use original logic (distance from center)
            distance = Math.max(
              Math.abs(monster.x - newX),
              Math.abs(monster.y - newY)
            );
          }
          
          return distance <= monster.proximity;
        });
        
        if (monstersInProximity.length > 0) {
          // Determine battle background based on terrain
          const currentTile = currentMap.tiles[newY][newX];
          let battleBackground = 'grass';
          if (currentTile === TILE_TYPES.STONE || currentTile === TILE_TYPES.STONE2 || currentTile === TILE_TYPES.DUNGEON_FLOOR) { // Added DUNGEON_FLOOR
            battleBackground = 'water';
          } else if (currentTile === TILE_TYPES.CASTLE) {
            battleBackground = 'water';
          }
          
          // Check if monster is fast - if so, monster attacks first
          const initialTurn = monstersInProximity[0].fast ? 'monster' : 'hero';
          const battleMessage = monstersInProximity[0].fast ? 
            `A ${monstersInProximity[0].type} blocks your path! It's fast and attacks first! (Ένα ${monstersInProximity[0].type} μπλοκάρει το μονοπάτι σας! Είναι γρήγορο και επιτίθεται πρώτο!)` : 
            `A ${monstersInProximity[0].type} blocks your path! (Ένα ${monstersInProximity[0].type} μπλοκάρει το μονοπάτι σας!)`;
          
          return {
            ...state,
            hero: {
              ...state.hero,
              x: newX,
              y: newY
            },
            battle: {
              ...state.battle,
              isActive: true,
              currentMonster: monstersInProximity[0],
              battleQueue: monstersInProximity.slice(1),
              battleBackground: battleBackground,
              battleMessage: battleMessage,
              turn: initialTurn,
              monsterAttacking: false,
              heroAttacking: false,
              attackQueue: []
            }
          };
        }
        
        // Check for potions at the new position
        const potionAtPosition = currentMap.items.find(potion => 
          potion.type === 'healingPotion' && potion.x === newX && potion.y === newY && !potion.isCollected
        );
        
        // Check for portable potions at the new position
        const portablePotionAtPosition = currentMap.items.find(potion => 
          potion.type === 'portablePotion' && potion.x === newX && potion.y === newY && !potion.isCollected
        );
        
        // Check for gold at adjacent position (within 1 tile)
        const goldAtPosition = currentMap.items.find(gold => {
          if (gold.type !== 'gold' || gold.isCollected) return false;
          
          // Check if hero is within 1 tile of the gold
          const distance = Math.max(
            Math.abs(gold.x - newX),
            Math.abs(gold.y - newY)
          );
          
          return distance <= 1;
        });
        
        let updatedHero = {
          ...state.hero,
          x: newX,
          y: newY
        };
        
        let updatedItems = currentMap.items;
        let healMessage = '';
        
        if (potionAtPosition) {
          // Collect the potion and heal the hero
          const newHp = Math.min(state.hero.maxHp, state.hero.hp + potionAtPosition.healAmount);
          const actualHeal = newHp - state.hero.hp;
          
          updatedHero = {
            ...updatedHero,
            hp: newHp,
            isPoisoned: false, // Clear poison when using healing potion
            poisonDamage: 0
          };
          
          // Safety check to ensure currentMap.items exists
          if (currentMap && currentMap.items) {
            updatedItems = currentMap.items.map(item =>
              item.id === potionAtPosition.id
                ? { ...item, isCollected: true }
                : item
            );
          } else {
            updatedItems = [];
          }
          
          healMessage = `You found a healing potion! +${actualHeal} HP (Βρήκατε ένα φίλτρο θεραπείας! +${actualHeal} HP)`;
        } else if (portablePotionAtPosition) {
          // Collect the portable potion
          updatedHero = {
            ...updatedHero,
            portableItems: [...state.hero.portableItems, {
              id: Date.now(),
              type: 'portablePotion',
              name: 'Portable Healing Potion',
              healAmount: 50
            }],
            isPoisoned: false, // Clear poison when using portable healing potion
            poisonDamage: 0
          };
          
          // Safety check to ensure currentMap.items exists
          if (currentMap && currentMap.items) {
            updatedItems = currentMap.items.map(item =>
              item.id === portablePotionAtPosition.id
                ? { ...item, isCollected: true } : item
            );
          } else {
            updatedItems = [];
          }
          
          healMessage = `You found a portable healing potion! (Βρήκατε ένα φορητό φίλτρο θεραπείας!)`;
        } else if (goldAtPosition) {
          // Collect the gold
          updatedHero = {
            ...updatedHero,
            gold: state.hero.gold + goldAtPosition.amount
          };
          
          // Safety check to ensure currentMap.items exists
          if (currentMap && currentMap.items) {
            updatedItems = currentMap.items.map(item =>
              item.id === goldAtPosition.id
                ? { ...item, isCollected: true }
                : item
            );
          } else {
            updatedItems = [];
          }
          
          healMessage = `You found ${goldAtPosition.amount} gold! (Βρήκατε ${goldAtPosition.amount} χρυσό!)`;
        }
        
        // Check for armor at the new position
        const armorAtPosition = currentMap.items.find(item => 
          item.type === 'armor' && item.x === newX && item.y === newY && !item.isCollected
        );
        
        // Check for equipment at the new position
        const equipmentAtPosition = currentMap.items.find(item => 
          item.type === 'equipment' && item.x === newX && item.y === newY && !item.isCollected &&
          currentMap.monsters.find(monster => monster.id === item.guardedBy)?.isDefeated
        );
        
        // Check for traps at the new position
        const trapAtPosition = currentMap.traps.find(trap => 
          trap.x === newX && trap.y === newY && !trap.isActivated
        );
        
        if (armorAtPosition) {
          // Collect and equip the armor
          console.log('Collecting armor:', armorAtPosition);
          updatedHero = {
            ...updatedHero,
            equipment: {
              ...updatedHero.equipment,
              armor: armorAtPosition
            }
          };
          console.log('Updated hero equipment:', updatedHero.equipment);
          
          // Safety check to ensure currentMap.items exists
          if (currentMap && currentMap.items) {
            updatedItems = currentMap.items.map(item =>
              item.id === armorAtPosition.id
                ? { ...item, isCollected: true }
                : item
            );
          } else {
            updatedItems = [];
          }
          
          healMessage = `You equipped the ${armorAtPosition.name}! Damage reduction: ${armorAtPosition.defense} (Εξοπλιστήκατε με το ${armorAtPosition.name}! Μείωση ζημιάς: ${armorAtPosition.defense})`;
        } else if (equipmentAtPosition) {
          // Collect and equip the equipment
          const equipmentConfig = EQUIPMENT_ITEMS[equipmentAtPosition.equipmentType];
          
          // RING: Special handling for rings
          if (equipmentConfig.type === EQUIPMENT_TYPES.ACCESSORY) {
            if (!updatedHero.equipment.ring) {
              // Give ring with 3 charges
              updatedHero = {
                ...updatedHero,
                equipment: { ...updatedHero.equipment, ring: 'ring' },
                ringCharges: 3
              };
              
              // Safety check to ensure currentMap.items exists
              if (currentMap && currentMap.items) {
                updatedItems = currentMap.items.map(item =>
                  item.id === equipmentAtPosition.id
                    ? { ...item, isCollected: true }
                    : item
                );
              } else {
                updatedItems = [];
              }
              
              healMessage = `You equipped the Ring of Knowledge! (3 charges)`;
            }
          } else {
            // Non-ring equipment
            updatedHero = {
              ...updatedHero,
              equipment: {
                ...updatedHero.equipment,
                [equipmentConfig.type === 'shield' ? 'shield' : equipmentConfig.type]: equipmentAtPosition.equipmentType
              }
            };
            
            // Safety check to ensure currentMap.items exists
            if (currentMap && currentMap.items) {
              updatedItems = currentMap.items.map(item =>
                item.id === equipmentAtPosition.id
                  ? { ...item, isCollected: true }
                  : item
              );
            } else {
              updatedItems = [];
            }
            
            healMessage = `You equipped the ${equipmentConfig.name}! (Εξοπλιστήκατε με το ${equipmentConfig.name}!)`;
          }
        }
        
        // Handle trap activation
        if (trapAtPosition) {
          // Handle trap activation directly in the reducer
          let trapMessage = '';
          let updatedTraps = currentMap.traps;
          
          if (trapAtPosition.trapType === TRAP_TYPES.DAMAGE) {
            // Damage trap
            const newHp = Math.max(0, updatedHero.hp - trapAtPosition.damage);
            updatedHero = {
              ...updatedHero,
              hp: newHp
            };
            trapMessage = `💥 You triggered a damage trap! Lost ${trapAtPosition.damage} HP! (💥 Ενεργοποιήσατε μια παγίδα ζημιάς! Χάσατε ${trapAtPosition.damage} HP!)`;
          } else if (trapAtPosition.trapType === TRAP_TYPES.TELEPORT) {
            // Teleport trap
            updatedHero = {
              ...updatedHero,
              x: trapAtPosition.targetX,
              y: trapAtPosition.targetY
            };
            trapMessage = `🌀 You triggered a teleport trap! Moved to (${trapAtPosition.targetX}, ${trapAtPosition.targetY})! (🌀 Ενεργοποιήσατε μια παγίδα τηλεμεταφοράς! Μετακινήθηκες στη θέση (${trapAtPosition.targetX}, ${trapAtPosition.targetY})!)`;
          }
          
          // Mark trap as activated
          if (currentMap && currentMap.traps) {
            updatedTraps = currentMap.traps.map(t =>
              t.id === trapAtPosition.id ? { ...t, isActivated: true } : t
            );
          } else {
            updatedTraps = [];
          }
          
          return {
            ...state,
            hero: updatedHero,
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                items: updatedItems,
                traps: updatedTraps
              }
            },
            battle: {
              ...state.battle,
              battleMessage: trapMessage || healMessage
            }
          };
        }
        
        // Handle poison damage during movement
        let poisonMessage = '';
        if (updatedHero.isPoisoned) {
          const poisonDamage = 10;
          const newHp = Math.max(0, updatedHero.hp - poisonDamage);
          updatedHero = {
            ...updatedHero,
            hp: newHp
          };
          poisonMessage = `☠️ You take ${poisonDamage} poison damage! (☠️ Παίρνετε ${poisonDamage} ζημιά από δηλητήριο!)`;
        }
        
        return {
          ...state,
          hero: updatedHero,
          maps: { // Update items for the current map
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: updatedItems
            }
          },
          battle: {
            ...state.battle,
            battleMessage: poisonMessage || healMessage
          }
        };
      }
      return state;
      
    case 'START_BATTLE':
      // Check if monster is fast - if so, monster attacks first
      const initialTurn = action.payload.monster.fast ? 'monster' : 'hero';
      const battleMessage = action.payload.monster.fast ? 
        `The ${action.payload.monster.type} is fast and attacks first! (Το ${action.payload.monster.type} είναι γρήγορο και επιτίθεται πρώτο!)` : 
        'Battle begins! (Η μάχη ξεκινάει!)';
      
      return {
        ...state,
        battle: {
          ...state.battle,
          isActive: true,
          currentMonster: action.payload.monster,
          turn: initialTurn,
          battleMessage: battleMessage,
          monsterAttacking: false,
          heroAttacking: false,
          attackQueue: []
        }
      };
      
    case 'END_BATTLE':
      return {
        ...state,
        battle: {
          ...state.battle,
          isActive: false,
          currentMonster: null,
          monsterAttacking: false,
          heroAttacking: false,
          attackQueue: []
        }
      };
      
    case 'DEFEAT_MONSTER':
      if (!currentMap) return state;
      
      const defeatedMonsterId = action.payload.monsterId;
      // Update monsters for the current map
      let updatedMonsters = [];
      if (currentMap && currentMap.monsters) {
        updatedMonsters = currentMap.monsters.map(monster =>
          monster.id === defeatedMonsterId
            ? { ...monster, isDefeated: true }
            : monster
        );
      }

      const allMonstersDefeatedOnCurrentMap = updatedMonsters.every(monster => monster.isDefeated);
      let updatedStateAfterDefeat = {
        ...state,
        maps: {
          ...state.maps,
          [state.currentMapId]: {
            ...currentMap,
            monsters: updatedMonsters
          }
        },
        battle: {
          ...state.battle,
          turn: 'victory',
          battleMessage: `You defeated the ${state.battle.currentMonster.type}! (Νικήσατε το ${state.battle.currentMonster.type}!)`
        }
      };

      if (state.currentMapId === 'main' && allMonstersDefeatedOnCurrentMap) {
        // Apply permanent HP bonus only if all monsters on the main map are defeated
        const newPermanentHpBonus = state.hero.permanentHpBonus + 1;
        const newMaxHp = 100 + newPermanentHpBonus;
        const newHp = Math.min(state.hero.hp + 1, newMaxHp); // Heal 1 HP and increase max HP

        savePermanentHpBonus(newPermanentHpBonus);

        updatedStateAfterDefeat = {
          ...updatedStateAfterDefeat,
          hero: {
            ...updatedStateAfterDefeat.hero,
            hp: newHp,
            maxHp: newMaxHp,
            permanentHpBonus: newPermanentHpBonus
          },
          battle: {
            ...updatedStateAfterDefeat.battle,
            battleMessage: `🎉 GAME COMPLETED! You defeated all monsters! +1 permanent HP bonus! (🎉 ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΠΑΙΧΝΙΔΙ! Νικήσατε όλα τα τέρατα! +1 μόνιμο μπόνους HP!)`,
            showVictoryPopup: true
          }
        };
      } else if (state.currentMapId === 'dungeon' && allMonstersDefeatedOnCurrentMap) {
        // Apply permanent HP bonus when all dungeon monsters are defeated
        const newPermanentHpBonus = state.hero.permanentHpBonus + 1;
        const newMaxHp = 100 + newPermanentHpBonus;
        const newHp = Math.min(state.hero.hp + 1, newMaxHp); // Heal 1 HP and increase max HP

        savePermanentHpBonus(newPermanentHpBonus);

        updatedStateAfterDefeat = {
          ...updatedStateAfterDefeat,
          hero: {
            ...updatedStateAfterDefeat.hero,
            hp: newHp,
            maxHp: newMaxHp,
            permanentHpBonus: newPermanentHpBonus
          },
          battle: {
            ...updatedStateAfterDefeat.battle,
            battleMessage: `🎉 DUNGEON COMPLETED! You defeated all dungeon monsters! +1 permanent HP bonus! (🎉 ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΜΠΟΥΤΡΟΥΜΙ! Νικήσατε όλα τα τέρατα του μπουντρουμιού! +1 μόνιμο μπόνους HP!)`,
            showVictoryPopup: true
          }
        };
      } else if (state.currentMapId === 'volcano' && allMonstersDefeatedOnCurrentMap) {
        // Apply permanent HP bonus when all volcano monsters are defeated
        const newPermanentHpBonus = state.hero.permanentHpBonus + 1;
        const newMaxHp = 100 + newPermanentHpBonus;
        const newHp = Math.min(state.hero.hp + 1, newMaxHp); // Heal 1 HP and increase max HP

        savePermanentHpBonus(newPermanentHpBonus);

        updatedStateAfterDefeat = {
          ...updatedStateAfterDefeat,
          hero: {
            ...updatedStateAfterDefeat.hero,
            hp: newHp,
            maxHp: newMaxHp,
            permanentHpBonus: newPermanentHpBonus
          },
          battle: {
            ...updatedStateAfterDefeat.battle,
            battleMessage: `🎉 VOLCANO COMPLETED! You defeated all volcano monsters! +1 permanent HP bonus! (🎉 ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΗΦΑΙΣΤΕΙΟ! Νικήσατε όλα τα τέρατα του ηφαιστείου! +1 μόνιμο μπόνους HP!)`,
            showVictoryPopup: true
          }
        };
      } else if (state.currentMapId === 'forest' && allMonstersDefeatedOnCurrentMap) {
        // Apply permanent HP bonus when all forest monsters are defeated
        const newPermanentHpBonus = state.hero.permanentHpBonus + 1;
        const newMaxHp = 100 + newPermanentHpBonus;
        const newHp = Math.min(state.hero.hp + 1, newMaxHp); // Heal 1 HP and increase max HP

        savePermanentHpBonus(newPermanentHpBonus);

        updatedStateAfterDefeat = {
          ...updatedStateAfterDefeat,
          hero: {
            ...updatedStateAfterDefeat.hero,
            hp: newHp,
            maxHp: newMaxHp,
            permanentHpBonus: newPermanentHpBonus
          },
          battle: {
            ...updatedStateAfterDefeat.battle,
            battleMessage: `🎉 FOREST COMPLETED! You defeated all forest monsters! +1 permanent HP bonus! (🎉 ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΔΑΣΟΣ! Νικήσατε όλα τα τέρατα του δάσους! +1 μόνιμο μπόνους HP!)`,
            showVictoryPopup: true
          }
        };
      } else if (state.currentMapId === 'dungeonLevel2' && allMonstersDefeatedOnCurrentMap) {
        // Apply permanent HP bonus when all dungeon level 2 monsters are defeated
        const newPermanentHpBonus = state.hero.permanentHpBonus + 1;
        const newMaxHp = 100 + newPermanentHpBonus;
        const newHp = Math.min(state.hero.hp + 1, newMaxHp); // Heal 1 HP and increase max HP

        savePermanentHpBonus(newPermanentHpBonus);

        updatedStateAfterDefeat = {
          ...updatedStateAfterDefeat,
          hero: {
            ...updatedStateAfterDefeat.hero,
            hp: newHp,
            maxHp: newMaxHp,
            permanentHpBonus: newPermanentHpBonus
          },
          battle: {
            ...updatedStateAfterDefeat.battle,
            battleMessage: `🎉 DUNGEON LEVEL 2 COMPLETED! You defeated all dungeon level 2 monsters! +1 permanent HP bonus! (🎉 ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΜΠΟΥΝΤΡΟΥΜΙ ΕΠΙΠΕΔΟ 2! Νικήσατε όλα τα τέρατα του μπουντρουμιού επιπέδου 2! +1 μόνιμο μπόνους HP!)`,
            showVictoryPopup: true
          }
        };
      }
      return updatedStateAfterDefeat;
      
    case 'BASIC_ATTACK':
      // Check if hero is frozen - if so, skip their turn
      if (state.battle.heroFrozen) {
        return {
          ...state,
          battle: {
            ...state.battle,
            heroFrozen: false, // Clear frozen state
            battleMessage: `You are frozen and miss your turn!`,
            turn: 'monster',
            heroAttacking: false,
            monsterAttacking: false
          }
        };
      }
      
      // Calculate damage with equipment bonus
      let baseDamage = Math.floor(Math.random() * 6) + 10; // 10-15 damage
      const weaponEquipped = state.hero.equipment.weapon;
      let criticalStrike = false;
      let fireEffect = false;
      let freezeEffect = false;
      
      if (weaponEquipped && EQUIPMENT_ITEMS[weaponEquipped]) {
        const weaponBonus = Math.floor(Math.random() * EQUIPMENT_ITEMS[weaponEquipped].damageBonus) + 1;
        baseDamage += weaponBonus;
        
        // Check for critical strike (axe only)
        if (weaponEquipped === 'axe' && EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
          if (Math.random() < EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
            baseDamage *= 2;
            criticalStrike = true;
          }
        }
        
        // Check for fire effect (flaming sword only)
        if (weaponEquipped === 'flamingSword' && EQUIPMENT_ITEMS[weaponEquipped].fireEffect) {
          fireEffect = true;
        }
        
        // Check for freeze effect (spear only) per attack chance
        if (weaponEquipped === 'spear' && EQUIPMENT_ITEMS[weaponEquipped].freezeChance) {
          if (Math.random() < EQUIPMENT_ITEMS[weaponEquipped].freezeChance) {
            freezeEffect = true;
          }
        }
      }
      
      // Witch magic shield: blocks every 2nd incoming attack
      if (state.battle.currentMonster.type === 'witch' && state.battle.currentMonster.hasMagicShieldEverySecond) {
        const nextShieldCount = (state.battle.currentMonster.magicShieldCounter || 0) + 1;
        const willBlock = nextShieldCount % 2 === 0;
        if (willBlock) {
          const shieldedMonster = {
            ...state.battle.currentMonster,
            magicShieldCounter: nextShieldCount
          };
          return {
            ...state,
            battle: {
              ...state.battle,
              currentMonster: shieldedMonster,
              battleMessage: `Your attack is blocked by the Witch's magic shield! (Η επίθεσή σας αποκλείεται από την μαγική ασπίδα της Μάγισσας!)`,
              turn: 'monster',
              heroAttacking: true,
              monsterAttacking: false
            }
          };
        }
      }

      // Special handling for hydra
      let updatedMonster = {
        ...state.battle.currentMonster,
        hp: Math.max(0, state.battle.currentMonster.hp - baseDamage),
        onFire: fireEffect ? true : state.battle.currentMonster.onFire || false,
        frozen: freezeEffect ? true : false
      };

      // Increment witch shield counter on non-blocked attacks
      if (updatedMonster.type === 'witch' && updatedMonster.hasMagicShieldEverySecond) {
        updatedMonster = { ...updatedMonster, magicShieldCounter: (updatedMonster.magicShieldCounter || 0) + 1 };
      }
      
      // Hydra head mechanics
      if (updatedMonster.type === 'hydra' && updatedMonster.isBoss) {
        const weaponEquipped = state.hero.equipment.weapon;
        const hasFlamingSword = weaponEquipped === 'flamingSword';
        
        // Calculate head damage (each head has 15 HP)
        const headDamage = Math.min(baseDamage, updatedMonster.headHp);
        const headsLost = Math.floor(baseDamage / updatedMonster.headHp);
        
        if (headsLost > 0) {
          if (hasFlamingSword) {
            // With flaming sword: heads are permanently lost
            updatedMonster.heads = Math.max(0, updatedMonster.heads - headsLost);
            // Damage will be calculated dynamically in MONSTER_ATTACK
          } else {
            // Without flaming sword: for each head lost, grow 2 new ones
            updatedMonster.heads = updatedMonster.heads + headsLost; // -1 + 2 = +1 per head lost
            // Damage will be calculated dynamically in MONSTER_ATTACK
          }
        }
      }
      
      // Witch auto-heal when at or below 50 HP (up to 2 potions)
      let extraMessage = '';
      if (updatedMonster.type === 'witch' && (updatedMonster.portablePotions || 0) > 0 && updatedMonster.hp > 0 && updatedMonster.hp <= 50) {
        const healAmount = 50;
        const newHp = Math.min(updatedMonster.maxHp, updatedMonster.hp + healAmount);
        updatedMonster = { ...updatedMonster, hp: newHp, portablePotions: (updatedMonster.portablePotions || 0) - 1 };
        extraMessage = ` The witch uses a healing potion and restores +${newHp - (updatedMonster.hp - healAmount)} HP! (Η μάγισσα χρησιμοποιεί φίλτρο θεραπείας και ανακτά ζωή!)`;
      }

      if (updatedMonster.hp <= 0) {
        return {
          ...state,
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              monsters: currentMap && currentMap.monsters ? 
                currentMap.monsters.map(m => 
                  m.id === updatedMonster.id ? { ...m, isDefeated: true } : m
                ) : []
            }
          },
          battle: {
            ...state.battle,
            currentMonster: updatedMonster,
            battleMessage: `You defeated the ${updatedMonster.type}! (Νικήσατε το ${updatedMonster.type}!)`,
            turn: 'victory',
            monsterAttacking: false,
            heroAttacking: false
          }
        };
      }
      
      return {
        ...state,
                  battle: {
            ...state.battle,
            currentMonster: updatedMonster,
            monsterFrozen: freezeEffect, // Set monster frozen state
                      battleMessage: (() => {
            let message = criticalStrike ? 
              `CRITICAL STRIKE! You hit for ${baseDamage} damage! (ΚΡΙΤΙΚΗ ΚΡΟΥΣΗ! Χτυπήσατε για ${baseDamage} ζημιά!)` :
              weaponEquipped ? 
              `You hit for ${baseDamage} damage! (weapon bonus included) (Χτυπήσατε για ${baseDamage} ζημιά! (συμπεριλαμβανομένου του μπόνους όπλου))` : 
              `You hit for ${baseDamage} damage! (Χτυπήσατε για ${baseDamage} ζημιά!)`;
            
            // Add freeze effect message
            if (freezeEffect) {
              message += ` The ${updatedMonster.type} is frozen and will miss its next turn!`;
            }
            
            // Add hydra head information
            if (updatedMonster.type === 'hydra' && updatedMonster.isBoss) {
              message += ` Hydra has ${updatedMonster.heads} heads remaining!`;
            }
            // Add witch potion info if any
            if (extraMessage) {
              message += extraMessage;
            }
            return message;
          })(),
          turn: 'monster',
          heroAttacking: true,
          monsterAttacking: false
        }
      };
      
    case 'START_RIDDLE_ATTACK':
      // Check if hero is frozen - if so, skip their turn
      if (state.battle.heroFrozen) {
        return {
          ...state,
          battle: {
            ...state.battle,
            heroFrozen: false, // Clear frozen state
            battleMessage: `You are frozen and miss your turn!`,
            turn: 'monster',
            heroAttacking: false,
            monsterAttacking: false
          }
        };
      }
      
      return {
        ...state,
        battle: {
          ...state.battle,
          currentRiddle: generateRandomRiddleForMap(state.currentMapId),
          awaitingRiddleAnswer: true,
                      battleMessage: 'Solve the riddle to unleash a powerful attack! (Λύστε τον γρίφο για να εκτοξεύσετε μια ισχυρή επίθεση!)'
        }
      };
      
    case 'ANSWER_RIDDLE':
      const isCorrect = action.payload.answer === state.battle.currentRiddle.answer;
      
      if (isCorrect) {
        let strongDamage = Math.floor(Math.random() * 11) + 25; // 25-35 damage
        // Apply weapon bonus to riddle attacks too
        const weaponEquipped = state.hero.equipment.weapon;
        let criticalStrike = false;
        let fireEffect = false;
        
        if (weaponEquipped && EQUIPMENT_ITEMS[weaponEquipped]) {
          const weaponBonus = Math.floor(Math.random() * EQUIPMENT_ITEMS[weaponEquipped].damageBonus) + 1;
          strongDamage += weaponBonus;
          
          // Check for critical strike (axe only)
          if (weaponEquipped === 'axe' && EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
            if (Math.random() < EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
              strongDamage *= 2;
            }
          }
          
          // Check for fire effect (flaming sword only)
          if (weaponEquipped === 'flamingSword' && EQUIPMENT_ITEMS[weaponEquipped].fireEffect) {
            fireEffect = true;
          }
        }
        
        // Special handling for hydra
        let strongUpdatedMonster = {
          ...state.battle.currentMonster,
          hp: Math.max(0, state.battle.currentMonster.hp - strongDamage),
          onFire: fireEffect ? true : state.battle.currentMonster.onFire || false
        };
        
        // Hydra head mechanics
        if (strongUpdatedMonster.type === 'hydra' && strongUpdatedMonster.isBoss) {
          const hasFlamingSword = weaponEquipped === 'flamingSword';
          
          // Calculate head damage (each head has 15 HP)
          const headDamage = Math.min(strongDamage, strongUpdatedMonster.headHp);
          const headsLost = Math.floor(strongDamage / strongUpdatedMonster.headHp);
          
          if (headsLost > 0) {
            if (hasFlamingSword) {
              // With flaming sword: heads are permanently lost
              strongUpdatedMonster.heads = Math.max(0, strongUpdatedMonster.heads - headsLost);
              // Damage will be calculated dynamically in MONSTER_ATTACK
            } else {
              // Without flaming sword: for each head lost, grow 2 new ones
              strongUpdatedMonster.heads = strongUpdatedMonster.heads + headsLost; // -1 + 2 = +1 per head lost
              // Damage will be calculated dynamically in MONSTER_ATTACK
            }
          }
        }
        
        if (strongUpdatedMonster.hp <= 0) {
          return {
            ...state,
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                monsters: currentMap && currentMap.monsters ? 
                  currentMap.monsters.map(m => 
                    m.id === strongUpdatedMonster.id ? { ...m, isDefeated: true } : m
                  ) : []
              }
            },
            battle: {
              ...state.battle,
              currentMonster: strongUpdatedMonster,
              currentRiddle: null,
              awaitingRiddleAnswer: false,
              battleMessage: `Excellent! You defeated the ${strongUpdatedMonster.type} with a devastating attack! (Εξαιρετικά! Νικήσατε το ${strongUpdatedMonster.type} με μια καταστροφική επίθεση!)`,
              turn: 'victory',
              monsterAttacking: false,
              heroAttacking: false
            }
          };
        }
        
        return {
          ...state,
          battle: {
            ...state.battle,
            currentMonster: strongUpdatedMonster,
            currentRiddle: null,
            awaitingRiddleAnswer: false,
            battleMessage: (() => {
              let message = weaponEquipped ? 
                `Correct! You hit for ${strongDamage} damage! (weapon bonus included) (Σωστά! Χτυπήσατε για ${strongDamage} ζημιά! (συμπεριλαμβανομένου του μπόνους όπλου))` :
                `Correct! You hit for ${strongDamage} damage! (Σωστά! Χτυπήσατε για ${strongDamage} ζημιά!)`;
              
              // Add hydra head information
              if (strongUpdatedMonster.type === 'hydra' && strongUpdatedMonster.isBoss) {
                message += ` Hydra has ${strongUpdatedMonster.heads} heads remaining!`;
              }
              
              return message;
            })(),
            turn: 'monster',
            heroAttacking: true,
            monsterAttacking: false
          }
        };
      } else {
        // Wrong answer - monster gets double attack (penalty attack + regular turn)
        const monsterDamage = state.battle.currentMonster.attackDamage;
        const heroAfterDamage = {
          ...state.hero,
          hp: Math.max(0, state.hero.hp - monsterDamage)
        };
        
        if (heroAfterDamage.hp <= 0) {
          return {
            ...state,
            hero: heroAfterDamage,
            battle: {
              ...state.battle,
              currentRiddle: null,
              awaitingRiddleAnswer: false,
              battleMessage: `Wrong answer! The ${state.battle.currentMonster.type} defeated you! (Λάθος απάντηση! Το ${state.battle.currentMonster.type} σας νίκησε!)`,
              turn: 'defeat',
              monsterAttacking: true,
              heroAttacking: false
            }
          };
        }
        
        // Queue up the second attack for the regular turn
        return {
          ...state,
          hero: heroAfterDamage,
          battle: {
            ...state.battle,
            currentRiddle: null,
            awaitingRiddleAnswer: false,
            battleMessage: `Wrong answer! The ${state.battle.currentMonster.type} attacks you for ${monsterDamage} damage! (Penalty attack) (Λάθος απάντηση! Το ${state.battle.currentMonster.type} σας επιτίθεται για ${monsterDamage} ζημιά! (Ποινική επίθεση))`,
            turn: 'monster',
            monsterAttacking: true,
            heroAttacking: false,
            attackQueue: ['monster'] // Queue second attack
          }
        };
      }
      
    case 'MONSTER_ATTACK':
      // Check if monster is frozen - if so, decrement turns and skip
      if (state.battle.monsterFrozen) {
        const remaining = Math.max(0, (state.battle.monsterFrozenTurns || 0) - 1);
        return {
          ...state,
          battle: {
            ...state.battle,
            monsterFrozen: remaining > 0,
            monsterFrozenTurns: remaining,
            battleMessage: `The ${state.battle.currentMonster.type} is frozen and misses its turn! (${remaining} turns left)`,
            turn: 'hero',
            monsterAttacking: false,
            heroAttacking: false
          }
        };
      }
      
      let monsterAttackDamage = state.battle.currentMonster.attackDamage;
      let currentMonsterForAttack = state.battle.currentMonster;
      
      // Apply fire damage to monster if it's on fire
      let fireDamageMessage = '';
      if (state.battle.currentMonster.onFire) {
        const fireDamage = 2;
        currentMonsterForAttack = {
          ...state.battle.currentMonster,
          hp: Math.max(0, state.battle.currentMonster.hp - fireDamage)
        };
        fireDamageMessage = `🔥 The ${state.battle.currentMonster.type} takes ${fireDamage} fire damage! `;
        
        // If monster dies from fire damage
        if (currentMonsterForAttack.hp <= 0) {
          return {
            ...state,
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                monsters: currentMap && currentMap.monsters ? 
                  currentMap.monsters.map(m => 
                    m.id === currentMonsterForAttack.id ? { ...m, isDefeated: true } : m
                  ) : []
              }
            },
            battle: {
              ...state.battle,
              currentMonster: currentMonsterForAttack,
              battleMessage: `${fireDamageMessage}The ${currentMonsterForAttack.type} was defeated by fire!`,
              turn: 'victory',
              monsterAttacking: false,
              heroAttacking: false
            }
          };
        }
      }
      
      // Special hydra damage calculation - Always calculate based on current heads
      if (currentMonsterForAttack.type === 'hydra' && currentMonsterForAttack.isBoss) {
        // Each head hits independently with 3-5 damage
        const heads = currentMonsterForAttack.heads;
        let totalDamage = 0;
        
        for (let i = 0; i < heads; i++) {
          totalDamage += Math.floor(Math.random() * 3) + 3; // 3-5 damage per head
        }
        
        // Minimum damage of 25 regardless of head count
        monsterAttackDamage = Math.max(25, totalDamage);
      } else if (currentMonsterForAttack.type === 'dragon' && currentMonsterForAttack.isBoss && currentMonsterForAttack.size === 2) {
        // Big dragon random damage between 40-45 + 5 fire damage
        monsterAttackDamage = Math.floor(Math.random() * 6) + 40; // 40-45 damage
        // Add 5 fire damage (will be handled separately)
      } else if (currentMonsterForAttack.type === 'snake' && currentMonsterForAttack.isBoss && currentMonsterForAttack.size === 2) {
        // Large snake random damage between 25-35
        monsterAttackDamage = Math.floor(Math.random() * 11) + 25; // 25-35 damage
      } else {
              // For non-hydra monsters, use their regular attack damage
      monsterAttackDamage = currentMonsterForAttack.attackDamage;
      
      // Pirate captain uses spear weapon (+7 damage and freeze chance)
      if (currentMonsterForAttack.type === 'pirate_captain' && currentMonsterForAttack.hasSpear) {
        monsterAttackDamage += 7;
      }
      // Witch maintains random range 25-40 per attack
      if (currentMonsterForAttack.type === 'witch') {
        monsterAttackDamage = Math.floor(Math.random() * 16) + 25;
      }
      }
      
      // Monster double damage chance (use monster's specific chance if available)
      let doubleDamageMessage = '';
      if (currentMonsterForAttack.doubleDamageChance) {
        if (Math.random() < currentMonsterForAttack.doubleDamageChance) {
          monsterAttackDamage *= 2;
          doubleDamageMessage = `💥 Double damage! (Διπλή ζημιά!) `;
        }
      } else if (currentMonsterForAttack.type === 'troll') {
        // Legacy support for regular trolls (25% chance)
        const doubleDamageChance = 0.25; // 25% chance
        if (Math.random() < doubleDamageChance) {
          monsterAttackDamage *= 2;
          doubleDamageMessage = `💥 Double damage! (Διπλή ζημιά!) `;
        }
      }
      
      // Check for armor damage reduction and shield block
      const armorEquipped = state.hero.equipment.armor;
      const shieldEquipped = state.hero.equipment.shield;
      let damageReduction = 0;
      let blocked = false;
      
      // Check armor for damage reduction
      if (armorEquipped && EQUIPMENT_ITEMS[armorEquipped] && EQUIPMENT_ITEMS[armorEquipped].defense) {
        // Special case: hydra takes extra damage reduction
        if (currentMonsterForAttack.type === 'hydra' && currentMonsterForAttack.isBoss) {
          damageReduction = 3; // 3 damage reduction vs hydra
        } else {
          damageReduction = EQUIPMENT_ITEMS[armorEquipped].defense; // Normal damage reduction vs other monsters
        }
      }
      
      // Check shield for block chance
      if (shieldEquipped && EQUIPMENT_ITEMS[shieldEquipped] && EQUIPMENT_ITEMS[shieldEquipped].blockChance) {
        let blockChance = EQUIPMENT_ITEMS[shieldEquipped].blockChance;
        
        // Magic shield increases block chance when HP is low
        if (shieldEquipped === 'magicShield' && state.hero.hp < 40) {
          blockChance = 0.40; // 40% when HP < 40
        }
        
        blocked = Math.random() < blockChance;
      }
      
      if (blocked) {
        monsterAttackDamage = 0;
      } else {
        monsterAttackDamage = Math.max(0, monsterAttackDamage - damageReduction);
      }
      
      // Handle fire damage from big dragon
      let fireDamage = 0;
      let dragonFireMessage = '';
      if (currentMonsterForAttack.type === 'dragon' && currentMonsterForAttack.isBoss && currentMonsterForAttack.size === 2) {
        // Check if hero has red armor (fire immune)
        const hasRedArmor = armorEquipped && EQUIPMENT_ITEMS[armorEquipped] && EQUIPMENT_ITEMS[armorEquipped].fireImmune;
        if (!hasRedArmor) {
          fireDamage = 5;
          dragonFireMessage = `🔥 +5 fire damage! `;
        } else {
          dragonFireMessage = `🔥 Fire damage blocked by Red Armor! `;
        }
      }
      
      const totalDamage = monsterAttackDamage + fireDamage;
      
      // Handle poison application from large spider
      let poisonMessage = '';
      let heroAfterAttack = {
        ...state.hero,
        hp: Math.max(0, state.hero.hp - totalDamage)
      };
      
      // Apply poison damage if hero is already poisoned
      if (state.hero.isPoisoned && !blocked) {
        const poisonDamage = 10;
        heroAfterAttack = {
          ...heroAfterAttack,
          hp: Math.max(0, heroAfterAttack.hp - poisonDamage)
        };
        poisonMessage = `☠️ Poison damage: ${poisonDamage}! (☠️ Ζημιά από δηλητήριο: ${poisonDamage}!) `;
      }
      
      // Apply new poison from large spider attack
      if (currentMonsterForAttack.hasPoison && !blocked) {
        heroAfterAttack = {
          ...heroAfterAttack,
          isPoisoned: true
        };
        poisonMessage += `☠️ You are poisoned! (☠️ Είστε δηλητηριασμένοι!) `;
      }
      
      // Apply freeze effect from pirate captain's spear
      let freezeMessage = '';
      if (currentMonsterForAttack.type === 'pirate_captain' && currentMonsterForAttack.hasSpear && !blocked) {
        if (Math.random() < 0.20) { // 20% chance to freeze per attack
          heroAfterAttack = {
            ...heroAfterAttack,
            isFrozen: true
          };
          freezeMessage = `❄️ You are frozen and will miss your next turn! (❄️ Είστε παγωμένοι και θα χάσετε την επόμενη σας σειρά!) `;
        }
      }
      
      if (heroAfterAttack.hp <= 0 && !blocked) {
        return {
          ...state,
          hero: heroAfterAttack,
          battle: {
            ...state.battle,
            currentMonster: currentMonsterForAttack,
            battleMessage: `The ${currentMonsterForAttack.type} defeated you! (Το ${currentMonsterForAttack.type} σας νίκησε!)`,
            turn: 'defeat',
            monsterAttacking: true,
            heroAttacking: false
          }
        };
      }
      
      // Check if there's a queued attack
      const hasQueuedAttack = state.battle.attackQueue && state.battle.attackQueue.length > 0;
      

      const damageMessage = blocked ? 
        `${fireDamageMessage}${dragonFireMessage}The ${currentMonsterForAttack.type} attacks but you block it with your shield! (Το ${currentMonsterForAttack.type} επιτίθεται αλλά το αποκλείετε με την ασπίδα σας!)` :
        (() => {
          if (currentMonsterForAttack.type === 'hydra' && currentMonsterForAttack.isBoss) {
            return `${fireDamageMessage}${dragonFireMessage}${poisonMessage}${doubleDamageMessage}The Hydra's ${currentMonsterForAttack.heads} heads attack you for ${monsterAttackDamage} damage! (Τα ${currentMonsterForAttack.heads} κεφάλια της Ύδρας σας επιτίθενται για ${monsterAttackDamage} ζημιά!)`;
          } else {
            return `${fireDamageMessage}${dragonFireMessage}${poisonMessage}${doubleDamageMessage}The ${currentMonsterForAttack.type} attacks you for ${totalDamage} damage! (Το ${currentMonsterForAttack.type} σας επιτίθεται για ${totalDamage} ζημιά!)`;
          }
        })();
      
      // If this was the last attack in the queue, return control to hero
      const remainingQueue = hasQueuedAttack ? state.battle.attackQueue.slice(1) : [];
      const isLastAttack = hasQueuedAttack && remainingQueue.length === 0;
      

      
      return {
        ...state,
        hero: heroAfterAttack,
        battle: {
          ...state.battle,
          currentMonster: currentMonsterForAttack,
          heroFrozen: heroAfterAttack.isFrozen || false, // Set hero frozen state
          battleMessage: `${damageMessage}${freezeMessage}${hasQueuedAttack && !isLastAttack ? ' (Penalty attack) (Ποινική επίθεση)' : ''}`,
          turn: hasQueuedAttack && !isLastAttack ? 'monster' : 'hero',
          monsterAttacking: true,
          heroAttacking: false,
          attackQueue: remainingQueue
        }
      };
      
    case 'CLEAR_ATTACK_ANIMATIONS':
      return {
        ...state,
        battle: {
          ...state.battle,
          heroAttacking: false,
          monsterAttacking: false
        }
      };
      
    case 'CLEAR_BATTLE_MESSAGE':
      return {
        ...state,
        battle: {
          ...state.battle,
          battleMessage: ''
        }
      };
      
    case 'NEXT_BATTLE':
      if (state.battle.battleQueue.length > 0) {
        const nextMonster = state.battle.battleQueue[0];
        // Check if next monster is fast - if so, monster attacks first
        const nextTurn = nextMonster.fast ? 'monster' : 'hero';
        const nextBattleMessage = nextMonster.fast ? 
          `Another ${nextMonster.type} appears! It's fast and attacks first! (Ένα άλλο ${nextMonster.type} εμφανίζεται! Είναι γρήγορο και επιτίθεται πρώτο!)` : 
          `Another ${nextMonster.type} appears! (Ένα άλλο ${nextMonster.type} εμφανίζεται!)`;
        
        return {
          ...state,
          battle: {
            ...state.battle,
            currentMonster: nextMonster,
            battleQueue: state.battle.battleQueue.slice(1),
            battleMessage: nextBattleMessage,
            turn: nextTurn,
            monsterAttacking: false,
            heroAttacking: false,
            attackQueue: []
          }
        };
      } else {
        return {
          ...state,
          battle: {
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            awaitingRiddleAnswer: false,
            battleMessage: '',
            turn: 'hero',
            monsterAttacking: false,
            heroAttacking: false,
            attackQueue: []
          }
        };
      }
      
    case 'COLLECT_ARMOR': {
      const { armorId } = action.payload;
      const currentMap = state.maps[state.currentMapId]; // Corrected from state.currentMap.id
      const armorToCollect = currentMap.items.find(item => item.id === armorId);

      if (armorToCollect && armorToCollect.type === 'armor' && !armorToCollect.isCollected) {
        // Proximity check: Hero must be adjacent to the armor
        const distanceX = Math.abs(state.hero.x - armorToCollect.x);
        const distanceY = Math.abs(state.hero.y - armorToCollect.y);
        const isAdjacent = distanceX <= 1 && distanceY <= 1;

        if (!isAdjacent) {
          return {
            ...state,
            battle: {
              ...state.battle,
              battleMessage: `You are too far from the ${armorToCollect.name} to collect it.`
            }
          };
        }

        // Check if armor is guarded by monsters
        if (armorToCollect.guardedByMonsters && armorToCollect.guardedByMonsters.length > 0) {
          const guardingMonsters = currentMap.monsters.filter(monster => 
            armorToCollect.guardedByMonsters.includes(monster.id)
          );

          const allGuardingMonstersDefeated = guardingMonsters.every(monster => monster.isDefeated);

          if (!allGuardingMonstersDefeated) {
            // If not all guarding monsters are defeated, display a message and do not collect
            return {
              ...state,
              battle: {
                ...state.battle,
                battleMessage: `The ${armorToCollect.name} is guarded by powerful monsters! Defeat them first.`
              }
            };
          }
        }

        // If not guarded or all guarding monsters defeated, proceed with collection
        const updatedItems = currentMap && currentMap.items ? 
          currentMap.items.map(item =>
            item.id === armorId ? { ...item, isCollected: true } : item
          ) : [];
        
        // Map armor name to equipment key
        const getArmorKey = (armorName) => {
          if (armorName === 'Red Armor') return 'redArmor';
          if (armorName === 'Dungeon Armor') return 'dungeonArmor';
          return 'armor'; // fallback
        };
        
        const armorKey = getArmorKey(armorToCollect.name);
        const currentArmorEquipped = state.hero.equipment.armor;
        
        // Check if hero already has armor equipped
        if (currentArmorEquipped) {
          // Move current armor to bag and equip new armor
          return {
            ...state,
            hero: {
              ...state.hero,
              equipment: {
                ...state.hero.equipment,
                armor: armorKey
              },
              bag: {
                ...state.hero.bag,
                armor: [...(state.hero.bag.armor || []), currentArmorEquipped]
              }
            },
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                items: updatedItems
              }
            },
            battle: {
              ...state.battle,
              battleMessage: `You equipped the ${armorToCollect.name}! Previous armor moved to bag. Damage reduction: ${armorToCollect.defense}${armorToCollect.fireImmune ? ', Fire Immune' : ''}`
            }
          };
        } else {
          // No armor equipped, just equip the new armor
          return {
            ...state,
            hero: {
              ...state.hero,
              equipment: {
                ...state.hero.equipment,
                armor: armorKey
              }
            },
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                items: updatedItems
              }
            },
            battle: {
              ...state.battle,
              battleMessage: `You equipped the ${armorToCollect.name}! Damage reduction: ${armorToCollect.defense}${armorToCollect.fireImmune ? ', Fire Immune' : ''}`
            }
          };
        }
      }
      return state;
    }
      
    case 'COLLECT_PORTABLE_ITEM':
      if (!currentMap) return state;
      
      // Find portable item (portablePotion or freezingBomb) in map items
      const portableItemToCollect = currentMap.items && currentMap.items.find(item => 
        item.id === action.payload.itemId && (item.type === 'portablePotion' || item.type === 'freezingBomb')
      );
      
      if (portableItemToCollect && !portableItemToCollect.isCollected) {
        // If guarded, ensure guardian defeated
        if (portableItemToCollect.guardedBy !== null && portableItemToCollect.guardedBy !== undefined) {
          let guardianDefeated = true;
          if (Array.isArray(portableItemToCollect.guardedBy)) {
            guardianDefeated = portableItemToCollect.guardedBy.every(guardianId => {
              const monster = currentMap.monsters.find(m => m.id === guardianId);
              return monster?.isDefeated;
            });
          } else {
            const monster = currentMap.monsters.find(m => m.id === portableItemToCollect.guardedBy);
            guardianDefeated = monster?.isDefeated;
          }
          if (!guardianDefeated) {
            return state;
          }
        }
        console.log('Collecting portable item via click:', portableItemToCollect);
        
        return {
          ...state,
          hero: {
            ...state.hero,
            portableItems: [...state.hero.portableItems, portableItemToCollect]
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap && currentMap.items ? 
                currentMap.items.map(item =>
                  item.id === portableItemToCollect.id
                    ? { ...item, isCollected: true } : item
                ) : []
            }
          },
          battle: {
            ...state.battle,
            battleMessage: portableItemToCollect.type === 'freezingBomb' ?
              `Συλλέξατε την ${portableItemToCollect.name}! (❄️ Παγώνει εχθρούς για ${portableItemToCollect.freezeTurns} γύρους)` :
              `You collected the ${portableItemToCollect.name}! (+${portableItemToCollect.healAmount} HP)`
          }
        };
      }
      return state;
      
    case 'SHOP_INTERACTION':
      console.log('SHOP_INTERACTION action received', action.payload);
      
      // Check if current map has a shop configuration (for Crossroads, etc.)
      if (currentMap.shop && currentMap.shop.inventory) {
        return {
          ...state,
          shop: {
            ...state.shop,
            isOpen: true,
            inventory: currentMap.shop.inventory
          }
        };
      }
      
      // Check if hydra is defeated (shop opens when hydra is defeated) - for dungeon
      const hydraDefeated = currentMap.monsters.find(monster => 
        monster.type === 'hydra' && monster.isBoss
      )?.isDefeated;
      
      if (hydraDefeated) {
        return {
          ...state,
          shop: {
            ...state.shop,
            isOpen: true
          }
        };
      } else {
        return {
          ...state,
          battle: {
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: 'Shop is closed right now, please return later. (Το κατάστημα είναι κλειστό τώρα, παρακαλώ επιστρέψτε αργότερα.)',
            awaitingRiddleAnswer: false,
          }
        };
      }
      
    case 'USE_PORTABLE_ITEM':
      if (!state.battle.isActive) return state;
      
      const itemToUse = state.hero.portableItems.find(item => 
        item.id === action.payload.itemId
      );
      
      if (itemToUse) {
        if (itemToUse.type === 'freezingBomb') {
          // Freeze the monster for specified turns
          const freezeTurns = itemToUse.freezeTurns || 5;
          return {
            ...state,
            hero: {
              ...state.hero,
              portableItems: state.hero.portableItems.filter(item => item.id !== itemToUse.id)
            },
            battle: {
              ...state.battle,
              monsterFrozen: true,
              monsterFrozenTurns: freezeTurns,
              battleMessage: `❄️ Χρησιμοποιήσατε την ${itemToUse.name}! Ο εχθρός παγώνει για ${freezeTurns} γύρους!`,
              turn: 'hero'
            }
          };
        } else {
          const newHp = Math.min(state.hero.maxHp, state.hero.hp + itemToUse.healAmount);
          const healAmount = newHp - state.hero.hp;
          
          let battleMessage = `You used ${itemToUse.name}! +${healAmount} HP (Χρησιμοποιήσατε ${itemToUse.name}! +${healAmount} HP)`;
          
          // Check if hero was poisoned and clear it
          const wasPoisoned = state.hero.isPoisoned;
          
          return {
            ...state,
            hero: {
              ...state.hero,
              hp: newHp,
              isPoisoned: false, // Clear poison when using portable potion
              poisonDamage: 0,
              portableItems: state.hero.portableItems.filter(item => item.id !== itemToUse.id)
            },
            battle: {
              ...state.battle,
              battleMessage: wasPoisoned ? 
                `${battleMessage} Poison cured! (Δηλητήριο θεραπεύθηκε!)` : 
                battleMessage,
              turn: 'hero' // Keep hero's turn so they can still attack
            }
          };
        }
      }
      return state;
      
    case 'COLLECT_EQUIPMENT':
      if (!currentMap) return state;
      
      console.log('COLLECT_EQUIPMENT called with:', action.payload);
      
      const equipmentToCollect = currentMap.items.find(item => 
        item.id === action.payload.equipmentId
      );
      
      console.log('Equipment to collect:', equipmentToCollect);
      
      if (!equipmentToCollect || equipmentToCollect.isCollected) {
        console.log('Equipment not found or already collected');
        return state;
      }
      
      const equipmentConfig = EQUIPMENT_ITEMS[equipmentToCollect.equipmentType];
      
      // RING: Simple logic - if no ring equipped, give ring with 3 charges
      if (equipmentConfig.type === EQUIPMENT_TYPES.ACCESSORY) {
        if (state.hero.equipment.ring) return state; // Already has ring
        
        return {
          ...state,
          hero: {
            ...state.hero,
            equipment: { ...state.hero.equipment, ring: 'ring' },
            ringCharges: 3
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap && currentMap.items ? 
                currentMap.items.map(item =>
                  item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
                ) : []
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the Ring of Knowledge! (3 charges)`
          }
        };
      }
      
      // OTHER EQUIPMENT: Check guardian (if any)
      if (equipmentToCollect.guardedBy !== null && equipmentToCollect.guardedBy !== undefined) {
        console.log('Equipment has guardians:', equipmentToCollect.guardedBy);
        
        let guardianDefeated = true;
        
        if (Array.isArray(equipmentToCollect.guardedBy)) {
          // Multiple guardians - all must be defeated
          console.log('Checking multiple guardians:', equipmentToCollect.guardedBy);
          guardianDefeated = equipmentToCollect.guardedBy.every(guardianId => {
            const monster = currentMap.monsters.find(monster => monster.id === guardianId);
            console.log(`Guardian ${guardianId}:`, monster);
            return monster?.isDefeated;
          });
        } else {
          // Single guardian
          console.log('Checking single guardian:', equipmentToCollect.guardedBy);
          const monster = currentMap.monsters.find(monster => monster.id === equipmentToCollect.guardedBy);
          console.log('Guardian monster:', monster);
          guardianDefeated = monster?.isDefeated;
        }
        
        console.log('All guardians defeated:', guardianDefeated);
        
        if (!guardianDefeated) {
          console.log('Guardian not defeated, cannot collect equipment');
          return state;
        }
      }
      // If no guardian (guardedBy is null/undefined), allow collection
      
      // Determine equipment slot
      const equipmentSlot = equipmentConfig.type === EQUIPMENT_TYPES.SHIELD ? 'shield' : 
                           equipmentConfig.type === EQUIPMENT_TYPES.WEAPON ? 'weapon' : 
                           equipmentConfig.type === EQUIPMENT_TYPES.ARMOR ? 'armor' :
                           equipmentConfig.type === EQUIPMENT_TYPES.ACCESSORY ? 'ring' :
                           equipmentConfig.type;
      
      // Check if hero already has equipment in this slot
      const currentEquipped = state.hero.equipment[equipmentSlot];
      
      if (currentEquipped) {
        // Add current equipped item to bag and equip new item
        return {
          ...state,
          hero: {
            ...state.hero,
            equipment: {
              ...state.hero.equipment,
              [equipmentSlot]: equipmentToCollect.equipmentType
            },
            bag: {
              ...state.hero.bag,
              [equipmentSlot]: [...(state.hero.bag[equipmentSlot] || []), currentEquipped]
            }
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap && currentMap.items ? 
                currentMap.items.map(item =>
                  item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
                ) : []
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the ${equipmentConfig.name}!${equipmentConfig.fireImmune ? ' Fire Immune' : ''} Previous ${currentEquipped ? EQUIPMENT_ITEMS[currentEquipped]?.name || currentEquipped : 'item'} moved to bag.`
          }
        };
      } else {
        // No current equipment, just equip the new item
        return {
          ...state,
          hero: {
            ...state.hero,
            equipment: {
              ...state.hero.equipment,
              [equipmentSlot]: equipmentToCollect.equipmentType
            }
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap && currentMap.items ? 
                currentMap.items.map(item =>
                  item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
                ) : []
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the ${equipmentConfig.name}!${equipmentConfig.fireImmune ? ' Fire Immune' : ''}`
          }
        };
      }
      
    case 'COLLECT_TREASURE':
      if (!currentMap) return state;
      
      const treasureToCollect = currentMap.items.find(item => 
        item.id === action.payload.treasureId
      );
      
      if (!treasureToCollect || treasureToCollect.isCollected) {
        return state;
      }
      
      return {
        ...state,
        hero: {
          ...state.hero,
          gold: state.hero.gold + 50 // Treasure gives 50 gold
        },
        maps: {
          ...state.maps,
          [state.currentMapId]: {
            ...currentMap,
            items: currentMap && currentMap.items ? 
              currentMap.items.map(item =>
                item.id === treasureToCollect.id ? { ...item, isCollected: true } : item
              ) : []
          }
        },
        battle: {
          ...state.battle,
          battleMessage: `You found a treasure chest! +50 gold! (Βρήκατε ένα θησαυρό! +50 χρυσά!)`
        }
      };
      
    case 'OPEN_SHOP':
      return {
        ...state,
        shop: {
          ...state.shop,
          isOpen: true
        }
      };
      
    case 'CLOSE_SHOP':
      return {
        ...state,
        shop: {
          ...state.shop,
          isOpen: false
        }
      };
      
    case 'SHOP_BUY_ITEM':
      const { itemType: buyItemType, price: buyPrice, name: buyItemName } = action.payload;
      
      // Check if player can afford the item
      if (state.hero.gold < buyPrice) {
        return {
          ...state,
          battle: {
            ...state.battle,
            battleMessage: `Not enough gold! You need ${buyPrice} gold to buy ${buyItemName}.`
          }
        };
      }
      
      // For portable potions, check if player already has 3 (only for dungeon shop)
      if (buyItemType === 'portablePotion') {
        const currentPortableCount = state.hero.portableItems.filter(item => item.type === 'portablePotion').length;
        // Allow unlimited portable potions for testing shops (like Crossroads)
        if (currentPortableCount >= 10) { // Increased limit for testing
          return {
            ...state,
            battle: {
              ...state.battle,
              battleMessage: `You can only carry 10 portable healing potions at a time!`
            }
          };
        }
      }
      
      // Handle different item types
      let updatedHero = { ...state.hero, gold: state.hero.gold - buyPrice };
      
      if (buyItemType === 'portablePotion') {
        // Add portable potion
        updatedHero.portableItems = [...state.hero.portableItems, { 
          id: Date.now(), 
          type: 'portablePotion', 
          name: 'Portable Healing Potion', 
          healAmount: 50 
        }];
      } else if (buyItemType === 'redArmor') {
        // Add red armor to bag
        updatedHero.bag = { ...state.hero.bag, armor: [...state.hero.bag.armor, 'redArmor'] };
      } else if (buyItemType === 'dungeonArmor') {
        // Add dungeon armor to bag
        updatedHero.bag = { ...state.hero.bag, armor: [...state.hero.bag.armor, 'dungeonArmor'] };
      } else if (buyItemType === 'flamingSword') {
        // Add flaming sword to bag
        updatedHero.bag = { ...state.hero.bag, weapon: [...state.hero.bag.weapon, 'flamingSword'] };
      } else if (buyItemType === 'shield') {
        // Add shield to bag
        updatedHero.bag = { ...state.hero.bag, shield: [...state.hero.bag.shield, 'shield'] };
      }
      
      // Proceed with purchase
      return {
        ...state,
        hero: updatedHero,
        battle: {
          ...state.battle,
          battleMessage: `You bought ${buyItemName} for ${buyPrice} gold!`
        }
      };
      
    case 'SHOP_SELL_ITEM':
      const { itemType: sellItemType, price: sellPrice, name: sellItemName } = action.payload;
      
      // Handle selling bag items only (no longer selling equipped items)
      let newBag = { ...state.hero.bag };
      let itemSold = false;
      
      // Check bag for the item
      Object.keys(newBag).forEach(slot => {
        const itemIndex = newBag[slot].indexOf(sellItemType);
        if (itemIndex !== -1) {
          newBag[slot] = newBag[slot].filter((_, index) => index !== itemIndex);
          itemSold = true;
        }
      });
      
      if (itemSold) {
        return {
          ...state,
          hero: {
            ...state.hero,
            gold: state.hero.gold + sellPrice,
            bag: newBag
          },
          battle: {
            ...state.battle,
            battleMessage: `You sold ${sellItemName} for ${sellPrice} gold!`
          }
        };
      }
      return state;
      
    case 'SHOP_SELL_PORTABLE_ITEM':
      const { itemId: portableItemId, itemType: portableItemType, price: portableSellPrice, name: portableSellName } = action.payload;
      
      // Find and remove the portable item
      const portableItemIndex = state.hero.portableItems.findIndex(item => item.id === portableItemId);
      
      if (portableItemIndex !== -1) {
        const newPortableItems = [...state.hero.portableItems];
        newPortableItems.splice(portableItemIndex, 1);
        
        return {
          ...state,
          hero: {
            ...state.hero,
            gold: state.hero.gold + portableSellPrice,
            portableItems: newPortableItems
          },
          battle: {
            ...state.battle,
            battleMessage: `You sold ${portableSellName} for ${portableSellPrice} gold!`
          }
        };
      }
      return state;
      
    case 'COLLECT_GOLD':
      const { amount: goldAmount, itemId: goldItemId } = action.payload;
      return {
        ...state,
        hero: {
          ...state.hero,
          gold: (state.hero.gold || 0) + goldAmount
        },
        maps: {
          ...state.maps,
          [state.currentMapId]: {
            ...currentMap,
            items: currentMap && currentMap.items ? 
              currentMap.items.map(item =>
                item.id === goldItemId ? { ...item, isCollected: true } : item
              ) : []
          }
        },
        battle: {
          ...state.battle,
          battleMessage: `You collected ${goldAmount} gold! 💰`
        }
      };
      
    case 'EQUIP_FROM_BAG':
      const { slot, itemType } = action.payload;
      const bagItems = state.hero.bag[slot];
      
      if (!bagItems || bagItems.length === 0) return state;
      
      // Find the item in the bag
      const itemIndex = bagItems.indexOf(itemType);
      if (itemIndex === -1) return state;
      
      // Get current equipped item
      const currentlyEquipped = state.hero.equipment[slot];
      
      // Remove item from bag
      const newBagItems = [...bagItems];
      newBagItems.splice(itemIndex, 1);
      
      // If there was a currently equipped item, add it back to bag
      if (currentlyEquipped) {
        newBagItems.push(currentlyEquipped);
      }
      
      return {
        ...state,
        hero: {
          ...state.hero,
          equipment: {
            ...state.hero.equipment,
            [slot]: itemType
          },
          bag: {
            ...state.hero.bag,
            [slot]: newBagItems
          }
        },
        battle: {
          ...state.battle,
          battleMessage: `You equipped ${EQUIPMENT_ITEMS[itemType].name} from your bag!`
        }
      };
      
    case 'USE_RING_CHARGE':
      if (!state.hero.equipment.ring || state.hero.ringCharges <= 0) {
        return state;
      }
      
      const remainingCharges = state.hero.ringCharges - 1;
      
      // If charges reach 0, unequip the ring
      if (remainingCharges <= 0) {
        return {
          ...state,
          hero: {
            ...state.hero,
            equipment: { ...state.hero.equipment, ring: null },
            ringCharges: 0
          },
          battle: {
            ...state.battle,
            battleMessage: `Ring charges depleted! Ring unequipped. (Εξαντλήθηκαν οι χρήσεις του δαχτυλιδιού! Το δαχτυλίδι αφαιρέθηκε.)`
          }
        };
      }
      
      return {
        ...state,
        hero: {
          ...state.hero,
          ringCharges: remainingCharges
        },
        battle: {
          ...state.battle,
          battleMessage: `Ring charge used! ${remainingCharges} charges remaining. (Χρησιμοποιήθηκε φόρτιση δαχτυλιδιού! ${remainingCharges} χρήσεις ακόμα.)`
        }
      };
      
    case 'FLEE_BATTLE':
      // Apply 2 HP penalty for fleeing
      let heroAfterFlee = {
        ...state.hero,
        hp: Math.max(0, state.hero.hp - 2)
      };
      
      // Check if fleeing from large spider and apply poison
      let fleeMessage = `You fled from battle! Lost 2 HP as penalty. (Φύγατε από τη μάχη! Χάσατε 2 HP ως ποινή.)`;
      
      if (state.battle.currentMonster && state.battle.currentMonster.type === 'large spider') {
        heroAfterFlee = {
          ...heroAfterFlee,
          isPoisoned: true,
          poisonDamage: 0
        };
        fleeMessage = `You fled from the large spider! Lost 2 HP as penalty and got poisoned! (Φύγατε από τη μεγάλη αράχνη! Χάσατε 2 HP ως ποινή και δηλητηριάσατε!)`;
      }
      
      return {
        ...state,
        hero: heroAfterFlee,
        battle: {
          ...state.battle,
          isActive: false,
          currentMonster: null,
          battleQueue: [],
          currentRiddle: null,
          awaitingRiddleAnswer: false,
          battleMessage: fleeMessage,
          turn: 'hero',
          monsterAttacking: false,
          heroAttacking: false,
          attackQueue: []
        }
      };
      

      

      
    case 'HIDE_VICTORY_POPUP':
      return {
        ...state,
        battle: {
          ...state.battle,
          showVictoryPopup: false
        }
      };
      
    case 'RESET_PROGRESS':
      // Clear permanent HP bonus from localStorage
      savePermanentHpBonus(0);

      // Reset to initial state, but ensure map is 'main'
      return {
        ...initialState,
        hero: {
          ...initialState.hero,
          permanentHpBonus: 0,
          maxHp: 100,
          hp: 100, // Ensure hero starts with full HP
          onFire: false, // Clear fire effect
          fireDamage: 0, // Clear fire damage
          isPoisoned: false, // Clear poison effect
          poisonDamage: 0, // Clear poison damage
          bag: {
            weapon: [],
            shield: [],
            armor: []
          }
        },
        currentMapId: 'main', // Ensure we reset to the main map
        maps: { // Re-initialize maps for a fresh start
          main: createMainMapState(),
          dungeon: createDungeonMapState(),
          dungeonLevel2: createDungeonLevel2MapState(),
          volcano: createVolcanoMapState(),
          forest: createForestMapState(),
          crossroads: createCrossroadsMapState(),
          treasureIsland: createTreasureIslandMapState(),
          trollCastle: createTrollCastleMapState()
        }
      };
      
    case 'SHOW_ROAD_SIGN_MESSAGE':
      return {
        ...state,
        battle: {
          ...state.battle,
          battleMessage: action.payload.text
        }
      };

    case 'CLEAR_ROAD_SIGN_MESSAGE':
      return {
        ...state,
        battle: {
          ...state.battle,
          battleMessage: ''
        }
      };
      
    case 'OPEN_BOOK':
      return {
        ...state,
        book: {
          isOpen: true,
          bookType: action.payload.bookType
        }
      };
      
    case 'CLOSE_BOOK':
      return {
        ...state,
        book: {
          isOpen: false,
          bookType: null
        }
      };
      
    case 'BOAT_INTERACTION':
      if (!currentMap) return state;
      
      const boatItem = currentMap.items.find(item => 
        item.type === 'boat' && !item.isCollected
      );
      
      if (!boatItem) return state;
      
      let newMapId = '';
      let newHeroX = state.hero.x;
      let newHeroY = state.hero.y;

      if (state.currentMapId === 'crossroads') {
        // From Crossroads to Treasure Island
        newMapId = 'treasureIsland';
        // Hero will start at (15,4) in Treasure Island
        newHeroX = 14; // 15 in 1-based = 14 in 0-based
        newHeroY = 3;  // 4 in 1-based = 3 in 0-based
      } else if (state.currentMapId === 'treasureIsland') {
        // From Treasure Island back to Crossroads
        newMapId = 'crossroads';
        // Hero will start at (8,3) in Crossroads
        newHeroX = 7; // 8 in 1-based = 7 in 0-based
        newHeroY = 2; // 3 in 1-based = 2 in 0-based
      }

      if (newMapId) {
        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }
      
      return state;
      
    case 'TROLL_CASTLE_INTERACTION':
      if (!currentMap) return state;
      
      const trollCastleItem = currentMap.items.find(item => 
        item.type === 'trollCastle' && !item.isCollected
      );
      
      if (!trollCastleItem) return state;
      
      newMapId = '';
      newHeroX = state.hero.x;
      newHeroY = state.hero.y;

      if (state.currentMapId === 'crossroads') {
        // From Crossroads to Troll Castle
        newMapId = 'trollCastle';
        // Hero will start at (1,1) in Troll Castle
        newHeroX = 0; // 1 in 1-based = 0 in 0-based
        newHeroY = 0; // 1 in 1-based = 0 in 0-based
      }

      if (newMapId) {
        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }
      
      return state;
      
    case 'CROSSROADS_INTERACTION':
      if (!currentMap) return state;
      
      const crossroadsItem = currentMap.items.find(item => 
        item.type === 'crossroads' && !item.isCollected
      );
      
      if (!crossroadsItem) return state;
      
      newMapId = '';
      newHeroX = state.hero.x;
      newHeroY = state.hero.y;

      if (state.currentMapId === 'trollCastle') {
        // From Troll Castle back to Crossroads
        newMapId = 'crossroads';
        // Hero will start at (8,13) in Crossroads
        newHeroX = 7; // 8 in 1-based = 7 in 0-based
        newHeroY = 12; // 13 in 1-based = 12 in 0-based
      }

      if (newMapId) {
        return {
          ...state,
          hero: {
            ...state.hero,
            x: newHeroX,
            y: newHeroY,
          },
          currentMapId: newMapId,
          battle: { // Clear any battle state when changing maps
            ...state.battle,
            isActive: false,
            currentMonster: null,
            battleQueue: [],
            currentRiddle: null,
            battleMessage: '',
            awaitingRiddleAnswer: false,
          }
        };
      }
      
      return state;
      
    default:
      return state;
  }
}

// Context
const GameContext = createContext();

// Provider component
export function GameProvider({ children }) {
  // Load permanent HP bonus from localStorage and create initial state
  const savedPermanentBonus = loadPermanentHpBonus();
  // Ensure minimum of 5 permanent HP bonus since the player has already completed 5 stages
  const effectivePermanentBonus = Math.max(savedPermanentBonus, 5);
  
  // Update localStorage if the saved value was lower than 5
  if (savedPermanentBonus < 5) {
    savePermanentHpBonus(effectivePermanentBonus);
  }
  
  const initialGameState = {
    ...initialState,
    hero: {
      ...initialState.hero,
      permanentHpBonus: effectivePermanentBonus,
      maxHp: 100 + effectivePermanentBonus,
      hp: 100 + effectivePermanentBonus
    }
  };
  
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use game state
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 