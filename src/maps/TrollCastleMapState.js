import { TILE_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../constants';

// Generate the Troll Castle map (18x13 grid)
export function generateTrollCastleMap() {
  const tiles = Array(13).fill(null).map(() => Array(18).fill(TILE_TYPES.GRASS));

  // Create a 10x8 castle in the center of the map
  // Castle position: starting at (4,2) to center it nicely
  const castleStartX = 4;
  const castleStartY = 2;
  const castleWidth = 10;
  const castleHeight = 8;

  // Create the castle perimeter with dungeon walls
  // Top wall (row 2)
  for (let x = castleStartX; x < castleStartX + castleWidth; x++) {
    tiles[castleStartY][x] = TILE_TYPES.DUNGEON_WALL;
  }
  
  // Bottom wall (row 9)
  for (let x = castleStartX; x < castleStartX + castleWidth; x++) {
    tiles[castleStartY + castleHeight - 1][x] = TILE_TYPES.DUNGEON_WALL;
  }
  
  // Left wall (column 4) - with entrance gap
  for (let y = castleStartY; y < castleStartY + castleHeight; y++) {
    if (y !== castleStartY + 3 && y !== castleStartY + 4) { // Leave gap at positions 5,6 (1-based)
      tiles[y][castleStartX] = TILE_TYPES.DUNGEON_WALL;
    }
  }
  
  // Right wall (column 13) - with entrance gap
  for (let y = castleStartY; y < castleStartY + castleHeight; y++) {
    if (y !== castleStartY + 3 && y !== castleStartY + 4) { // Leave gap at positions 5,6 (1-based)
      tiles[y][castleStartX + castleWidth - 1] = TILE_TYPES.DUNGEON_WALL;
    }
  }

  // Fill the inside of the castle with stone tiles
  for (let x = castleStartX + 1; x < castleStartX + castleWidth - 1; x++) {
    for (let y = castleStartY + 1; y < castleStartY + castleHeight - 1; y++) {
      tiles[y][x] = TILE_TYPES.STONE;
    }
  }

  // Add return transition to Crossroads at (1,2)
  tiles[1][0] = TILE_TYPES.CROSSROADS_ENTRANCE;

  return tiles;
}

// Generate monsters for Troll Castle
export function generateTrollCastleMonsters() {
  return [
    // Troll Chieftain (3x3 size) at position (8,5) - covers (8,5), (9,5), (10,5), (8,6), (9,6), (10,6), (8,7), (9,7), (10,7)
    { 
      id: 501, 
      x: 7, // 8 in 1-based = 7 in 0-based
      y: 4, // 5 in 1-based = 4 in 0-based
      hp: 300, 
      maxHp: 300, 
      type: 'Troll Chieftain', 
      isDefeated: false, 
      proximity: 2, // Troll Chieftain has proximity 2
      attackDamage: Math.floor(Math.random() * 21) + 30, // Random 30-50 damage
      fast: true,
      size: 3, // 3x3 size
      doubleDamageChance: 0.2 // 20% chance for double damage
    },
    // 7 Regular trolls around the castle grounds (HP 90, damage 25-35)
    { id: 511, x: 2, y: 2, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 512, x: 15, y: 2, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 513, x: 3, y: 10, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 514, x: 14, y: 10, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 515, x: 6, y: 1, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 516, x: 11, y: 1, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    { id: 517, x: 9, y: 11, hp: 90, maxHp: 90, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 25, fast: false },
    // Large Troll (2x2) guarding the freezing bomb (HP 150, damage 30-40)
    { id: 530, x: 16, y: 11, hp: 150, maxHp: 150, type: 'troll', isDefeated: false, proximity: 1, attackDamage: Math.floor(Math.random() * 11) + 30, fast: false, size: 2, isBoss: true }
  ];
}

// Generate items for Troll Castle
export function generateTrollCastleItems() {
  return [
    // Healing potion at (3,3)
    { 
      id: 601, 
      x: 2, // 3 in 1-based = 2 in 0-based
      y: 2, // 3 in 1-based = 2 in 0-based
      type: 'healingPotion', 
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP (same as Crossroads)
      isCollected: false 
    },
    // 6 more healing potions in open areas
    { id: 602, x: 1, y: 10, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    { id: 603, x: 4, y: 1, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    { id: 604, x: 16, y: 3, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    { id: 605, x: 12, y: 11, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    { id: 606, x: 7, y: 12, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    { id: 607, x: 10, y: 3, type: 'healingPotion', healAmount: Math.floor(Math.random() * 41) + 40, isCollected: false },
    // Freezing Bomb at bottom-right corner, guarded by Large Troll (id: 530)
    { id: 650, x: 17, y: 12, type: 'freezingBomb', name: 'Παγωτική Βόμβα', freezeTurns: 5, isCollected: false, guardedBy: 530 }
  ];
}

// Generate traps for Troll Castle (empty for now)
export function generateTrollCastleTraps() {
  return [];
}

// Create Troll Castle map state
export function createTrollCastleMapState() {
  return {
    tiles: generateTrollCastleMap(),
    monsters: generateTrollCastleMonsters(),
    items: generateTrollCastleItems(),
    traps: generateTrollCastleTraps(),
    heroStartX: 0, // Land at (1,1) in 1-based = (0,0) in 0-based
    heroStartY: 0,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    name: 'Troll Castle'
  };
} 