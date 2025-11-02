import { TILE_TYPES, TRAP_TYPES, EQUIPMENT_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../constants';
import { EQUIPMENT_ITEMS } from '../GameState';

// Generate the dungeon level 2 map
export function generateDungeonLevel2Map() {
  const tiles = [];

  // Initialize with mostly stone tiles and some dirt (same as dungeon)
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

  // Add dungeon walls (impassable) - similar to dungeon but with some fire areas
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

  // Add fire areas (new feature for dungeon level 2)
  // Central fire pit
  for (let x = 8; x < 12; x++) {
    for (let y = 6; y < 9; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  // Additional fire areas (avoiding castle areas)
  for (let x = 2; x < 5; x++) {
    for (let y = 2; y < 5; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  for (let x = 15; x < 18; x++) {
    for (let y = 2; y < 5; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  // Bottom fire areas (avoiding castle at 11,14)
  for (let x = 2; x < 5; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }
  
  // Right side fire area (avoiding castle)
  for (let x = 15; x < 18; x++) {
    for (let y = 10; y < 13; y++) {
      tiles[y][x] = TILE_TYPES.FIRE;
    }
  }

  // Add a couple of water areas in the dungeon (same as dungeon)
  for (let x = 3; x < 6; x++) {
    for (let y = 5; y < 8; y++) {
      if (tiles[y][x] !== TILE_TYPES.FIRE) { // Don't override fire tiles
        tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
      }
    }
  }
  for (let x = 12; x < 15; x++) {
    for (let y = 10; y < 13; y++) {
      if (tiles[y][x] !== TILE_TYPES.FIRE) { // Don't override fire tiles
        tiles[y][x] = (x + y) % 2 === 0 ? TILE_TYPES.WATER : TILE_TYPES.WATER2;
      }
    }
  }

  // Add two castles
  tiles[3][3] = TILE_TYPES.CASTLE;
  tiles[11][14] = TILE_TYPES.CASTLE;

  // Add lava at position (18,4)
  tiles[4][18] = TILE_TYPES.FIRE;

  // Add dungeon level 2 exit at position (18,1) - this will be the exit back to dungeon
  tiles[1][18] = TILE_TYPES.DUNGEON_ENTRANCE;

  return tiles;
}

// Generate monsters for dungeon level 2 (30% stronger skeletons and shadows)
export function generateDungeonLevel2Monsters() {
  return [
    // Skeletons (each twice) - 30% stronger than dungeon
    { id: 301, x: 4, y: 4, hp: 46, maxHp: 46, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 13, fast: false }, // 35 * 1.3 = 45.5 -> 46, 10 * 1.3 = 13
    { id: 302, x: 2, y: 12, hp: 46, maxHp: 46, type: 'skeleton swordfighter', isDefeated: false, proximity: 1, attackDamage: 13, fast: false },
    { id: 303, x: 5, y: 10, hp: 33, maxHp: 33, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 10, fast: false }, // 25 * 1.3 = 32.5 -> 33, 8 * 1.3 = 10.4 -> 10
    { id: 304, x: 1, y: 11, hp: 33, maxHp: 33, type: 'skeleton archer', isDefeated: false, proximity: 1, attackDamage: 10, fast: false },
    { id: 305, x: 18, y: 12, hp: 117, maxHp: 117, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 39, fast: false }, // 90 * 1.3 = 117, 30 * 1.3 = 39
    { id: 306, x: 2, y: 13, hp: 117, maxHp: 117, type: 'skeleton mage', isDefeated: false, proximity: 2, attackDamage: 39, fast: false },
    { id: 307, x: 1, y: 8, hp: 26, maxHp: 26, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 8, fast: false }, // 20 * 1.3 = 26, 6 * 1.3 = 7.8 -> 8
    { id: 308, x: 14, y: 2, hp: 26, maxHp: 26, type: 'skeleton rogue', isDefeated: false, proximity: 1, attackDamage: 8, fast: false },
    
    // Shadow monsters (30% stronger) - 2 of each
    { id: 309, x: 2, y: 1, hp: 59, maxHp: 59, type: 'shadow', isDefeated: false, proximity: 2, attackDamage: 39, fast: false }, // 45 * 1.3 = 58.5 -> 59, 30 * 1.3 = 39
    { id: 310, x: 12, y: 8, hp: 59, maxHp: 59, type: 'shadow', isDefeated: false, proximity: 2, attackDamage: 39, fast: false },
    
    // Big Dragon boss (2x2 size, 175 HP, random damage 40-45, not fast)
    { 
      id: 311, 
      x: 10, 
      y: 12, 
      hp: 175, 
      maxHp: 175, 
      type: 'dragon', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 42, // Average of 40-45 range
      fast: false, // Dragon does not attack first
      isBoss: true,
      size: 2 // 2x2 size like hydra
    },
    
    // Large Snake boss (2x2 size, 100 HP, random damage 25-35, fast)
    { 
      id: 312, 
      x: 17, 
      y: 6, 
      hp: 100, 
      maxHp: 100, 
      type: 'snake', 
      isDefeated: false, 
      proximity: 2, 
      attackDamage: 30, // Average of 25-35 range
      fast: true, // Snake attacks first
      isBoss: true,
      size: 2, // 2x2 size like dragon
      hasPoison: true // Poison attack like large spider
    }
  ];
}

// Generate healing potions for dungeon level 2
export function generateDungeonLevel2Potions() {
  const potions = [];
  
  // 4 potions in dungeon level 2 (moved outside fire areas)
  const potionPositions = [
    { x: 5, y: 3, healAmount: Math.floor(Math.random() * 36) + 35 }, // Near first castle (moved from 4,4)
    { x: 15, y: 13, healAmount: Math.floor(Math.random() * 36) + 35 }, // Near second castle (moved from 15,12)
    { x: 8, y: 9, healAmount: Math.floor(Math.random() * 36) + 35 }, // Central area (moved from 8,8)
    { x: 11, y: 5, healAmount: Math.floor(Math.random() * 36) + 35 }  // Near water area
  ];
  
  potionPositions.forEach((potion, index) => {
    potions.push({
      id: 300 + index + 1, // Use different ID range for dungeon level 2 potions
      x: potion.x,
      y: potion.y,
      type: 'healingPotion',
      healAmount: potion.healAmount,
      isCollected: false
    });
  });
  
  return potions;
}

// Generate equipment for dungeon level 2
export function generateDungeonLevel2Equipment() {
  return [
    {
      id: 401,
      x: 17,
      y: 5,
      type: 'equipment',
      equipmentType: 'redArmor',
      name: 'Red Armor',
      defense: 4, // -4 damage reduction
      fireImmune: true, // Immune to fire damage
      guardedBy: 312, // Guarded by the large snake (id: 312)
      isCollected: false
    }
  ];
}

// Generate portable items for dungeon level 2
export function generateDungeonLevel2PortableItems() {
  return [
    {
      id: 501,
      x: 1,
      y: 1,
      type: 'portablePotion',
      name: 'Portable Healing Potion',
      healAmount: 50,
      isCollected: false
    },
    {
      id: 502,
      x: 18,
      y: 5,
      type: 'portablePotion',
      name: 'Portable Healing Potion',
      healAmount: 50,
      isCollected: false
    }
  ];
}

// Generate gold piles for dungeon level 2
export function generateDungeonLevel2Gold() {
  return [
    {
      id: 601,
      x: 1,
      y: 12,
      type: 'gold',
      amount: 2,
      isCollected: false
    },
    {
      id: 602,
      x: 11,
      y: 11,
      type: 'gold',
      amount: 10,
      isCollected: false
    }
  ];
}

// Generate traps for dungeon level 2
export function generateDungeonLevel2Traps() {
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
      id: 300 + index + 1,
      x: trap.x,
      y: trap.y,
      type: TRAP_TYPES.DAMAGE,
      damage: trap.damage,
      isTriggered: false
    });
  });
  
  // Add teleport trap
  traps.push({
    id: 303,
    x: teleportTrapPosition.x,
    y: teleportTrapPosition.y,
    type: TRAP_TYPES.TELEPORT,
    targetX: teleportTrapPosition.targetX,
    targetY: teleportTrapPosition.targetY,
    isTriggered: false
  });
  
  return traps;
}

// Create the dungeon level 2 map state object
export function createDungeonLevel2MapState() {
  console.log('=== CREATING DUNGEON LEVEL 2 MAP STATE ===');
  const mapState = {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateDungeonLevel2Map(),
    items: [...generateDungeonLevel2Potions(), ...generateDungeonLevel2Equipment()],
    portableItems: generateDungeonLevel2PortableItems(),
    gold: generateDungeonLevel2Gold(),
    traps: generateDungeonLevel2Traps(),
    monsters: generateDungeonLevel2Monsters()
  };
  console.log('=== DUNGEON LEVEL 2 MAP STATE CREATED ===');
  return mapState;
} 