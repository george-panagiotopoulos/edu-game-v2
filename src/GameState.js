import { createContext, useContext, useReducer } from 'react';
import { generateRandomRiddle, generateRandomRiddleForMap } from './RiddleManager';

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
  DIRT2: 'dirt2' // New tile type for dirt variation
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

// Generate a rich medieval village with varied terrain and structures
function generateMap() {
  const tiles = [];
  
  // Initialize with mixed grass, stone, and dirt
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const rand = Math.random();
      if (rand < 0.25) {
        // 25% stone
        row.push(rand < 0.125 ? TILE_TYPES.STONE : TILE_TYPES.STONE2);
      } else if (rand < 0.45) {
        // 20% dirt (20% of the remaining 75%)
        row.push(rand < 0.425 ? TILE_TYPES.DIRT : TILE_TYPES.DIRT2);
      } else {
        // 55% grass (remaining)
        row.push((x + y) % 2 === 0 ? TILE_TYPES.GRASS : TILE_TYPES.GRASS2);
      }
    }
    tiles.push(row);
  }
  
  // Create borders with walls
  for (let x = 0; x < MAP_WIDTH; x++) {
    tiles[0][x] = TILE_TYPES.WALL;
    tiles[MAP_HEIGHT - 1][x] = TILE_TYPES.WALL;
  }
  for (let y = 0; y < MAP_HEIGHT; y++) {
    tiles[y][0] = TILE_TYPES.WALL;
    tiles[y][MAP_WIDTH - 1] = TILE_TYPES.WALL;
  }
  
  // Create road system with proper assets
  // Main horizontal road (Main Street) - use ROAD asset
  for (let x = 2; x < 18; x++) {
    tiles[7][x] = TILE_TYPES.ROAD;
  }
  
  // Main vertical road (Central Avenue) - use PATH asset
  for (let y = 2; y < 13; y++) {
    tiles[y][9] = TILE_TYPES.PATH;
  }
  
  // Left side road (North-South) - use PATH asset
  for (let y = 3; y < 12; y++) {
    tiles[y][4] = TILE_TYPES.PATH;
  }
  
  // Right side road (North-South) - use PATH asset
  for (let y = 3; y < 12; y++) {
    tiles[y][14] = TILE_TYPES.PATH;
  }
  
  // Add crossroads at intersections
  tiles[7][9] = TILE_TYPES.CROSSROAD;  // Main intersection
  tiles[7][4] = TILE_TYPES.CROSSROAD;  // Left intersection
  tiles[7][14] = TILE_TYPES.CROSSROAD; // Right intersection
  
  // Add water features with correct water assets
  // Small pond in top area
  for (let x = 6; x < 9; x++) {
    for (let y = 2; y < 4; y++) {
      tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
    }
  }
  
  // Small pond in bottom area
  for (let x = 15; x < 19; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
    }
  }
  
  // Add castles
  // 2x2 castle in top-left area
  for (let x = 1; x < 3; x++) {
    for (let y = 1; y < 3; y++) {
      tiles[y][x] = TILE_TYPES.CASTLE;
    }
  }
  
  // 3x3 castle in bottom-right area (moved slightly to avoid water)
  for (let x = 16; x < 19; x++) {
    for (let y = 12; y < 15; y++) {
      tiles[y][x] = TILE_TYPES.CASTLE;
    }
  }
  
  // Add windmills
  tiles[5][6] = TILE_TYPES.WINDMILL;  // Windmill near top pond
  tiles[8][13] = TILE_TYPES.WINDMILL; // Windmill near bottom pond
  
  // Village 1 - Top cluster (near left road)
  const village1Houses = [
    [2, 2], [3, 2], [2, 3], [3, 3], [2, 4], [3, 4]
  ];
  
  // Village 2 - Bottom cluster (near right road)
  const village2Houses = [
    [16, 10], [17, 10], [16, 11], [17, 11], [16, 12], [17, 12]
  ];
  
  // Additional houses on the left side
  const leftSideHouses = [
    [1, 11], [1, 12], [1, 13]
  ];
  
  // Additional houses on the right side
  const rightSideHouses = [
    [13, 11], [12, 11], [12, 12], [13, 12]
  ];
  
  // Random houses scattered around
  const randomHouses = [
    [5, 2], [11, 2], [12, 2], [5, 5], [11, 5], [12, 5], [5, 10], [11, 10]
  ];
  
  // Place village 1 houses (mixed types)
  village1Houses.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Place village 2 houses (mixed types)
  village2Houses.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Place random houses (mixed types)
  randomHouses.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Place left side houses (mixed types)
  leftSideHouses.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Place right side houses (mixed types)
  rightSideHouses.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Add forest areas with different tree types
  const treeAreas = [
    {x: 1, y: 13, size: 2, type: TILE_TYPES.TREE},
    {x: 18, y: 1, size: 2, type: TILE_TYPES.TREE2},
    {x: 1, y: 6, size: 2, type: TILE_TYPES.TREE3},
    {x: 18, y: 6, size: 2, type: TILE_TYPES.TREE4}
  ];
  
  // Add new forest area at bottom left
  const newForestArea = [
    {x: 2, y: 17, type: TILE_TYPES.TREE},
    {x: 2, y: 18, type: TILE_TYPES.TREE2},
    {x: 1, y: 17, type: TILE_TYPES.TREE3},
    {x: 1, y: 18, type: TILE_TYPES.TREE4},
    {x: 3, y: 18, type: TILE_TYPES.TREE5}
  ];
  
  // Add additional trees near dungeon entrance
  const dungeonEntranceTrees = [
    {x: 17, y: 1, type: TILE_TYPES.TREE},
    {x: 17, y: 2, type: TILE_TYPES.TREE2},
    {x: 18, y: 2, type: TILE_TYPES.TREE3},
    {x: 18, y: 3, type: TILE_TYPES.TREE4}
  ];
  
  treeAreas.forEach(area => {
    for (let dx = 0; dx < area.size; dx++) {
      for (let dy = 0; dy < area.size; dy++) {
        const x = area.x + dx;
        const y = area.y + dy;
        if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1 && isWalkableTile(tiles[y][x])) {
          tiles[y][x] = area.type;
        }
      }
    }
  });
  
  // Place new forest area trees
  newForestArea.forEach(({x, y, type}) => {
    if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1 && isWalkableTile(tiles[y][x])) {
      tiles[y][x] = type;
    }
  });
  
  // Place dungeon entrance trees
  dungeonEntranceTrees.forEach(({x, y, type}) => {
    if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1 && isWalkableTile(tiles[y][x])) {
      tiles[y][x] = type;
    }
  });
  
  // Add a few decorative elements
  const decorativePositions = [
    [6, 5], [13, 5], [6, 9], [13, 9]
  ];
  decorativePositions.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      tiles[y][x] = index % 2 === 0 ? TILE_TYPES.FLOWERS : TILE_TYPES.ROCKS;
    }
  });
  
  // Add dungeon entrance (top right, near trees)
  tiles[2][16] = TILE_TYPES.DUNGEON_ENTRANCE;
  
  return tiles;
}

// Generate the dungeon map
function generateDungeonMap() {
  const tiles = [];

  // Initialize with mostly stone tiles and some dirt
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const rand = Math.random();
      if (rand < 0.1) {
        // 10% dirt
        row.push(rand < 0.05 ? TILE_TYPES.DIRT : TILE_TYPES.DIRT2);
      } else {
        // 90% stone variations
        row.push(rand < 0.45 ? TILE_TYPES.STONE : TILE_TYPES.STONE2);
      }
    }
    tiles.push(row);
  }

  // Create borders with walls (same as main map)
  for (let x = 0; x < MAP_WIDTH; x++) {
    tiles[0][x] = TILE_TYPES.WALL;
    tiles[MAP_HEIGHT - 1][x] = TILE_TYPES.WALL;
  }
  for (let y = 0; y < MAP_HEIGHT; y++) {
    tiles[y][0] = TILE_TYPES.WALL;
    tiles[y][MAP_WIDTH - 1] = TILE_TYPES.WALL;
  }

  // Add dungeon walls (impassable) - doubled amount
  // Horizontal walls
  for (let x = 5; x < 8; x++) {
    tiles[4][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let x = 12; x < 15; x++) {
    tiles[9][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let x = 3; x < 6; x++) {
    tiles[6][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let x = 14; x < 17; x++) {
    tiles[11][x] = TILE_TYPES.DUNGEON_WALL;
  }
  
  // Vertical walls
  for (let y = 6; y < 9; y++) {
    tiles[y][7] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let y = 3; y < 6; y++) {
    tiles[y][13] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let y = 8; y < 11; y++) {
    tiles[y][5] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let y = 4; y < 7; y++) {
    tiles[y][15] = TILE_TYPES.DUNGEON_WALL;
  }
  
  // Additional walls around armor area (bottom left)
  // Create a maze-like structure around (1,13)
  for (let x = 3; x < 6; x++) {
    tiles[12][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let x = 2; x < 4; x++) {
    if (tiles[14]) tiles[14][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let y = 10; y < 13; y++) {
    tiles[y][3] = TILE_TYPES.DUNGEON_WALL;
  }
  // Fix: Only access valid indices (y < MAP_HEIGHT)
  for (let y = 11; y < 14; y++) {
    tiles[y][2] = TILE_TYPES.DUNGEON_WALL;
  }

  // Add a couple of water areas in the dungeon
  for (let x = 3; x < 6; x++) {
    for (let y = 5; y < 8; y++) {
      tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
    }
  }
  for (let x = 12; x < 15; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
    }
  }

  // Add two castles
  tiles[3][3] = TILE_TYPES.CASTLE;
  tiles[11][14] = TILE_TYPES.CASTLE;

  // Dungeon Exit (same as entrance for now)
  tiles[2][16] = TILE_TYPES.DUNGEON_ENTRANCE; // This will be the exit back to main map

  return tiles;
}

// Generate monsters for the dungeon
function generateDungeonMonsters() {
  return [
    // Skeletons (each twice) - some moved to guard armor area
    { id: 201, x: 4, y: 4, hp: 35, maxHp: 35, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 10, fast: false },
    { id: 202, x: 2, y: 12, hp: 35, maxHp: 35, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 10, fast: false }, // Moved near armor
    { id: 203, x: 5, y: 10, hp: 25, maxHp: 25, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
    { id: 204, x: 1, y: 11, hp: 25, maxHp: 25, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 8, fast: false }, // Moved near armor
    { id: 205, x: 18, y: 12, hp: 90, maxHp: 90, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 30, fast: false },
    { id: 206, x: 2, y: 13, hp: 90, maxHp: 90, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 30, fast: false }, // Moved near armor
    { id: 207, x: 1, y: 8, hp: 20, maxHp: 20, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 6, fast: false }, // Moved near armor
    { id: 208, x: 14, y: 2, hp: 20, maxHp: 20, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
    // Spiders and Snakes - some moved to armor area
    { id: 209, x: 6, y: 6, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
    { id: 210, x: 6, y: 13, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false }, // Moved near armor
    { id: 211, x: 7, y: 7, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true },
    { id: 212, x: 1, y: 12, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true }, // Moved near armor
    // Shadow monsters - strong enemies (25-35 damage range, using 30 as average)
    { id: 213, x: 2, y: 1, hp: 45, maxHp: 45, type: 'shadow', isDefeated: false, proximity: 2, attackDamage: 30, fast: false }, // Shadow at 2:1
    { id: 214, x: 12, y: 8, hp: 45, maxHp: 45, type: 'shadow', isDefeated: false, proximity: 2, attackDamage: 30, fast: false } // Random shadow in dungeon
  ];
}

// Generate equipment items on the map (next to specific monsters)
function generateEquipment() {
  return [
    {
      id: 'sword-1',
      type: 'equipment',
      equipmentType: 'sword',
      x: 17, // Next to dragon at (16, 13) - one tile to the right
      y: 13,
      isCollected: false,
      guardedBy: 14 // Dragon monster id
    },
    {
      id: 'shield-1', 
      type: 'equipment',
      equipmentType: 'shield',
      x: 1, // Next to ghost at (2, 2) - one tile to the left
      y: 2,
      isCollected: false,
      guardedBy: 13 // Ghost monster id
    }
  ];
}

// Helper function to check if a tile is walkable (for placing structures)
function isWalkableTile(tileType) {
  return tileType === TILE_TYPES.GRASS || 
         tileType === TILE_TYPES.GRASS2 || 
         tileType === TILE_TYPES.STONE || 
         tileType === TILE_TYPES.STONE2;
}

// Generate healing potions on the map
function generatePotions() {
  const potions = [];
  
  // 2 potions behind monsters (in areas that require defeating monsters to reach)
  const behindMonsterPositions = [
    { x: 1, y: 4, healAmount: Math.floor(Math.random() * 41) + 30 }, // Behind goblin area
    { x: 18, y: 4, healAmount: Math.floor(Math.random() * 41) + 30 }  // Behind skeleton area
  ];
  
  // 4 potions in open spaces (added one more)
  const openSpacePositions = [
    { x: 8, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 },  // Near windmill
    { x: 10, y: 8, healAmount: Math.floor(Math.random() * 41) + 30 }, // On main road
    { x: 6, y: 11, healAmount: Math.floor(Math.random() * 41) + 30 }, // Near bottom area
    { x: 14, y: 6, healAmount: Math.floor(Math.random() * 41) + 30 }  // New potion location
  ];
  
  // Combine all potion positions
  const allPotionPositions = [...behindMonsterPositions, ...openSpacePositions];
  
  allPotionPositions.forEach((potion, index) => {
    potions.push({
      id: index + 1,
      x: potion.x,
      y: potion.y,
      type: 'potion',
      healAmount: potion.healAmount,
      isCollected: false
    });
  });
  
  return potions;
}

// Generate healing potions for the dungeon
function generateDungeonPotions() {
  const potions = [];
  
  // 4 potions in the dungeon
  const dungeonPotionPositions = [
    { x: 4, y: 3, healAmount: Math.floor(Math.random() * 41) + 30 }, // Near first castle
    { x: 15, y: 12, healAmount: Math.floor(Math.random() * 41) + 30 }, // Near second castle
    { x: 8, y: 8, healAmount: Math.floor(Math.random() * 41) + 30 }, // Central area
    { x: 11, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 }  // Near water area
  ];
  
  dungeonPotionPositions.forEach((potion, index) => {
    potions.push({
      id: 100 + index + 1, // Use different ID range for dungeon potions
      x: potion.x,
      y: potion.y,
      type: 'potion',
      healAmount: potion.healAmount,
      isCollected: false
    });
  });
  
  return potions;
}

// Generate armor for the dungeon
function generateDungeonArmor() {
  return [{
    id: 200,
    x: 1,
    y: 13,
    type: 'armor',
    name: 'Dungeon Armor',
    defense: 2, // -2 damage reduction
    isCollected: false
  }];
}

function generateDungeonRing() {
  return [
    {
      id: 201,
      x: 18,
      y: 13,
      type: 'equipment',
      equipmentType: 'ring',
      name: 'Ring of Knowledge',
      charges: 3,
      guardedBy: 205, // Guarded by the skeleton mage at (18, 12)
      isCollected: false
    },
    {
      id: 202,
      x: 1,
      y: 1,
      type: 'equipment',
      equipmentType: 'ring',
      name: 'Ring of Knowledge',
      charges: 3,
      guardedBy: 213, // Guarded by the shadow at (2, 1)
      isCollected: false
    }
  ];
}

// Initial game state
const initialState = {
  hero: {
    x: 9,
    y: 7,
    hp: 104, // Set to 104 HP (100 base + 4 permanent bonus)
    maxHp: 104, // Set max HP to 104
    permanentHpBonus: 4, // Set permanent HP bonus to 4
    inventory: [],
    equipment: {
      weapon: null,
      shield: null,
      armor: null,
      ring: null
    },
    ringCharges: 0 // Simple counter for ring charges
  },
  currentMapId: 'main', // New: Track current map
  maps: { // New: Store multiple maps
    main: {
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      tiles: generateMap(),
      items: [...generatePotions(), ...generateEquipment()],
      monsters: [ // Main map monsters
        { id: 1, x: 3, y: 3, hp: 40, maxHp: 40, type: 'goblin', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
        { id: 2, x: 15, y: 4, hp: 35, maxHp: 35, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 10, fast: false },
        { id: 15, x: 3, y: 5, hp: 25, maxHp: 25, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
        { id: 16, x: 16, y: 8, hp: 90, maxHp: 90, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 30, fast: false },
        { id: 17, x: 8, y: 11, hp: 20, maxHp: 20, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
        { id: 3, x: 5, y: 2, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
        { id: 4, x: 12, y: 2, hp: 45, maxHp: 45, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 12, fast: true },
        { id: 5, x: 11, y: 5, hp: 25, maxHp: 25, type: 'bat', isDefeated: false, proximity: 1, attackDamage: 5, fast: false },
        { id: 6, x: 7, y: 2, hp: 35, maxHp: 35, type: 'slime', isDefeated: false, proximity: 1, attackDamage: 7, fast: false },
        { id: 7, x: 2, y: 6, hp: 50, maxHp: 50, type: 'troll', isDefeated: false, proximity: 2, attackDamage: 15, fast: false },
        { id: 8, x: 15, y: 11, hp: 30, maxHp: 30, type: 'crab', isDefeated: false, proximity: 2, attackDamage: 8, fast: false },
        { id: 9, x: 15, y: 12, hp: 40, maxHp: 40, type: 'crab', isDefeated: false, proximity: 2, attackDamage: 8, fast: false },
        { id: 10, x: 17, y: 6, hp: 35, maxHp: 35, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 12, fast: true },
        { id: 11, x: 2, y: 13, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true },
        { id: 12, x: 18, y: 6, hp: 25, maxHp: 25, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true },
        { id: 13, x: 2, y: 2, hp: 60, maxHp: 60, type: 'ghost', isDefeated: false, proximity: 2, attackDamage: 18, fast: false },
        { id: 14, x: 16, y: 13, hp: 100, maxHp: 100, type: 'dragon', isDefeated: false, proximity: 2, attackDamage: 30, fast: false }
      ]
    },
    dungeon: {
      width: MAP_WIDTH,
      height: MAP_HEIGHT,
      tiles: generateDungeonMap(),
      items: (() => {
        const potions = generateDungeonPotions();
        const armor = generateDungeonArmor();
        const ring = generateDungeonRing();
        console.log('Dungeon potions:', potions);
        console.log('Dungeon armor:', armor);
        console.log('Dungeon ring:', ring);
        console.log('All dungeon items:', [...potions, ...armor, ...ring]);
        return [...potions, ...armor, ...ring];
      })(),
      monsters: generateDungeonMonsters() // Dungeon specific monsters
    }
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
                        tileType !== TILE_TYPES.ROCKS;

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
      }
      return updatedStateAfterDefeat;
      
    case 'BASIC_ATTACK':
      // Calculate damage with equipment bonus
      let baseDamage = Math.floor(Math.random() * 6) + 10; // 10-15 damage
      const weaponEquipped = state.hero.equipment.weapon;
      if (weaponEquipped && EQUIPMENT_ITEMS[weaponEquipped]) {
        const weaponBonus = Math.floor(Math.random() * EQUIPMENT_ITEMS[weaponEquipped].damageBonus) + 1;
        baseDamage += weaponBonus;
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
                      battleMessage: weaponEquipped ? 
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
        if (weaponEquipped && EQUIPMENT_ITEMS[weaponEquipped]) {
          const weaponBonus = Math.floor(Math.random() * EQUIPMENT_ITEMS[weaponEquipped].damageBonus) + 1;
          strongDamage += weaponBonus;
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
        blocked = Math.random() < EQUIPMENT_ITEMS[shieldEquipped].blockChance;
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
      
      const blockMessage = blocked ? ' (BLOCKED by your shield!) (ΑΠΟΚΛΕΙΣΤΗΚΕ από την ασπίδα σας!)' : '';
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
      
      // OTHER EQUIPMENT: Check guardian
      const guardianDefeated = currentMap.monsters.find(monster => 
        monster.id === equipmentToCollect.guardedBy
      )?.isDefeated;
      
      if (!guardianDefeated) return state;
      
      return {
        ...state,
        hero: {
          ...state.hero,
          equipment: {
            ...state.hero.equipment,
            [equipmentConfig.type === 'shield' ? 'shield' : equipmentConfig.type]: equipmentToCollect.equipmentType
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
          hp: 100 // Ensure hero starts with full HP
        },
        currentMapId: 'main', // Ensure we reset to the main map
        maps: { // Re-initialize maps for a fresh start
          main: {
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            tiles: generateMap(),
            items: [...generatePotions(), ...generateEquipment()],
            monsters: [ // Main map monsters (initial state)
              { id: 1, x: 3, y: 3, hp: 40, maxHp: 40, type: 'goblin', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
              { id: 2, x: 15, y: 4, hp: 35, maxHp: 35, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 10, fast: false },
              { id: 15, x: 3, y: 5, hp: 25, maxHp: 25, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
              { id: 16, x: 16, y: 8, hp: 90, maxHp: 90, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 30, fast: false },
              { id: 17, x: 8, y: 11, hp: 20, maxHp: 20, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
              { id: 3, x: 5, y: 2, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
              { id: 4, x: 12, y: 2, hp: 45, maxHp: 45, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 12, fast: true },
              { id: 5, x: 11, y: 5, hp: 25, maxHp: 25, type: 'bat', isDefeated: false, proximity: 1, attackDamage: 5, fast: false },
              { id: 6, x: 7, y: 2, hp: 35, maxHp: 35, type: 'slime', isDefeated: false, proximity: 1, attackDamage: 7, fast: false },
              { id: 7, x: 2, y: 6, hp: 50, maxHp: 50, type: 'troll', isDefeated: false, proximity: 2, attackDamage: 15, fast: false },
              { id: 8, x: 15, y: 11, hp: 30, maxHp: 30, type: 'crab', isDefeated: false, proximity: 2, attackDamage: 8, fast: false },
              { id: 9, x: 15, y: 12, hp: 40, maxHp: 40, type: 'crab', isDefeated: false, proximity: 2, attackDamage: 8, fast: false },
              { id: 10, x: 17, y: 6, hp: 35, maxHp: 35, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 12, fast: true },
              { id: 11, x: 2, y: 13, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true },
              { id: 12, x: 18, y: 6, hp: 25, maxHp: 25, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 9, fast: true },
              { id: 13, x: 2, y: 2, hp: 60, maxHp: 60, type: 'ghost', isDefeated: false, proximity: 2, attackDamage: 18, fast: false },
              { id: 14, x: 16, y: 13, hp: 100, maxHp: 100, type: 'dragon', isDefeated: false, proximity: 2, attackDamage: 30, fast: false }
            ]
          },
          dungeon: {
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            tiles: generateDungeonMap(),
            items: [],
            monsters: generateDungeonMonsters()
          }
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
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
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