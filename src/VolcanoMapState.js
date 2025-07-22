import { TILE_TYPES, TRAP_TYPES, EQUIPMENT_ITEMS, EQUIPMENT_TYPES, MAP_WIDTH, MAP_HEIGHT } from './GameState';

// Generate the volcano map
export function generateVolcanoMap() {
  const tiles = [];

  // Initialize with mostly stone and dirt tiles
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const rand = Math.random();
      if (rand < 0.2) {
        // 20% dirt
        row.push(rand < 0.1 ? TILE_TYPES.DIRT : TILE_TYPES.DIRT2);
      } else {
        // 80% stone variations
        row.push(rand < 0.4 ? TILE_TYPES.STONE : TILE_TYPES.STONE2);
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

  // Add fire areas (30% of the map, impassable)
  // Central fire pit
  for (let x = 8; x < 12; x++) {
    for (let y = 6; y < 9; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  // Additional fire areas
  for (let x = 3; x < 6; x++) {
    for (let y = 3; y < 6; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  for (let x = 14; x < 17; x++) {
    for (let y = 3; y < 6; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  for (let x = 5; x < 8; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  for (let x = 12; x < 15; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }

  // Add dungeon walls for structure
  // Horizontal walls
  for (let x = 6; x < 9; x++) {
    tiles[4][x] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let x = 11; x < 14; x++) {
    tiles[9][x] = TILE_TYPES.DUNGEON_WALL;
  }
  
  // Vertical walls
  for (let y = 7; y < 10; y++) {
    tiles[y][6] = TILE_TYPES.DUNGEON_WALL;
  }
  for (let y = 7; y < 10; y++) {
    tiles[y][13] = TILE_TYPES.DUNGEON_WALL;
  }

  // Add rocks for decoration
  const rockPositions = [
    [2, 2], [17, 2], [2, 13], [17, 13], [9, 2], [9, 13]
  ];
  rockPositions.forEach(([x, y]) => {
    if (tiles[y] && tiles[y][x] && isWalkableTile(tiles[y][x])) {
      tiles[y][x] = TILE_TYPES.ROCKS;
    }
  });

  // Volcano Exit (back to main map)
  tiles[2][16] = TILE_TYPES.VOLCANO_ENTRANCE;

  return tiles;
}

// Helper function to check if a tile is walkable (for placing structures)
function isWalkableTile(tileType) {
  return tileType === TILE_TYPES.GRASS || 
         tileType === TILE_TYPES.GRASS2 || 
         tileType === TILE_TYPES.STONE || 
         tileType === TILE_TYPES.STONE2;
}

// Generate monsters for the volcano
export function generateVolcanoMonsters() {
  return [
    // New volcano monsters (2-3 each as requested)
    { id: 301, x: 4, y: 3, hp: 45, maxHp: 45, type: 'black imp', isDefeated: false, proximity: 1, attackDamage: 11, fast: false },
    { id: 302, x: 15, y: 3, hp: 45, maxHp: 45, type: 'black imp', isDefeated: false, proximity: 1, attackDamage: 13, fast: false },
    { id: 303, x: 7, y: 11, hp: 45, maxHp: 45, type: 'black imp', isDefeated: false, proximity: 1, attackDamage: 12, fast: false },
    
    { id: 304, x: 3, y: 7, hp: 40, maxHp: 40, type: 'red imp', isDefeated: false, proximity: 1, attackDamage: 11, fast: true },
    { id: 305, x: 16, y: 7, hp: 40, maxHp: 40, type: 'red imp', isDefeated: false, proximity: 1, attackDamage: 13, fast: true },
    { id: 306, x: 10, y: 12, hp: 40, maxHp: 40, type: 'red imp', isDefeated: false, proximity: 1, attackDamage: 12, fast: true },
    
    { id: 307, x: 8, y: 3, hp: 80, maxHp: 80, type: 'golem', isDefeated: false, proximity: 2, attackDamage: 22, fast: false },
    { id: 308, x: 12, y: 2, hp: 80, maxHp: 80, type: 'golem', isDefeated: false, proximity: 2, attackDamage: 23, fast: false },
    { id: 309, x: 17, y: 12, hp: 80, maxHp: 80, type: 'golem', isDefeated: false, proximity: 2, attackDamage: 21, fast: false },
    
    // Additional monsters as requested
    { id: 310, x: 5, y: 8, hp: 40, maxHp: 40, type: 'goblin', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
    { id: 311, x: 13, y: 6, hp: 40, maxHp: 40, type: 'goblin', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
    
    { id: 312, x: 2, y: 2, hp: 100, maxHp: 100, type: 'dragon', isDefeated: false, proximity: 2, attackDamage: 30, fast: false },
    
    { id: 313, x: 2, y: 3, hp: 25, maxHp: 25, type: 'bat', isDefeated: false, proximity: 1, attackDamage: 5, fast: false },
    { id: 314, x: 3, y: 2, hp: 25, maxHp: 25, type: 'bat', isDefeated: false, proximity: 1, attackDamage: 5, fast: false },
    { id: 315, x: 9, y: 11, hp: 25, maxHp: 25, type: 'bat', isDefeated: false, proximity: 1, attackDamage: 5, fast: false }
  ];
}

// Generate healing potions for the volcano
export function generateVolcanoPotions() {
  const potions = [];
  
  // 5 potions in the volcano as requested
  const potionPositions = [
    { x: 2, y: 4, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 17, y: 4, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 2, y: 11, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 18, y: 13, healAmount: Math.floor(Math.random() * 41) + 30 },
    { x: 9, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 }
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

// Generate equipment items for the volcano
export function generateVolcanoEquipment() {
  return [
    {
      id: 'axe-1',
      type: 'equipment',
      equipmentType: 'axe',
      x: 1, // Position (1,1) as requested
      y: 1,
      isCollected: false,
      guardedBy: 312 // Dragon at (2,2) - ID 312
    },
    {
      id: 'magicShield-1',
      type: 'equipment',
      equipmentType: 'magicShield',
      x: 9, // Position (9,12) as requested
      y: 12,
      isCollected: false,
      guardedBy: 309 // Golem at (17,12) - ID 309
    }
  ];
}

// Generate traps for the volcano
export function generateVolcanoTraps() {
  const traps = [];
  
  // 2 damage traps
  const damageTrapPositions = [
    { x: 7, y: 4, damage: Math.floor(Math.random() * 7) + 2 }, // 2-8 damage
    { x: 12, y: 6, damage: Math.floor(Math.random() * 7) + 2 } // 2-8 damage
  ];
  
  // 1 teleport trap
  const teleportTrapPosition = { x: 8, y: 5, targetX: 12, targetY: 7 };
  
  // Add damage traps
  damageTrapPositions.forEach((trap, index) => {
    traps.push({
      id: `volcano-damage-${index + 1}`,
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
    id: 'volcano-teleport-1',
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

// Create the volcano map state object
export function createVolcanoMapState() {
  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateVolcanoMap(),
    items: [...generateVolcanoPotions(), ...generateVolcanoEquipment()],
    traps: generateVolcanoTraps(),
    monsters: generateVolcanoMonsters()
  };
} 