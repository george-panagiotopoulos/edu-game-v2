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
  volcano_entrance: 'medievalStructure_13.png', // Using same asset as dungeon entrance for now
  forest_entrance: 'medievalStructure_13.png', // Using same asset as dungeon entrance for now
  village_entrance: 'medievalStructure_13.png', // Using same asset as dungeon entrance for now
  shop: 'shop.avif',
  boat: 'boat.jpg',
  troll_castle_entrance: 'medievalStructure_13.png', // Using same asset as dungeon entrance for now
  crossroads_entrance: 'medievalStructure_13.png', // Using same asset as dungeon entrance for now
  dangerous_area_entrance: 'medievalStructure_13.png' // Use same entrance marker as other transitions
};

// Monster mappings to cute monster set
export const MONSTER_ASSETS = {
  goblin: 'goblin.png',
  'skeleton swordfighter': 'skeleton swordfighter.png',
  'skeleton archer': 'skeleton archer.png',
  'skeleton mage': 'skeleton mage.png',
  'skeleton rogue': 'skeleton rogue.png',
  spider: 'spider.png',
  'large spider': 'spider.png', // Uses same asset as regular spider but 2x2 size
  wolf: 'wolf.png',
  'large wolf': 'wolf.png', // Uses same asset as regular wolf but 2x2 size
  dragon: 'dragon.png',
  bat: 'bat.png',
  slime: 'slime.png',
  snake: 'snake.png',
  troll: 'troll.png',
  'Troll Chieftain': 'troll.png', // Troll Chieftain uses same asset as regular troll but 3x3 size
  ghost: 'spirit.png',
  banshee: 'banshee.png',
  crab: 'crab.png',
  shadow: 'shadow.png',
  'black imp': 'black imp.png',
  'red imp': 'red imp.png',
  golem: 'golem.png',
  hydra: 'hydra.jpeg',
  guardian: 'golem.png', // Treasure guardian uses golem asset
  pirate: 'pirate.png',
  pirate_captain: 'pirate_captain.png',
  witch: 'witch.png'
};

// Hero asset (armored knight from monster set)
export const HERO_ASSET = 'armor.png';

// Equipment asset mappings
export const EQUIPMENT_ASSETS = {
  sword: 'sword.png',
  shield: 'shield.jpeg',
  ring: 'ring.png',
  axe: 'axe.png',
  magicShield: 'magic_shield.png',
  flamingSword: 'flaming sword.png',
  redArmor: 'red armor.jpg',
  armor: 'armor.png', // Add this line for the generic armor
  dungeonArmor: 'armor.png', // Add this line for dungeon armor
  spear: 'spear.png' // Add spear weapon
};

// Item assets
export const ITEM_ASSETS = {
  healingPotion: 'potion.jpeg',
  portablePotion: 'portable potion.png',
  armor: 'armor.png',
  redArmor: 'red armor.jpg',
  gold: 'goldpile.png',
  boat: 'boat.jpg',
  roadSign: 'road sign.png',
  book: 'book.jpg',
  freezingBomb: 'frozenbomb.png',
  treasure: 'goldpile.png' // Treasure chest uses gold pile asset
};

// Helper functions to get asset URLs
export const getTileAsset = (tileType) => {
  const fileName = TILE_ASSETS[tileType] || TILE_ASSETS.grass;
  // Special case for shop asset which is in the main assets directory
  if (tileType === 'shop') {
    return `/assets/${fileName}`;
  }
  return `/assets/tiles/${fileName}`;
};

export const getItemAsset = (itemType) => {
  const fileName = ITEM_ASSETS[itemType] || ITEM_ASSETS.healingPotion;
  console.log(`getItemAsset called for ${itemType}, fileName: ${fileName}`);
  // Regular armor is in the monsters folder, redArmor is in assets root
  if (itemType === 'armor') {
    const path = `/assets/monsters/${encodeURIComponent(fileName)}`;
    console.log(`Returning armor path: ${path}`);
    return path;
  }
  if (itemType === 'redArmor') {
    const path = `/assets/${encodeURIComponent(fileName)}`;
    console.log(`Returning redArmor path: ${path}`);
    return path;
  }
  if (itemType === 'roadSign') {
    const path = `/assets/${encodeURIComponent(fileName)}`;
    console.log(`Returning roadSign path: ${path}`);
    return path;
  }
  const path = `/assets/${encodeURIComponent(fileName)}`;
  console.log(`Returning regular path: ${path}`);
  return path;
};

export const getMonsterAsset = (monsterType) => {
  const fileName = MONSTER_ASSETS[monsterType] || MONSTER_ASSETS.goblin;
  console.log(`getMonsterAsset called for: ${monsterType}, fileName: ${fileName}`);
  // Special-case monsters whose assets live in the root assets folder
  if (monsterType === 'witch') {
    const rootPath = `/assets/${encodeURIComponent(fileName)}`;
    console.log(`Returning monster path (root assets): ${rootPath}`);
    return rootPath;
  }
  const path = `/assets/monsters/${encodeURIComponent(fileName)}`;
  console.log(`Returning monster path: ${path}`);
  return path;
};

export const getHeroAsset = () => {
  return `/assets/monsters/${HERO_ASSET}`;
};

export const getEquipmentAsset = (equipmentType) => {
  console.log(`getEquipmentAsset called for: ${equipmentType}`);
  if (!EQUIPMENT_ASSETS[equipmentType]) {
    console.warn(`Equipment asset not found for: ${equipmentType}`);
    return null;
  }
  console.log(`Equipment asset file: ${EQUIPMENT_ASSETS[equipmentType]}`);
  
  // Generic armor and dungeon armor are in the monsters folder, redArmor is in assets root, others are in assets root
  if (equipmentType === 'armor' || equipmentType === 'dungeonArmor') {
    const path = `/assets/monsters/${encodeURIComponent(EQUIPMENT_ASSETS[equipmentType])}`;
    console.log(`Returning ${equipmentType} path: ${path}`);
    return path;
  }
  const path = `/assets/${encodeURIComponent(EQUIPMENT_ASSETS[equipmentType])}`;
  console.log(`Returning equipment path: ${path}`);
  return path;
}; 