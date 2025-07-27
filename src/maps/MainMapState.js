import { TILE_TYPES, TRAP_TYPES, EQUIPMENT_ITEMS, EQUIPMENT_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../GameState';

// Generate a rich medieval village with varied terrain and structures
export function generateMap() {
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
  
  // Add forest entrance (village square at 18,4)
  tiles[4][18] = TILE_TYPES.FOREST_ENTRANCE;
  
  return tiles;
}

// Helper function to check if a tile is walkable (for placing structures)
function isWalkableTile(tileType) {
  return tileType === TILE_TYPES.GRASS || 
         tileType === TILE_TYPES.GRASS2 || 
         tileType === TILE_TYPES.STONE || 
         tileType === TILE_TYPES.STONE2;
}

// Generate healing potions on the map
export function generatePotions() {
  const potions = [];
  
  // 2 potions behind monsters (in areas that require defeating monsters to reach)
  const behindMonsterPositions = [
    { x: 1, y: 4, healAmount: Math.floor(Math.random() * 41) + 30 }, // Behind goblin area
    { x: 18, y: 5, healAmount: Math.floor(Math.random() * 41) + 30 }  // Behind skeleton area
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

// Generate equipment items on the map (next to specific monsters)
export function generateEquipment() {
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

// Generate traps for the main map
export function generateMainTraps() {
  const traps = [];
  
  // 2 damage traps
  const damageTrapPositions = [
    { x: 8, y: 4, damage: Math.floor(Math.random() * 7) + 2 }, // 2-8 damage
    { x: 12, y: 13, damage: Math.floor(Math.random() * 7) + 2 } // 2-8 damage
  ];
  
  // 1 teleport trap
  const teleportTrapPosition = { x: 6, y: 7, targetX: 18, targetY: 9 };
  
  // Add damage traps
  damageTrapPositions.forEach((trap, index) => {
    traps.push({
      id: `damage-${index + 1}`,
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
    id: 'teleport-1',
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

// Generate monsters for the main map
export function generateMainMonsters() {
  return [
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
  ];
}

// Create the main map state object
export function createMainMapState() {
  return {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateMap(),
    items: [...generatePotions(), ...generateEquipment()],
    traps: generateMainTraps(),
    monsters: generateMainMonsters()
  };
} 