import { TILE_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../constants';

// Generate the Treasure Island map (18x13 grid)
export function generateTreasureIslandMap() {
  const tiles = Array(13).fill(null).map(() => Array(18).fill(TILE_TYPES.GRASS));

  // Create fixed coastline (not random) - 1-3 tiles of water on each side
  const waterBorder = {
    top: 2,    // Fixed: 2 tiles
    bottom: 2,  // Fixed: 2 tiles
    left: 2,    // Fixed: 2 tiles
    right: 2    // Fixed: 2 tiles
  };

  // Fill water borders
  // Top border
  for (let x = 0; x < 18; x++) {
    for (let y = 0; y < waterBorder.top; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }

  // Bottom border
  for (let x = 0; x < 18; x++) {
    for (let y = 13 - waterBorder.bottom; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }

  // Left border
  for (let x = 0; x < waterBorder.left; x++) {
    for (let y = 0; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }

  // Right border
  for (let x = 18 - waterBorder.right; x < 18; x++) {
    for (let y = 0; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }

  // Add boat in the sea at 16,4 16,5 17,4 17,5 (1-based = 15,3 15,4 16,3 16,4 in 0-based)
  // Note: Boat is now added as an item, not a tile

  // Add small island at 1,12 1,13 2,11 2,12 2,13 (1-based = 0,11 0,12 1,10 1,11 1,12 in 0-based)
  tiles[11][0] = TILE_TYPES.GRASS;
  tiles[12][0] = TILE_TYPES.GRASS;
  tiles[10][1] = TILE_TYPES.GRASS;
  tiles[11][1] = TILE_TYPES.STONE; // One stone tile as requested
  tiles[12][1] = TILE_TYPES.GRASS;

  // Add water tiles at (3,10) and (3,11) (1-based = 2,9 and 2,10 in 0-based)
  tiles[9][2] = TILE_TYPES.WATER;  // (3,10) in 1-based
  tiles[10][2] = TILE_TYPES.WATER; // (3,11) in 1-based

  // Add specified stone/grass tiles (1-based to 0-based conversion)
  // Top area: (3,3) (3,2) (4,3) (5,3) (5,2) (6,3) (8,3) (8,2)(9,3)(9,2)(10,3)
  const topTiles = [
    [2, 2], [2, 1], [3, 2], [4, 2], [4, 1], [5, 2], [7, 2], [7, 1], [8, 2], [8, 1], [9, 2]
  ];
  
  // Bottom area: (4,12) (5,12) (9,12) (11,12)
  const bottomTiles = [
    [3, 11], [4, 11], [8, 11], [10, 11]
  ];

  // Add stone tiles (reduced number for more grass)
  const stoneTiles = [
    [2, 2], [4, 2], [7, 2], [8, 2], // Only 4 stone tiles from top area
    [3, 11], [8, 11] // Only 2 stone tiles from bottom area
  ];

  stoneTiles.forEach(([x, y]) => {
    if (x < 18 && y < 13) {
      tiles[y][x] = TILE_TYPES.STONE;
    }
  });

  // Add specified green tiles (1-based to 0-based conversion)
  // (3,4) (3,7) (3,8) (8,2) (9,2) (10,2) (11,2)
  const greenTiles = [
    [2, 3], // (3,4) in 1-based
    [2, 6], // (3,7) in 1-based
    [2, 7], // (3,8) in 1-based
    [7, 1], // (8,2) in 1-based
    [8, 1], // (9,2) in 1-based
    [9, 1], // (10,2) in 1-based
    [10, 1] // (11,2) in 1-based
  ];

  greenTiles.forEach(([x, y]) => {
    if (x < 18 && y < 13) {
      tiles[y][x] = TILE_TYPES.GRASS;
    }
  });

  // Add some additional stone tiles scattered around the island for variety (reduced)
  const additionalStonePositions = [
    [waterBorder.left + 2, waterBorder.top + 2],
    [waterBorder.left + 8, waterBorder.top + 1],
    [waterBorder.left + 15, waterBorder.top + 2],
    [waterBorder.left + 7, waterBorder.top + 8],
    [waterBorder.left + 14, waterBorder.top + 9],
    [waterBorder.left + 4, 13 - waterBorder.bottom - 3],
    [waterBorder.left + 13, 13 - waterBorder.bottom - 4]
  ];

  additionalStonePositions.forEach(([x, y]) => {
    if (x < 18 - waterBorder.right && y < 13 - waterBorder.bottom) {
      tiles[y][x] = TILE_TYPES.STONE;
    }
  });

  // Add a few trees for decoration
  const treePositions = [
    [waterBorder.left + 1, waterBorder.top + 4],
    [waterBorder.left + 6, waterBorder.top + 5],
    [waterBorder.left + 10, waterBorder.top + 2],
    [waterBorder.left + 15, waterBorder.top + 6],
    [waterBorder.left + 2, 13 - waterBorder.bottom - 2],
    [waterBorder.left + 8, 13 - waterBorder.bottom - 3],
    [waterBorder.left + 12, 13 - waterBorder.bottom - 1]
  ];

  treePositions.forEach(([x, y]) => {
    if (x < 18 - waterBorder.right && y < 13 - waterBorder.bottom) {
      tiles[y][x] = TILE_TYPES.TREE;
    }
  });

  return tiles;
}

// Generate monsters for Treasure Island
export function generateTreasureIslandMonsters() {
  return [
    // 7 Pirates (80 HP, 30-35 damage, fast)
    { 
      id: 701, 
      x: 3, 
      y: 4, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 702, 
      x: 5, 
      y: 6, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 703, 
      x: 6, 
      y: 9, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 704, 
      x: 9, 
      y: 5, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 705, 
      x: 11, 
      y: 5, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 713, 
      x: 4, 
      y: 7, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    { 
      id: 714, 
      x: 12, 
      y: 8, 
      hp: 80, 
      maxHp: 80, 
      type: 'pirate', 
      isDefeated: false, 
      proximity: 1, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false 
    },
    
    // 1 Pirate Captain (160 HP, 30-35 damage with 25% chance for double damage, uses spear)
    { 
      id: 706, 
      x: 3, 
      y: 9, 
      hp: 160, 
      maxHp: 160, 
      type: 'pirate_captain', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: Math.floor(Math.random() * 6) + 30, // 30-35 damage
      fast: false,
      hasDoubleDamage: true, // 25% chance for double damage
      doubleDamageChance: 0.25,
      hasSpear: true // Uses spear weapon
    },
    
    // 3 Enhanced Crabs (50% stronger than village crabs: 45-60 HP, 22 damage)
    { 
      id: 707, 
      x: 4, 
      y: 3, 
      hp: 45, 
      maxHp: 45, 
      type: 'crab', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 22, 
      fast: false 
    },
    { 
      id: 708, 
      x: 6, 
      y: 5, 
      hp: 50, 
      maxHp: 50, 
      type: 'crab', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 22, 
      fast: false 
    },
    { 
      id: 709, 
      x: 10, 
      y: 6, 
      hp: 55, 
      maxHp: 55, 
      type: 'crab', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 22, 
      fast: false 
    },
    
    // 3 Enhanced Slimes (50% stronger than village slime: 52-53 HP, 25 damage, proximity 2)
    { 
      id: 710, 
      x: 1, 
      y: 1, 
      hp: 52, 
      maxHp: 52, 
      type: 'slime', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 25, 
      fast: false 
    },
    { 
      id: 711, 
      x: 16, 
      y: 1, 
      hp: 53, 
      maxHp: 53, 
      type: 'slime', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 25, 
      fast: false 
    },
    { 
      id: 712, 
      x: 2, 
      y: 9, 
      hp: 52, 
      maxHp: 52, 
      type: 'slime', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 25, 
      fast: false 
    }
  ];
}

// Generate items for Treasure Island (boat, gold, spear, and potions)
export function generateTreasureIslandItems() {
  return [
    // Return boat to Crossroads
    {
      id: 601,
      x: 15, // 16,4 in 1-based
      y: 3,  // 16,4 in 1-based
      type: 'boat',
      name: 'Boat to Crossroads',
      size: 2,
      isCollected: false
    },
    // Gold item
    {
      id: 602,
      x: 8,  // 9,6 in 1-based = 8,5 in 0-based
      y: 5,  // 9,6 in 1-based = 8,5 in 0-based
      type: 'gold',
      amount: 1,
      isCollected: false
    },
    // 8 Gold coins at (4,11) - 0-based = (3,10)
    {
      id: 603,
      x: 3,
      y: 10,
      type: 'gold',
      amount: 8,
      isCollected: false
    },
    // Spear weapon at (4,12) - 0-based = (3,11)
    {
      id: 604,
      x: 3,
      y: 11,
      type: 'equipment',
      equipmentType: 'spear',
      isCollected: false,
      guardedBy: 706 // Pirate captain monster id
    },
    // 4 Healing potions (similar to crossroads - 40-80 HP)
    {
      id: 605,
      x: 3,
      y: 4,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false
    },
    {
      id: 606,
      x: 6,
      y: 6,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false
    },
    {
      id: 607,
      x: 9,
      y: 4,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false
    },
    {
      id: 608,
      x: 12,
      y: 7,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40, // Random 40-80 HP
      isCollected: false
    },
    // 1 Portable healing potion
    {
      id: 609,
      x: 5,
      y: 8,
      type: 'portablePotion',
      healAmount: 50,
      isCollected: false
    },
    // Additional healing potions to ease difficulty
    {
      id: 610,
      x: 2,
      y: 6,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40, // 40-80 HP
      isCollected: false
    },
    {
      id: 611,
      x: 7,
      y: 2,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40,
      isCollected: false
    },
    {
      id: 612,
      x: 10,
      y: 10,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40,
      isCollected: false
    },
    {
      id: 613,
      x: 13,
      y: 4,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40,
      isCollected: false
    },
    {
      id: 614,
      x: 15,
      y: 8,
      type: 'healingPotion',
      healAmount: Math.floor(Math.random() * 41) + 40,
      isCollected: false
    },
    // Book of knowledge near the pirate captain, readable after captain defeated
    {
      id: 690,
      x: 4, // near (3,9) pirate captain
      y: 9,
      type: 'book',
      name: 'Βιβλίο της Γνώσης - Παγωτική Βόμβα',
      bookType: 'treasureFrozenBomb',
      isCollected: false,
      requiresMonsterDefeated: 706 // pirate captain id
    }
  ];
}

// Generate traps for Treasure Island (empty - no traps)
export function generateTreasureIslandTraps() {
  return [];
}

// Create Treasure Island map state
export function createTreasureIslandMapState() {
  const tiles = generateTreasureIslandMap();
  
  // Find the boat position for the return boat
  let boatX = 9, boatY = 6; // Default position
  for (let y = 0; y < 13; y++) {
    for (let x = 0; x < 18; x++) {
      if (tiles[y][x] === TILE_TYPES.BOAT) {
        boatX = x;
        boatY = y;
        break;
      }
    }
  }

  return {
    tiles: tiles,
    monsters: generateTreasureIslandMonsters(),
    items: generateTreasureIslandItems(),
    traps: generateTreasureIslandTraps(),
    heroStartX: 14, // Land at (15,4) in 1-based = (14,3) in 0-based
    heroStartY: 3,  // Land at (15,4) in 1-based = (14,3) in 0-based
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    name: 'Treasure Island'
  };
} 