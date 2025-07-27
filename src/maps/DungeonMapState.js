import { TILE_TYPES, TRAP_TYPES, EQUIPMENT_ITEMS, EQUIPMENT_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../GameState';

// Generate the dungeon map
export function generateDungeonMap() {
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

  // Add volcano entrance at position (6,5) as requested
  tiles[5][6] = TILE_TYPES.VOLCANO_ENTRANCE;
  
  // Dungeon Exit (same as entrance for now)
  tiles[2][16] = TILE_TYPES.DUNGEON_ENTRANCE; // This will be the exit back to main map

  return tiles;
}

// Generate monsters for the dungeon
export function generateDungeonMonsters() {
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

// Generate healing potions for the dungeon
export function generateDungeonPotions() {
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
export function generateDungeonArmor() {
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

export function generateDungeonRing() {
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

// Generate traps for the dungeon
export function generateDungeonTraps() {
  const traps = [];
  
  // 2 damage traps
  const damageTrapPositions = [
    { x: 3, y: 1, damage: Math.floor(Math.random() * 7) + 2 }, // 2-8 damage
    { x: 1, y: 2, damage: Math.floor(Math.random() * 7) + 2 } // 2-8 damage
  ];
  
  // 1 teleport trap
  const teleportTrapPosition = { x: 18, y: 9, targetX: 4, targetY: 13 };
  
  // Add damage traps
  damageTrapPositions.forEach((trap, index) => {
    traps.push({
      id: `dungeon-damage-${index + 1}`,
      type: 'trap',
      trapType: TRAP_TYPES.DAMAGE,
      x: trap.x,
      y: trap.y,
      damage: trap.damage,
      isActivated: false
    });
  });
  
  // Add teleport trap
  traps.push({
    id: 'dungeon-teleport-1',
    type: 'trap',
    trapType: TRAP_TYPES.TELEPORT,
    x: teleportTrapPosition.x,
    y: teleportTrapPosition.y,
    targetX: teleportTrapPosition.targetX,
    targetY: teleportTrapPosition.targetY,
    isActivated: false
  });
  
  return traps;
}

// Create the dungeon map state object
export function createDungeonMapState() {
  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateDungeonMap(),
    items: [...generateDungeonPotions(), ...generateDungeonArmor(), ...generateDungeonRing()],
    traps: generateDungeonTraps(),
    monsters: generateDungeonMonsters()
  };
} 