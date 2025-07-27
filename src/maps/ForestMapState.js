import { TILE_TYPES, TRAP_TYPES, EQUIPMENT_ITEMS, EQUIPMENT_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../GameState';

// Generate a dense forest map with varied terrain and structures
export function generateForestMap() {
  console.log('=== FOREST MAP GENERATION STARTED ===');
  const tiles = [];
  
  // Initialize with mostly grass and some dirt
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const rand = Math.random();
      if (rand < 0.15) {
        // 15% dirt
        row.push(rand < 0.075 ? TILE_TYPES.DIRT : TILE_TYPES.DIRT2);
      } else {
        // 85% grass
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
  
  // Create forest paths with crossroads
  // Main horizontal path
  for (let x = 2; x < 17; x++) {
    tiles[7][x] = TILE_TYPES.ROAD;
  }
  
  // Main vertical path
  for (let y = 3; y < 12; y++) {
    tiles[y][10] = TILE_TYPES.PATH;
  }
  
  // Secondary horizontal path
  for (let x = 5; x < 15; x++) {
    tiles[12][x] = TILE_TYPES.ROAD;
  }
  
  // Add crossroads at intersections
  tiles[7][10] = TILE_TYPES.CROSSROAD;  // Main intersection
  tiles[12][10] = TILE_TYPES.CROSSROAD; // Secondary intersection
  
  // Add lake with water
  for (let x = 14; x < 18; x++) {
    for (let y = 2; y < 6; y++) {
      tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
    }
  }
  
  // Add houses (4 houses as requested)
  const housePositions = [
    [3, 3], [4, 3], // House 1 (2x1)
    [3, 4], [4, 4],
    [15, 3], [16, 3], // House 2 (2x1)
    [15, 4], [16, 4],
    [3, 13], [4, 13], // House 3 (2x1)
    [3, 14], [4, 14],
    [15, 13], [16, 13] // House 4 (2x1)
  ];
  
  housePositions.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      const houseType = [TILE_TYPES.HOUSE1, TILE_TYPES.HOUSE2, TILE_TYPES.HOUSE3, TILE_TYPES.HOUSE4, TILE_TYPES.HOUSE5][index % 5];
      tiles[y][x] = houseType;
    }
  });
  
  // Add lots of trees throughout the forest
  const treePositions = [
    // Top area trees
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 2], [3, 6], [3, 7], [3, 8],
    [4, 2], [4, 6], [4, 8], [4, 9],
    [5, 2], [5, 6], [5, 8], [5, 9], [5, 10],
    [6, 2], [6, 6], [6, 8], [6, 9], [6, 10], [6, 11],
    [7, 2], [7, 6], [7, 8], [7, 9], [7, 11], [7, 12],
    [8, 2], [8, 6], [8, 8], [8, 9], [8, 11], [8, 12], [8, 13],
    [9, 2], [9, 6], [9, 8], [9, 9], [9, 11], [9, 12], [9, 13],
    [10, 6], [10, 8], [10, 9], [10, 11], [10, 12], [10, 13],
    [11, 2], [11, 6], [11, 8], [11, 9], [11, 11], [11, 12], [11, 13],
    [12, 2], [12, 6], [12, 8], [12, 9], [12, 11], [12, 13],
    [13, 2], [13, 6], [13, 8], [13, 9], [13, 11], [13, 12], [13, 13],
    [14, 2], [14, 6], [14, 8], [14, 9], [14, 11], [14, 12], [14, 13],
    [15, 2], [15, 6], [15, 8], [15, 9], [15, 11], [15, 12], [15, 13],
    [16, 2], [16, 6], [16, 8], [16, 9], [16, 11], [16, 12], [16, 13],
    [17, 2], [17, 6], [17, 8], [17, 9], [17, 11], [17, 12], [17, 13],
    [18, 6], [18, 8], [18, 9], [18, 11], [18, 12], [18, 13]
  ];
  
  treePositions.forEach(([x, y], index) => {
    if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1 && isWalkableTile(tiles[y][x])) {
      const treeType = [TILE_TYPES.TREE, TILE_TYPES.TREE2, TILE_TYPES.TREE3, TILE_TYPES.TREE4, TILE_TYPES.TREE5][index % 5];
      tiles[y][x] = treeType;
    }
  });
  
  // Add decorative flowers
  const flowerPositions = [
    [5, 5], [13, 5], [5, 9], [13, 9], [8, 4], [12, 4]
  ];
  
  flowerPositions.forEach(([x, y]) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      tiles[y][x] = TILE_TYPES.FLOWERS;
    }
  });
  
  // Add forest entrance (exit to village at 2,10)
  tiles[10][1] = TILE_TYPES.FOREST_ENTRANCE;
  
  // Add shop behind the hydra (placed last to avoid being overwritten)
  console.log('Placing shop at position (1,13), current tile:', tiles[13][1]);
  tiles[13][1] = TILE_TYPES.SHOP;
  console.log('Shop placed, new tile:', tiles[13][1]);
  
  console.log('=== FOREST MAP GENERATION COMPLETED ===');
  return tiles;
}

// Helper function to check if a tile is walkable (for placing structures)
function isWalkableTile(tileType) {
  return tileType === TILE_TYPES.GRASS || 
         tileType === TILE_TYPES.GRASS2 || 
         tileType === TILE_TYPES.STONE || 
         tileType === TILE_TYPES.STONE2 ||
         tileType === TILE_TYPES.DIRT ||
         tileType === TILE_TYPES.DIRT2;
}

// Generate healing potions on the forest map
export function generateForestPotions() {
  const potions = [];
  
  // 6 potions as requested
  const potionPositions = [
    { x: 6, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 2, y: 7, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 7, y: 13, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 14, y: 10, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 8, y: 3, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 12, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 }
  ];
  
  potionPositions.forEach((potion, index) => {
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

// Generate equipment items on the forest map
export function generateForestEquipment() {
  return [
    {
      id: 'flaming-sword-1',
      type: 'equipment',
      equipmentType: 'flamingSword',
      x: 8, // Behind the 3 trolls
      y: 8,
      isCollected: false,
      guardedBy: [1, 2, 3] // All 3 trolls must be defeated
    },
    {
      id: 'ring-1', 
      type: 'equipment',
      equipmentType: 'ring',
      x: 17, // Near the lake
      y: 9,
      isCollected: false,
      guardedBy: null // No guard
    }
  ];
}

// Generate monsters for the forest map
export function generateForestMonsters() {
  return [
    // 3 trolls (stronger as requested)
    { id: 1, x: 7, y: 8, hp: 60, maxHp: 75, type: 'troll', isDefeated: false, proximity: 2, attackDamage: 22, fast: false },
    { id: 2, x: 8, y: 7, hp: 65, maxHp: 65, type: 'troll', isDefeated: false, proximity: 2, attackDamage: 23, fast: false },
    { id: 3, x: 9, y: 8, hp: 70, maxHp: 70, type: 'troll', isDefeated: false, proximity: 2, attackDamage: 24, fast: false },
    
    // 4 wolves (25% harder hitting)
    { id: 4, x: 4, y: 5, hp: 30, maxHp: 30, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 15, fast: true },
    { id: 5, x: 10, y: 1, hp: 30, maxHp: 30, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 15, fast: true },
    { id: 6, x: 4, y: 11, hp: 30, maxHp: 30, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 15, fast: true },
    { id: 7, x: 16, y: 11, hp: 30, maxHp: 30, type: 'wolf', isDefeated: false, proximity: 1, attackDamage: 15, fast: true },
    
    // 2 spiders
    { id: 8, x: 6, y: 6, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
    { id: 9, x: 14, y: 6, hp: 30, maxHp: 30, type: 'spider', isDefeated: false, proximity: 1, attackDamage: 6, fast: false },
    
    // 2 slimes in water (25% more HP)
    { id: 10, x: 15, y: 2, hp: 44, maxHp: 44, type: 'slime', isDefeated: false, proximity: 1, attackDamage: 7, fast: false },
    { id: 11, x: 17, y: 4, hp: 44, maxHp: 44, type: 'slime', isDefeated: false, proximity: 1, attackDamage: 7, fast: false },
    
    // 2 snakes (25% harder hitting)
    { id: 12, x: 5, y: 10, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 11, fast: true },
    { id: 13, x: 15, y: 10, hp: 30, maxHp: 30, type: 'snake', isDefeated: false, proximity: 1, attackDamage: 11, fast: true },
    
    // Hydra boss (2x2 area, 145 HP, 9 heads, proximity 3) - positioned at bottom left
    { 
      id: 14, 
      x: 2, 
      y: 12, 
      hp: 145, 
      maxHp: 145, 
      type: 'hydra', 
      isDefeated: false, 
      proximity: 3, 
      attackDamage: 45, // Initial damage (will be calculated dynamically)
      fast: false, // Hero attacks first
      heads: 9, // Number of heads
      headHp: 15, // HP per head
      isBoss: true,
      size: 2 // 2x2 size
    }
  ];
}

// Create the forest map state object
export function createForestMapState() {
  console.log('=== CREATING FOREST MAP STATE ===');
  const mapState = {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateForestMap(),
    items: [...generateForestPotions(), ...generateForestEquipment()],
    traps: [], // No traps in forest
    monsters: generateForestMonsters()
  };
  console.log('=== FOREST MAP STATE CREATED ===');
  return mapState;
} 