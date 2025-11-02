import { TILE_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../constants';

// Generate the Crossroads map (18x13 grid)
export function generateCrossroadsMap() {
  const tiles = Array(13).fill(null).map(() => Array(18).fill(TILE_TYPES.GRASS));

  // 1. Columns 1-5: Completely covered by water
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }

  // 2. Column 6: 60% water (8 out of 13 tiles)
  const waterPositions6 = [0, 1, 2, 3, 4, 5, 6, 7]; // 8 water tiles
  for (let y = 0; y < 13; y++) {
    if (waterPositions6.includes(y)) {
      tiles[y][5] = TILE_TYPES.WATER;
    }
  }

  // 3. Column 7: 30% water (4 out of 13 tiles)
  const waterPositions7 = [0, 1, 2, 3]; // 4 water tiles
  for (let y = 0; y < 13; y++) {
    if (waterPositions7.includes(y)) {
      tiles[y][6] = TILE_TYPES.WATER;
    }
  }

  // 4. Add some stone tiles and trees for variety
  // Stone tiles scattered around
  const stonePositions = [
    [9, 0], [11, 1], [13, 2], [15, 3], [17, 4],
    [10, 5], [12, 6], [14, 7], [16, 8], [17, 9],
    [9, 10], [11, 11], [13, 12]
  ];
  stonePositions.forEach(([x, y]) => {
    if (x < 18 && y < 13) {
      tiles[y][x] = TILE_TYPES.STONE;
    }
  });

  // Add a few trees
  const treePositions = [
    [10, 0], [12, 1], [14, 2], [16, 3], [17, 4],
    [11, 5], [13, 6], [15, 7], [16, 8], [17, 9],
    [10, 10], [12, 11], [14, 12]
  ];
  treePositions.forEach(([x, y]) => {
    if (x < 18 && y < 13) {
      tiles[y][x] = TILE_TYPES.TREE;
    }
  });

  // 5. Column 8: Vertical road from (8,1) to (8,11) - use PATH tile for vertical roads
  for (let y = 0; y < 11; y++) {
    tiles[y][7] = TILE_TYPES.PATH;
  }

  // 6. Horizontal road from (8,9) to (16,9) - use ROAD tile for horizontal roads
  for (let x = 7; x < 16; x++) {
    tiles[8][x] = TILE_TYPES.ROAD;
  }

  // 7. Crossroad at (8,9) - intersection of vertical and horizontal roads
  tiles[8][7] = TILE_TYPES.CROSSROAD;

  // 8. Exit back to Village at (17,9)
  tiles[8][16] = TILE_TYPES.VILLAGE_ENTRANCE;

  // 9. Troll Castle entrance at (8,13)
  tiles[12][7] = TILE_TYPES.TROLL_CASTLE_ENTRANCE;

  // 10. Shop moved 11 spaces to the left - now at (7,13) in 1-based indexing
  tiles[12][6] = TILE_TYPES.SHOP;

  // 11. Dangerous Area entrance next to the 'Dangerous area' sign at (8,1) 1-based => (7,0) 0-based
  tiles[0][8] = TILE_TYPES.DANGEROUS_AREA_ENTRANCE;

  return tiles;
}

// Generate monsters for the Crossroads (dangerous wolves and spiders)
export function generateCrossroadsMonsters() {
  return [
    // Large wolf (2x2 size) at position (16,2) - 17,2, 16,3, 17,3
    { 
      id: 401, 
      x: 15, 
      y: 1, 
      hp: 140, 
      maxHp: 140, 
      type: 'large wolf', 
      isDefeated: false, 
      proximity: 2, // Large wolf has proximity 2
      attackDamage: Math.floor(Math.random() * 16) + 25, // Random 25-40 damage
      fast: true,
      size: 2 // 2x2 size
    },
    
    // Large spider (2x2 size) at position (9,11) - 10,11, 9,12, 10,12
    { 
      id: 406, 
      x: 8, 
      y: 10, 
      hp: 115, 
      maxHp: 115, 
      type: 'large spider', 
      isDefeated: false, 
      proximity: 2, // Large spider has proximity 2
      attackDamage: Math.floor(Math.random() * 11) + 20, // Random 20-30 damage
      fast: false,
      size: 2, // 2x2 size
      hasPoison: true // Poison attack
    },
    
    // Regular wolves (25% stronger than village wolves)
    // Village wolf: 45 HP, 12 damage, fast: true
    // Crossroads wolf: 56 HP (45 * 1.25), 15 damage (12 * 1.25), fast: true
    { 
      id: 402, 
      x: 13, 
      y: 1, 
      hp: 56, 
      maxHp: 56, 
      type: 'wolf', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 15, 
      fast: true 
    },
    { 
      id: 403, 
      x: 13, 
      y: 3, 
      hp: 56, 
      maxHp: 56, 
      type: 'wolf', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 15, 
      fast: true 
    },
    { 
      id: 404, 
      x: 14, 
      y: 3, 
      hp: 56, 
      maxHp: 56, 
      type: 'wolf', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 15, 
      fast: true 
    },
    { 
      id: 405, 
      x: 17, 
      y: 3, 
      hp: 56, 
      maxHp: 56, 
      type: 'wolf', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 15, 
      fast: true 
    },
    
    // Enhanced spiders (25% stronger than regular spiders)
    // Regular spider: 40 HP, 10 damage
    // Crossroads spider: 50 HP (40 * 1.25), 13 damage (10 * 1.25)
    { 
      id: 407, 
      x: 11, 
      y: 11, 
      hp: 50, 
      maxHp: 50, 
      type: 'spider', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 13, 
      fast: false 
    },
    { 
      id: 408, 
      x: 11, 
      y: 10, 
      hp: 50, 
      maxHp: 50, 
      type: 'spider', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 13, 
      fast: false 
    },
    { 
      id: 409, 
      x: 9, 
      y: 9, 
      hp: 50, 
      maxHp: 50, 
      type: 'spider', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 13, 
      fast: false 
    },
    { 
      id: 410, 
      x: 9, 
      y: 7, 
      hp: 50, 
      maxHp: 50, 
      type: 'spider', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: 13, 
      fast: false 
    }
  ];
}

// Generate potions for the Crossroads (stronger than regular ones)
export function generateCrossroadsPotions() {
  return [
    { 
      id: 501, 
      x: 12, 
      y: 0, 
      type: 'healingPotion', 
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false 
    },
    { 
      id: 502, 
      x: 12, 
      y: 6, 
      type: 'healingPotion', 
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false 
    },
    { 
      id: 504, 
      x: 13, 
      y: 12, 
      type: 'healingPotion', 
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false 
    },
    { 
      id: 505, 
      x: 9, 
      y: 12, 
      type: 'healingPotion', 
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false 
    }
  ];
}

// Generate gold treasures for the Crossroads
export function generateCrossroadsGold() {
  return [
    // Gold treasure
    { 
      id: 601, 
      x: 17, 
      y: 0, 
      type: 'gold', 
      isCollected: false,
      amount: 5
    }
  ];
}

// Generate Book of Knowledge for the Crossroads
export function generateCrossroadsBooks() {
  return [
    // Book of Knowledge
    { 
      id: 701, 
      x: 17, 
      y: 6, 
      type: 'book', 
      isCollected: false,
      bookType: 'crossroads'
    },
    // Second Book of Knowledge - Capital Cities
    { 
      id: 702, 
      x: 15, 
      y: 12, 
      type: 'book', 
      isCollected: false,
      bookType: 'crossroadsCapitals'
    }
  ];
}

// Generate equipment for the Crossroads (empty - no equipment)
export function generateCrossroadsEquipment() {
  return [];
}

// Generate boats for the Crossroads (2x2 size)
export function generateCrossroadsBoats() {
  return [
    { id: 401, x: 5, y: 2, type: 'boat', isCollected: false, size: 2 }, // Boat at (6,3) - goes to Treasure Island
    { id: 402, x: 3, y: 10, type: 'boat', isCollected: true, size: 2 }  // Boat at (4,11) - DEACTIVATED (leads to another place)
  ];
}

// Generate road signs for the Crossroads
export function generateCrossroadsRoadSigns() {
  return [
    { 
      id: 501, 
      x: 7, 
      y: 0, 
      type: 'roadSign', 
      isCollected: false,
      text: "Dangerous area (Επικίνδυνη περιοχή)"
    },
    { 
      id: 502, 
      x: 8, 
      y: 12, 
      type: 'roadSign', 
      isCollected: false,
      text: "Troll Castle (Κάστρο Τρολ)"
    },
    { 
      id: 503, 
      x: 6, 
      y: 4, 
      type: 'roadSign', 
      isCollected: false,
      text: "Treasure Island (Νησί Θησαυρού)"
    },
    { 
      id: 504, 
      x: 5, 
      y: 11, 
      type: 'roadSign', 
      isCollected: false,
      text: "Dangerous island (Επικίνδυνο νησί)"
    },
    { 
      id: 505, 
      x: 16, 
      y: 9, 
      type: 'roadSign', 
      isCollected: false,
      text: "Back to the village (Επιστροφή στο χωριό)"
    }
  ];
}

// Generate traps for the Crossroads (empty - no traps)
export function generateCrossroadsTraps() {
  return [];
}

// Generate shop inventory for the Crossroads (proper pricing)
export function generateCrossroadsShop() {
  return {
    isOpen: false,
    inventory: [
      {
        id: 'portablePotion',
        name: 'Portable Healing Potion',
        type: 'portablePotion',
        price: 3, // Regular price
        healAmount: 50
      },
      {
        id: 'dungeonArmor',
        name: 'Dungeon Armor',
        type: 'dungeonArmor',
        price: 6, // Regular price for armor
        defense: 2
      }
    ]
  };
}

// Crossroads map state
export function createCrossroadsMapState() {
  return {
    id: 'crossroads',
    name: 'Crossroads',
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateCrossroadsMap(),
    monsters: generateCrossroadsMonsters(),
    items: [
      ...generateCrossroadsPotions(),
      ...generateCrossroadsEquipment(),
      ...generateCrossroadsBoats(),
      ...generateCrossroadsRoadSigns(),
      ...generateCrossroadsGold(),
      ...generateCrossroadsBooks()
    ],
    traps: generateCrossroadsTraps(),
    shop: generateCrossroadsShop(),
    heroStartX: 17,
    heroStartY: 11
  };
} 