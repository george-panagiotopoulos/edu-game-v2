import { TILE_TYPES, MAP_WIDTH, MAP_HEIGHT } from '../constants';

// Generate the Dangerous Area map (18x13 grid)
export function generateDangerousAreaMap() {
  const tiles = Array(13).fill(null).map(() => Array(18).fill(TILE_TYPES.GRASS));

  // Mix of forest (trees) and dirt/stone
  // Scatter dirt and dirt2
  const dirtPositions = [
    [2,2],[3,4],[5,6],[7,3],[9,5],[11,7],[13,2],[15,8],[16,10],[4,9],[6,11]
  ];
  dirtPositions.forEach(([x,y]) => { if (x<18 && y<13) tiles[y][x] = TILE_TYPES.DIRT; });
  const dirt2Positions = [[1,8],[3,9],[6,2],[8,6],[10,4],[12,5],[14,7],[15,3]];
  dirt2Positions.forEach(([x,y]) => { if (x<18 && y<13) tiles[y][x] = TILE_TYPES.DIRT2; });

  // Scatter stones
  const stonePositions = [[4,2],[6,3],[8,8],[10,9],[12,10],[3,11],[16,6]];
  stonePositions.forEach(([x,y]) => { if (x<18 && y<13) tiles[y][x] = TILE_TYPES.STONE; });

  // Scatter trees
  const treePositions = [[5,2],[7,5],[9,7],[11,3],[13,6],[2,10],[6,8],[14,9]];
  treePositions.forEach(([x,y]) => { if (x<18 && y<13) tiles[y][x] = TILE_TYPES.TREE; });

  // Add a 5x5 castle in top-left corner with an opening at the center of the bottom wall
  const castleX = 0;
  const castleY = 0;
  const castleSize = 5;
  for (let x = castleX; x < castleX + castleSize; x++) {
    for (let y = castleY; y < castleY + castleSize; y++) {
      // Perimeter walls as dungeon walls, inside stone
      const isEdge = x === castleX || x === castleX + castleSize - 1 || y === castleY || y === castleY + castleSize - 1;
      if (isEdge) {
        // Opening at bottom wall at center (x = castleX + 2, y = castleY + 4)
        if (!(y === castleY + castleSize - 1 && x === castleX + Math.floor(castleSize/2))) {
          tiles[y][x] = TILE_TYPES.DUNGEON_WALL;
        }
      } else {
        tiles[y][x] = TILE_TYPES.STONE;
      }
    }
  }

  return tiles;
}

export function generateDangerousAreaMonsters() {
  return [
    // Witch inside the castle area (top-left), place near the center of castle
    {
      id: 901,
      x: 2, // within the 5x5 castle
      y: 2,
      hp: 125,
      maxHp: 125,
      type: 'witch',
      isDefeated: false,
      proximity: 1,
      attackDamage: Math.floor(Math.random() * 16) + 25, // 25-40 damage
      fast: false,
      hasMagicShieldEverySecond: true,
      magicShieldCounter: 0,
      portablePotions: 2
    }
  ];
}

export function generateDangerousAreaItems() {
  return [
    // 4 healing potions
    { id: 801, x: 8, y: 2, type: 'healingPotion', healAmount: Math.floor(Math.random()*41)+40, isCollected: false },
    { id: 802, x: 12, y: 4, type: 'healingPotion', healAmount: Math.floor(Math.random()*41)+40, isCollected: false },
    { id: 803, x: 10, y: 10, type: 'healingPotion', healAmount: Math.floor(Math.random()*41)+40, isCollected: false },
    { id: 804, x: 3, y: 8, type: 'healingPotion', healAmount: Math.floor(Math.random()*41)+40, isCollected: false },
    // 2 portable healing potions
    { id: 805, x: 15, y: 5, type: 'portablePotion', name: 'Portable Healing Potion', healAmount: 50, isCollected: false },
    { id: 806, x: 5, y: 12, type: 'portablePotion', name: 'Portable Healing Potion', healAmount: 50, isCollected: false }
  ];
}

export function generateDangerousAreaTraps() {
  return [];
}

export function createDangerousAreaMapState() {
  return {
    tiles: (() => {
      const tiles = generateDangerousAreaMap();
      // Place a clear safe return marker (entrance graphic) at bottom-right corner
      tiles[12][17] = TILE_TYPES.DANGEROUS_AREA_ENTRANCE;
      // Ensure spawn tile is walkable grass
      tiles[11][16] = TILE_TYPES.GRASS;
      return tiles;
    })(),
    monsters: generateDangerousAreaMonsters(),
    items: generateDangerousAreaItems(),
    traps: generateDangerousAreaTraps(),
    heroStartX: 16,
    heroStartY: 11,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    name: 'Dangerous Area'
  };
}

