import { createContext, useContext, useReducer } from 'react';
import { generateRandomRiddleForMap } from './RiddleManager';
import { createMainMapState } from './maps/MainMapState';
import { createDungeonMapState } from './maps/DungeonMapState';
import { createVolcanoMapState } from './maps/VolcanoMapState';

// Game constants
export const TILE_SIZE = 64;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;

// Tile types
export const TILE_TYPES = {
  GRASS: 'grass',
  GRASS2: 'grass2',
  STONE: 'stone',
  STONE2: 'stone2',
  WATER: 'water',
  WATER2: 'water2',
  WALL: 'wall',
  TREE: 'tree',
  TREE2: 'tree2',
  TREE3: 'tree3',
  TREE4: 'tree4',
  TREE5: 'tree5',
  PATH: 'path',
  ROAD: 'road',
  CROSSROAD: 'crossroad',
  HOUSE1: 'house1',
  HOUSE2: 'house2',
  HOUSE3: 'house3',
  HOUSE4: 'house4',
  HOUSE5: 'house5',
  WINDMILL: 'windmill',
  CASTLE: 'castle',
  BRIDGE: 'bridge',
  ROCKS: 'rocks',
  FLOWERS: 'flowers',
  POTION: 'potion',
  DUNGEON_ENTRANCE: 'dungeon_entrance', // New tile type for dungeon entrance
  DUNGEON_FLOOR: 'dungeon_floor', // New tile type for dungeon floor
  DUNGEON_WALL: 'dungeon_wall', // New tile type for dungeon walls
  DIRT: 'dirt', // New tile type for dirt
  DIRT2: 'dirt2', // New tile type for dirt variation
  FIRE: 'fire', // New tile type for volcano fire
  VOLCANO_ENTRANCE: 'volcano_entrance' // New tile type for volcano entrance
};

// Trap types
export const TRAP_TYPES = {
  DAMAGE: 'damage',
  TELEPORT: 'teleport'
};

// Equipment definitions (parametrical system for future expansion)
export const EQUIPMENT_TYPES = {
  WEAPON: 'weapon',
  ARMOR: 'armor'
};

export const EQUIPMENT_ITEMS = {
  sword: {
    name: 'Iron Sword',
    type: EQUIPMENT_TYPES.WEAPON,
    damageBonus: 3, // adds 1-3 damage
    asset: 'sword.png'
  },
  shield: {
    name: 'Knight Shield',
    type: 'shield', // Use 'shield' as the type instead of EQUIPMENT_TYPES.ARMOR
    blockChance: 0.25, // 25% chance to block
    asset: 'shield.jpeg'
  },
  ring: {
    name: 'Ring of Knowledge',
    type: 'ring',
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
    type: 'shield',
    blockChance: 0.25, // 25% chance to block, increases to 40% when HP < 40
    asset: 'magicShield.png'
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
    equipment: {
      weapon: null,
      shield: null,
      armor: null,
      ring: null
    },
    bag: {
      weapon: [],
      shield: [],
      armor: []
    },
    ringCharges: 0 // Simple counter for ring charges
  },
  currentMapId: 'main', // New: Track current map
  maps: { // New: Store multiple maps
    main: createMainMapState(),
    dungeon: createDungeonMapState(),
    volcano: createVolcanoMapState()
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
    showVictoryPopup: false
  }
};

// Game state reducer
function gameReducer(state, action) {
  const currentMap = state.maps ? state.maps[state.currentMapId] : null;
  
  switch (action.type) {
    case 'MOVE_HERO':
      if (!currentMap) return state;
      
      const { x, y } = action.payload;
      const newX = Math.max(0, Math.min(currentMap.width - 1, state.hero.x + x));
      const newY = Math.max(0, Math.min(currentMap.height - 1, state.hero.y + y));
      
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
                        tileType !== TILE_TYPES.FIRE;

      // New: Handle dungeon entrance/exit
      if (tileType === TILE_TYPES.DUNGEON_ENTRANCE) {
        let newMapId = '';
        let newHeroX = newX;
        let newHeroY = newY;

        if (state.currentMapId === 'main') {
          newMapId = 'dungeon';
          // Keep hero at the same coordinates in the new map
        } else if (state.currentMapId === 'dungeon') {
          newMapId = 'main';
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
      
      if (isWalkable) {
        // Check for monsters in proximity from the current map's monsters
        const monstersInProximity = currentMap.monsters.filter(monster => {
          if (monster.isDefeated) return false;
          
          const distance = Math.max(
            Math.abs(monster.x - newX),
            Math.abs(monster.y - newY)
          );
          
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
          potion.type === 'potion' && potion.x === newX && potion.y === newY && !potion.isCollected
        );
        
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
            hp: newHp
          };
          
          updatedItems = currentMap.items.map(item =>
            item.id === potionAtPosition.id
              ? { ...item, isCollected: true }
              : item
          );
          
          healMessage = `You found a healing potion! +${actualHeal} HP (Βρήκατε ένα φίλτρο θεραπείας! +${actualHeal} HP)`;
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
          
          updatedItems = currentMap.items.map(item =>
            item.id === armorAtPosition.id
              ? { ...item, isCollected: true }
              : item
          );
          
          healMessage = `You equipped the ${armorAtPosition.name}! Damage reduction: ${armorAtPosition.defense} (Εξοπλιστήκατε με το ${armorAtPosition.name}! Μείωση ζημιάς: ${armorAtPosition.defense})`;
        } else if (equipmentAtPosition) {
          // Collect and equip the equipment
          const equipmentConfig = EQUIPMENT_ITEMS[equipmentAtPosition.equipmentType];
          
          // RING: Special handling for rings
          if (equipmentConfig.type === 'ring') {
            if (!updatedHero.equipment.ring) {
              // Give ring with 3 charges
              updatedHero = {
                ...updatedHero,
                equipment: { ...updatedHero.equipment, ring: 'ring' },
                ringCharges: 3
              };
              
              updatedItems = currentMap.items.map(item =>
                item.id === equipmentAtPosition.id
                  ? { ...item, isCollected: true }
                  : item
              );
              
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
            
            updatedItems = currentMap.items.map(item =>
              item.id === equipmentAtPosition.id
                ? { ...item, isCollected: true }
                : item
            );
            
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
          updatedTraps = currentMap.traps.map(t =>
            t.id === trapAtPosition.id ? { ...t, isActivated: true } : t
          );
          
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
            battleMessage: healMessage
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
      const updatedMonsters = currentMap.monsters.map(monster =>
        monster.id === defeatedMonsterId
          ? { ...monster, isDefeated: true }
          : monster
      );

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
      }
      return updatedStateAfterDefeat;
      
    case 'BASIC_ATTACK':
      // Calculate damage with equipment bonus
      let baseDamage = Math.floor(Math.random() * 6) + 10; // 10-15 damage
      const weaponEquipped = state.hero.equipment.weapon;
      let criticalStrike = false;
      
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
      }
      
      const updatedMonster = {
        ...state.battle.currentMonster,
        hp: Math.max(0, state.battle.currentMonster.hp - baseDamage)
      };
      
      if (updatedMonster.hp <= 0) {
        return {
          ...state,
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              monsters: currentMap.monsters.map(m => 
                m.id === updatedMonster.id ? { ...m, isDefeated: true } : m
              )
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
                      battleMessage: criticalStrike ? 
              `CRITICAL STRIKE! You hit for ${baseDamage} damage! (ΚΡΙΤΙΚΗ ΚΡΟΥΣΗ! Χτυπήσατε για ${baseDamage} ζημιά!)` :
              weaponEquipped ? 
              `You hit for ${baseDamage} damage! (weapon bonus included) (Χτυπήσατε για ${baseDamage} ζημιά! (συμπεριλαμβανομένου του μπόνους όπλου))` : 
              `You hit for ${baseDamage} damage! (Χτυπήσατε για ${baseDamage} ζημιά!)`,
          turn: 'monster',
          heroAttacking: true,
          monsterAttacking: false
        }
      };
      
    case 'START_RIDDLE_ATTACK':
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
        
        if (weaponEquipped && EQUIPMENT_ITEMS[weaponEquipped]) {
          const weaponBonus = Math.floor(Math.random() * EQUIPMENT_ITEMS[weaponEquipped].damageBonus) + 1;
          strongDamage += weaponBonus;
          
          // Check for critical strike (axe only)
          if (weaponEquipped === 'axe' && EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
            if (Math.random() < EQUIPMENT_ITEMS[weaponEquipped].criticalChance) {
              strongDamage *= 2;
            }
          }
        }
        
        const strongUpdatedMonster = {
          ...state.battle.currentMonster,
          hp: Math.max(0, state.battle.currentMonster.hp - strongDamage)
        };
        
        if (strongUpdatedMonster.hp <= 0) {
          return {
            ...state,
            maps: {
              ...state.maps,
              [state.currentMapId]: {
                ...currentMap,
                monsters: currentMap.monsters.map(m => 
                  m.id === strongUpdatedMonster.id ? { ...m, isDefeated: true } : m
                )
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
            battleMessage: weaponEquipped ? 
              `Correct! You hit for ${strongDamage} damage! (weapon bonus included) (Σωστά! Χτυπήσατε για ${strongDamage} ζημιά! (συμπεριλαμβανομένου του μπόνους όπλου))` :
              `Correct! You hit for ${strongDamage} damage! (Σωστά! Χτυπήσατε για ${strongDamage} ζημιά!)`,
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
      let monsterAttackDamage = state.battle.currentMonster.attackDamage;
      
      // Check for armor damage reduction and shield block
      const armorEquipped = state.hero.equipment.armor;
      const shieldEquipped = state.hero.equipment.shield;
      let damageReduction = 0;
      let blocked = false;
      
      // Check armor for damage reduction
      if (armorEquipped && armorEquipped.defense) {
        damageReduction = armorEquipped.defense;
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
      
      const heroAfterAttack = {
        ...state.hero,
        hp: Math.max(0, state.hero.hp - monsterAttackDamage)
      };
      
      if (heroAfterAttack.hp <= 0 && !blocked) {
        return {
          ...state,
          hero: heroAfterAttack,
          battle: {
            ...state.battle,
            battleMessage: `The ${state.battle.currentMonster.type} defeated you! (Το ${state.battle.currentMonster.type} σας νίκησε!)`,
            turn: 'defeat',
            monsterAttacking: true,
            heroAttacking: false
          }
        };
      }
      
      // Check if there's a queued attack
      const hasQueuedAttack = state.battle.attackQueue && state.battle.attackQueue.length > 0;
      

      const damageMessage = blocked ? 
        `The ${state.battle.currentMonster.type} attacks but you block it with your shield! (Το ${state.battle.currentMonster.type} επιτίθεται αλλά το αποκλείετε με την ασπίδα σας!)` :
        `The ${state.battle.currentMonster.type} attacks you for ${monsterAttackDamage} damage! (Το ${state.battle.currentMonster.type} σας επιτίθεται για ${monsterAttackDamage} ζημιά!)`;
      
      // If this was the last attack in the queue, return control to hero
      const remainingQueue = hasQueuedAttack ? state.battle.attackQueue.slice(1) : [];
      const isLastAttack = hasQueuedAttack && remainingQueue.length === 0;
      
      return {
        ...state,
        hero: heroAfterAttack,
        battle: {
          ...state.battle,
                      battleMessage: `${damageMessage}${hasQueuedAttack && !isLastAttack ? ' (Penalty attack) (Ποινική επίθεση)' : ''}`,
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
      
    case 'CLEAR_POTION_MESSAGE':
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
      
    case 'COLLECT_ARMOR':
      if (!currentMap) return state;
      
      const armorToCollect = currentMap.items.find(item => 
        item.id === action.payload.armorId && item.type === 'armor'
      );
      
      if (armorToCollect && !armorToCollect.isCollected) {
        console.log('Collecting armor via click:', armorToCollect);
        
        return {
          ...state,
          hero: {
            ...state.hero,
            equipment: {
              ...state.hero.equipment,
              armor: armorToCollect
            }
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap.items.map(item =>
                item.id === armorToCollect.id
                  ? { ...item, isCollected: true }
                  : item
              )
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the ${armorToCollect.name}! Damage reduction: ${armorToCollect.defense} (Εξοπλιστήκατε με το ${armorToCollect.name}! Μείωση ζημιάς: ${armorToCollect.defense})`
          }
        };
      }
      return state;
      
    case 'COLLECT_EQUIPMENT':
      if (!currentMap) return state;
      
      const equipmentToCollect = currentMap.items.find(item => 
        item.id === action.payload.equipmentId
      );
      
      if (!equipmentToCollect || equipmentToCollect.isCollected) return state;
      
      const equipmentConfig = EQUIPMENT_ITEMS[equipmentToCollect.equipmentType];
      
      // RING: Simple logic - if no ring equipped, give ring with 3 charges
      if (equipmentConfig.type === 'ring') {
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
              items: currentMap.items.map(item =>
                item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
              )
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
        const guardianDefeated = currentMap.monsters.find(monster => 
          monster.id === equipmentToCollect.guardedBy
        )?.isDefeated;
        
        if (!guardianDefeated) return state;
      }
      // If no guardian (guardedBy is null/undefined), allow collection
      
      // Determine equipment slot
      const equipmentSlot = equipmentConfig.type === 'shield' ? 'shield' : 
                           equipmentConfig.type === EQUIPMENT_TYPES.WEAPON ? 'weapon' : 
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
              [equipmentSlot]: [...state.hero.bag[equipmentSlot], currentEquipped]
            }
          },
          maps: {
            ...state.maps,
            [state.currentMapId]: {
              ...currentMap,
              items: currentMap.items.map(item =>
                item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
              )
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the ${equipmentConfig.name}! Previous ${EQUIPMENT_ITEMS[currentEquipped].name} moved to bag.`
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
              items: currentMap.items.map(item =>
                item.id === equipmentToCollect.id ? { ...item, isCollected: true } : item
              )
            }
          },
          battle: {
            ...state.battle,
            battleMessage: `You equipped the ${equipmentConfig.name}!`
          }
        };
      }
      
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
      const heroAfterFlee = {
        ...state.hero,
        hp: Math.max(0, state.hero.hp - 2)
      };
      
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
          battleMessage: `You fled from battle! Lost 2 HP as penalty. (Φύγατε από τη μάχη! Χάσατε 2 HP ως ποινή.)`,
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
          volcano: createVolcanoMapState()
        }
      };
      
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