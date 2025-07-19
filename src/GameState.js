import { createContext, useContext, useReducer } from 'react';

// Game constants
export const TILE_SIZE = 64;
export const MAP_WIDTH = 20;
export const MAP_HEIGHT = 15;

// Tile types
export const TILE_TYPES = {
  GRASS: 'grass',
  STONE: 'stone',
  WATER: 'water',
  WALL: 'wall',
  TREE: 'tree',
  PATH: 'path',
  ROAD: 'road',
  HOUSE1: 'house1',
  HOUSE2: 'house2',
  BRIDGE: 'bridge',
  ROCKS: 'rocks',
  FLOWERS: 'flowers'
};

// Initial game state
const initialState = {
  hero: {
    x: 9,
    y: 7,
    hp: 100,
    maxHp: 100,
    inventory: []
  },
  monsters: [
    { id: 1, x: 7, y: 5, hp: 40, type: 'goblin', isDefeated: false },
    { id: 2, x: 12, y: 3, hp: 35, type: 'skeleton', isDefeated: false },
    { id: 3, x: 7, y: 9, hp: 30, type: 'spider', isDefeated: false },
    { id: 4, x: 12, y: 11, hp: 45, type: 'wolf', isDefeated: false },
    { id: 5, x: 16, y: 5, hp: 25, type: 'bat', isDefeated: false },
    { id: 6, x: 2, y: 7, hp: 35, type: 'slime', isDefeated: false },
    { id: 7, x: 17, y: 7, hp: 50, type: 'troll', isDefeated: false },
    { id: 8, x: 7, y: 1, hp: 30, type: 'snake', isDefeated: false },
    { id: 9, x: 7, y: 13, hp: 40, type: 'crab', isDefeated: false }
  ],
  map: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles: generateMap(),
    items: []
  },
  battle: {
    isActive: false,
    currentMonster: null,
    currentRiddle: null,
    turn: 'hero'
  }
};

// Generate a realistic medieval village with properly connected roads
function generateMap() {
  const tiles = [];
  
  // Initialize with grass
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      row.push(TILE_TYPES.GRASS);
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
  
  // Create main horizontal road (Main Street)
  const mainRoadY = 7;
  for (let x = 1; x < MAP_WIDTH - 1; x++) {
    tiles[mainRoadY][x] = TILE_TYPES.PATH;
  }
  
  // Create main vertical road (Central Avenue)
  const mainRoadX = 9;
  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    tiles[y][mainRoadX] = TILE_TYPES.PATH;
  }
  
  // Create north-south road on the left
  for (let y = 3; y < 12; y++) {
    tiles[y][4] = TILE_TYPES.ROAD;
  }
  // Connect to main road
  tiles[7][4] = TILE_TYPES.PATH;
  for (let x = 4; x < 9; x++) {
    tiles[7][x] = TILE_TYPES.PATH;
  }
  
  // Create north-south road on the right
  for (let y = 3; y < 12; y++) {
    tiles[y][15] = TILE_TYPES.ROAD;
  }
  // Connect to main road
  tiles[7][15] = TILE_TYPES.PATH;
  for (let x = 9; x < 16; x++) {
    tiles[7][x] = TILE_TYPES.PATH;
  }
  
  // Create connecting road at the top
  for (let x = 4; x < 16; x++) {
    tiles[3][x] = TILE_TYPES.ROAD;
  }
  // Connect to vertical roads
  tiles[3][4] = TILE_TYPES.ROAD;
  tiles[3][9] = TILE_TYPES.ROAD;
  tiles[3][15] = TILE_TYPES.ROAD;
  
  // Create connecting road at the bottom
  for (let x = 4; x < 16; x++) {
    tiles[11][x] = TILE_TYPES.ROAD;
  }
  // Connect to vertical roads
  tiles[11][4] = TILE_TYPES.ROAD;
  tiles[11][9] = TILE_TYPES.ROAD;
  tiles[11][15] = TILE_TYPES.ROAD;
  
  // Add small lake with bridge
  for (let x = 6; x < 9; x++) {
    for (let y = 1; y < 3; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }
  tiles[2][9] = TILE_TYPES.BRIDGE; // Bridge over water
  
  // Add second water feature
  for (let x = 16; x < 19; x++) {
    for (let y = 8; y < 11; y++) {
      tiles[y][x] = TILE_TYPES.WATER;
    }
  }
  
  // Place houses strategically near roads
  const housePositions = [
    // Row 1 - Top houses
    [2, 2], [3, 2], [5, 2], [10, 2], [11, 2], [13, 2], [14, 2],
    // Row 2 - Upper middle houses
    [2, 5], [3, 5], [5, 5], [6, 5], [10, 5], [11, 5], [13, 5], [14, 5],
    // Row 3 - Lower middle houses
    [2, 9], [3, 9], [5, 9], [6, 9], [10, 9], [11, 9], [13, 9], [14, 9],
    // Row 4 - Bottom houses
    [2, 12], [3, 12], [5, 12], [6, 12], [10, 12], [11, 12], [13, 12], [14, 12]
  ];
  
  housePositions.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && tiles[y][x] === TILE_TYPES.GRASS) {
      tiles[y][x] = index % 2 === 0 ? TILE_TYPES.HOUSE1 : TILE_TYPES.HOUSE2;
    }
  });
  
  // Add tree clusters in corners and empty spaces
  const treeAreas = [
    {x: 17, y: 1, size: 2},   // Top right corner
    {x: 1, y: 1, size: 2},    // Top left corner
    {x: 1, y: 12, size: 2},   // Bottom left corner
    {x: 17, y: 12, size: 2}   // Bottom right corner
  ];
  
  treeAreas.forEach(area => {
    for (let dx = 0; dx < area.size; dx++) {
      for (let dy = 0; dy < area.size; dy++) {
        const x = area.x + dx;
        const y = area.y + dy;
        if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1 && 
            tiles[y][x] === TILE_TYPES.GRASS) {
          tiles[y][x] = TILE_TYPES.TREE;
        }
      }
    }
  });
  
  // Add decorative elements
  const decorativePositions = [
    [7, 4], [8, 4], [12, 4], [7, 10], [8, 10], [12, 10]
  ];
  decorativePositions.forEach(([x, y], index) => {
    if (tiles[y] && tiles[y][x] && tiles[y][x] === TILE_TYPES.GRASS) {
      tiles[y][x] = index % 2 === 0 ? TILE_TYPES.FLOWERS : TILE_TYPES.ROCKS;
    }
  });
  
  return tiles;
}

// Game state reducer
function gameReducer(state, action) {
  switch (action.type) {
    case 'MOVE_HERO':
      const { x, y } = action.payload;
      const newX = Math.max(0, Math.min(MAP_WIDTH - 1, state.hero.x + x));
      const newY = Math.max(0, Math.min(MAP_HEIGHT - 1, state.hero.y + y));
      
      // Check if the new position is walkable
      const tileType = state.map.tiles[newY][newX];
      const isWalkable = tileType !== TILE_TYPES.WATER && 
                        tileType !== TILE_TYPES.WALL && 
                        tileType !== TILE_TYPES.TREE &&
                        tileType !== TILE_TYPES.HOUSE1 &&
                        tileType !== TILE_TYPES.HOUSE2 &&
                        tileType !== TILE_TYPES.ROCKS;
      
      if (isWalkable) {
        return {
          ...state,
          hero: {
            ...state.hero,
            x: newX,
            y: newY
          }
        };
      }
      return state;
      
    case 'START_BATTLE':
      return {
        ...state,
        battle: {
          ...state.battle,
          isActive: true,
          currentMonster: action.payload.monster
        }
      };
      
    case 'END_BATTLE':
      return {
        ...state,
        battle: {
          ...state.battle,
          isActive: false,
          currentMonster: null
        }
      };
      
    case 'DEFEAT_MONSTER':
      return {
        ...state,
        monsters: state.monsters.map(monster =>
          monster.id === action.payload.monsterId
            ? { ...monster, isDefeated: true }
            : monster
        )
      };
      
    default:
      return state;
  }
}

// Context
const GameContext = createContext();

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use game state
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 