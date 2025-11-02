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
  DIRT2: 'dirt2', // New tile type for dirt variation
  FIRE: 'fire', // New tile type for volcano fire
  VOLCANO_ENTRANCE: 'volcano_entrance', // New tile type for volcano entrance
  FOREST_ENTRANCE: 'forest_entrance', // New tile type for forest entrance
  VILLAGE_ENTRANCE: 'village_entrance', // New tile type for village entrance
  SHOP: 'shop', // New tile type for shop
  BOAT: 'boat', // New tile type for boat transitions
  TROLL_CASTLE_ENTRANCE: 'troll_castle_entrance', // New tile type for troll castle entrance
  CROSSROADS_ENTRANCE: 'crossroads_entrance', // New tile type for crossroads entrance
  DANGEROUS_AREA_ENTRANCE: 'dangerous_area_entrance' // New tile type for dangerous area entrance
};

// Trap types
export const TRAP_TYPES = {
  DAMAGE: 'damage',
  TELEPORT: 'teleport'
};

// Equipment definitions (parametrical system for future expansion)
export const EQUIPMENT_TYPES = {
  WEAPON: 'weapon',
  ARMOR: 'armor',
  SHIELD: 'shield',
  ACCESSORY: 'accessory'
}; 