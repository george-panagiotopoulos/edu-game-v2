// Asset Manager - Maps game entities to their corresponding PNG files

// Tile mappings to medieval RTS assets
export const TILE_ASSETS = {
  grass: 'medievalTile_57.png',          // Grass tile 57
  grass2: 'medievalTile_58.png',         // Grass tile 58
  stone: 'medievalTile_02.png',          // Stone/cobblestone
  stone2: 'medievalTile_01.png',         // Stone tile 01
  water: 'medievalTile_27.png',          // Water tile 27
  water2: 'medievalTile_28.png',         // Water tile 28
  wall: 'medievalEnvironment_14.png',    // Wall/barrier
  tree: 'medievalTile_41.png',           // Tree tile 41
  tree2: 'medievalTile_42.png',          // Tree tile 42
  tree3: 'medievalTile_43.png',          // Tree tile 43
  tree4: 'medievalTile_44.png',          // Tree tile 44
  tree5: 'medievalTile_45.png',          // Tree tile 45
  path: 'medievalTile_03.png',           // North-south roads (path)
  road: 'medievalTile_04.png',           // Horizontal roads (road)
  crossroad: 'medievalTile_05.png',      // Crossroad at junctions
  house1: 'medievalStructure_20.png',    // House type 1
  house2: 'medievalStructure_21.png',    // House type 2
  house3: 'medievalStructure_16.png',    // House type 3
  house4: 'medievalStructure_17.png',    // House type 4
  house5: 'medievalStructure_18.png',    // House type 5
  windmill: 'medievalStructure_15.png',  // Windmill
  castle: 'medievalStructure_06.png',    // Castle
  bridge: 'medievalTile_06.png',         // Bridge over water
  rocks: 'medievalEnvironment_05.png',   // Rocky terrain
  flowers: 'medievalEnvironment_01.png',  // Decorative flowers
  dungeon_entrance: 'medievalStructure_13.png', // A distinct asset for the dungeon entrance
  dungeon_floor: 'medievalTile_02.png', // Using a stone tile for dungeon floor
  dungeon_wall: 'medievalStructure_07.png', // Dungeon walls
  dirt: 'medievalTile_13.png',          // Dirt tile 13
  dirt2: 'medievalTile_14.png',         // Dirt tile 14
  fire: 'fire_tile.jpg',                // Fire tile for volcano
  volcano_entrance: 'medievalStructure_13.png' // Using same asset as dungeon entrance for now
};

// Monster mappings to cute monster set
export const MONSTER_ASSETS = {
  goblin: 'goblin.png',
  'skeleton swordfighter': 'skeleton swordfighter.png',
  'skeleton archer': 'skeleton archer.png',
  'skeleton mage': 'skeleton mage.png',
  'skeleton rogue': 'skeleton rogue.png',
  spider: 'spider.png',
  wolf: 'wolf.png',
  dragon: 'dragon.png',
  bat: 'bat.png',
  slime: 'slime.png',
  snake: 'snake.png',
  troll: 'troll.png',
  ghost: 'spirit.png',
  banshee: 'banshee.png',
  crab: 'crab.png',
  shadow: 'shadow.png',
  'black imp': 'black imp.png',
  'red imp': 'red imp.png',
  golem: 'golem.png'
};

// Hero asset (armored knight from monster set)
export const HERO_ASSET = 'armor.png';

// Equipment asset mappings
export const EQUIPMENT_ASSETS = {
  sword: 'sword.png',
  shield: 'shield.jpeg',
  ring: 'ring.png',
  axe: 'axe.png',
  magicShield: 'magic_shield.png'
};

// Item assets
export const ITEM_ASSETS = {
  potion: 'potion.jpeg',
  armor: 'armor.png'
};

// Helper functions to get asset URLs
export const getTileAsset = (tileType) => {
  const fileName = TILE_ASSETS[tileType] || TILE_ASSETS.grass;
  return `/assets/tiles/${fileName}`;
};

export const getItemAsset = (itemType) => {
  const fileName = ITEM_ASSETS[itemType] || ITEM_ASSETS.potion;
  // Armor is in the monsters folder, others are in assets root
  if (itemType === 'armor') {
    return `/assets/monsters/${fileName}`;
  }
  return `/assets/${fileName}`;
};

export const getMonsterAsset = (monsterType) => {
  const fileName = MONSTER_ASSETS[monsterType] || MONSTER_ASSETS.goblin;
  return `/assets/monsters/${encodeURIComponent(fileName)}`;
};

export const getHeroAsset = () => {
  return `/assets/monsters/${HERO_ASSET}`;
};

export const getEquipmentAsset = (equipmentType) => {
  if (!EQUIPMENT_ASSETS[equipmentType]) {
    console.warn(`Equipment asset not found for: ${equipmentType}`);
    return null;
  }
  return `/assets/${EQUIPMENT_ASSETS[equipmentType]}`;
}; 