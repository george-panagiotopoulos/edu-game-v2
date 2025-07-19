// Asset Manager - Maps game entities to their corresponding PNG files

// Tile mappings to medieval RTS assets
export const TILE_ASSETS = {
  grass: 'medievalTile_01.png',          // Basic grass tile
  stone: 'medievalTile_02.png',          // Stone/cobblestone
  water: 'medievalTile_12.png',          // Water tile
  wall: 'medievalEnvironment_14.png',    // Wall/barrier
  tree: 'medievalEnvironment_10.png',    // Tree
  path: 'medievalTile_03.png',           // Main road tile
  road: 'medievalTile_04.png',           // Secondary road tile
  house1: 'medievalStructure_20.png',    // House type 1
  house2: 'medievalStructure_21.png',    // House type 2
  bridge: 'medievalTile_06.png',         // Bridge over water
  rocks: 'medievalEnvironment_05.png',   // Rocky terrain
  flowers: 'medievalEnvironment_01.png'  // Decorative flowers
};

// Monster mappings to cute monster set
export const MONSTER_ASSETS = {
  goblin: 'goblin.png',
  skeleton: 'skeleton swordfighter.png',
  spider: 'spider.png',
  wolf: 'wolf.png',
  dragon: 'dragon.png',
  bat: 'bat.png',
  slime: 'slime.png',
  snake: 'snake.png',
  troll: 'troll.png',
  ghost: 'spirit.png',
  banshee: 'banshee.png',
  crab: 'crab.png'
};

// Hero asset (armored knight from monster set)
export const HERO_ASSET = 'armor.png';

// Helper functions to get asset URLs
export const getTileAsset = (tileType) => {
  const fileName = TILE_ASSETS[tileType] || TILE_ASSETS.grass;
  return `/assets/tiles/${fileName}`;
};

export const getMonsterAsset = (monsterType) => {
  const fileName = MONSTER_ASSETS[monsterType] || MONSTER_ASSETS.goblin;
  return `/assets/monsters/${fileName}`;
};

export const getHeroAsset = () => {
  return `/assets/monsters/${HERO_ASSET}`;
}; 