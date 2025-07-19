# Educational RPG Game Design Document

## Game Overview
An educational RPG game designed for young players that combines adventure exploration with learning through interactive riddles. The hero explores a medieval-themed world, encounters monsters, and engages in turn-based battles that incorporate educational challenges.

## Core Game Mechanics

### 1. Map System
- **Grid-based map** with medieval tileset (using kenney_medieval-rts assets)
- **Hero movement** using arrow keys (↑↓←→)
- **Collision detection** for blocked areas (walls, rivers, structures)
- **Multiple map zones** with different difficulty levels
- **Persistent hero state** across the map journey

### 2. Hero System
- **Hit Points (HP)**: Hero's health that persists across battles
- **Position tracking**: Current location on the map
- **Inventory**: Collected items (healing potions, etc.)
- **Statistics**: Battles won/lost, riddles solved correctly

### 3. Monster System
- **Random encounters**: Monsters placed at strategic locations
- **Proximity detection**: Battle triggers when hero gets within 1-2 tiles
- **Monster variety**: Different types with varying difficulty
- **Monster stats**: HP, attack damage, defense

### 4. Battle System
- **Turn-based combat**: Hero attacks first, then monster
- **Two attack types**:
  - **Basic Attack**: No riddle required, deals 10-15 damage
  - **Special Attack**: Requires correct riddle answer, deals 25-35 damage
- **Riddle mechanics**: Wrong answer results in monster attacking instead
- **Battle resolution**: Continue until hero or monster HP reaches 0

### 5. Educational Riddle System
- **Question categories**: Math, Science, History, Language Arts
- **Difficulty scaling**: Questions get harder as hero progresses
- **Random selection**: Questions chosen randomly from category pools
- **Feedback system**: Immediate feedback on correct/incorrect answers

### 6. Items and Healing
- **Healing Potions**: Restore 30-50 HP, randomly placed on map
- **Treasure chests**: Contain potions or temporary stat boosts
- **Auto-collection**: Items collected when hero walks over them

## Technical Architecture

### Frontend (React)
- **Port**: 4455
- **Components**:
  - `GameMap`: Renders the tile-based map
  - `Hero`: Player character with movement logic
  - `Monster`: Enemy entities with AI behavior
  - `BattleScreen`: Turn-based combat interface
  - `RiddleModal`: Educational question interface
  - `HUD`: Health bar, inventory, statistics
  - `GameState`: Global state management

### Asset Management
- **Map Tiles**: kenney_medieval-rts assets
  - Environment tiles (grass, stone, water)
  - Structure tiles (walls, buildings, decorations)
  - Tile classification for collision detection
- **Monster Graphics**: Malicious_cutemonsterset1free
  - 25 different monster types
  - Animation states (idle, attacking, defeated)
- **Sound Effects**: Optional audio for battles, movement, item collection

### Data Structure
```javascript
// Game State
{
  hero: {
    x: number,
    y: number,
    hp: number,
    maxHp: number,
    inventory: Array<Item>
  },
  monsters: Array<{
    id: string,
    x: number,
    y: number,
    hp: number,
    type: string,
    isDefeated: boolean
  }>,
  map: {
    width: number,
    height: number,
    tiles: Array<Array<TileType>>,
    items: Array<Item>
  },
  battle: {
    isActive: boolean,
    currentMonster: Monster,
    currentRiddle: Riddle,
    turn: 'hero' | 'monster'
  }
}
```

## Game Flow

### 1. Game Initialization
1. Load map tiles and generate game world
2. Place hero at starting position
3. Spawn monsters at predetermined locations
4. Scatter healing items randomly across map

### 2. Exploration Phase
1. Hero moves using arrow keys
2. Collision detection prevents movement through blocked tiles
3. Item collection when hero walks over items
4. Monster proximity detection triggers battles

### 3. Battle Phase
1. Battle screen overlay appears
2. Hero chooses attack type (basic or special)
3. If special attack chosen, riddle appears
4. Battle resolves based on riddle answer
5. Turn alternates between hero and monster
6. Battle ends when either HP reaches 0

### 4. Post-Battle
1. Victory: Monster is marked as defeated
2. Defeat: Hero respawns at starting position with reduced HP
3. Return to exploration phase

## Riddle Categories and Examples

### Mathematics (Ages 8-12)
- **Easy**: "What is 7 + 8?"
- **Medium**: "If you have 3 bags with 4 apples each, how many apples total?"
- **Hard**: "What is 12 × 7?"

### Science (Ages 8-12)
- **Easy**: "What do plants need to grow? (Water, Sunlight, Soil)"
- **Medium**: "Which planet is closest to the sun?"
- **Hard**: "What is the process plants use to make food?"

### Geography/History
- **Easy**: "What is the capital of France?"
- **Medium**: "Which ocean is the largest?"
- **Hard**: "In what year did World War II end?"

### Language Arts
- **Easy**: "What is the opposite of 'hot'?"
- **Medium**: "What type of word describes an action?"
- **Hard**: "What is a synonym for 'happy'?"

## Map Design

### Tile Types
- **Grass**: Walkable terrain
- **Stone/Path**: Walkable terrain
- **Water**: Blocked terrain
- **Walls**: Blocked terrain
- **Trees**: Blocked terrain
- **Decorative**: Walkable terrain with visual elements

### Map Features
- **Starting area**: Safe zone with no monsters
- **Monster territories**: Areas with higher monster density
- **Healing shrines**: Guaranteed healing item locations
- **Treasure areas**: Hidden areas with valuable items

## User Interface

### HUD Elements
- **Health bar**: Visual representation of hero HP
- **Mini-map**: Shows explored areas and monster locations
- **Inventory**: Shows collected items
- **Statistics**: Battles won, riddles solved correctly

### Controls
- **Arrow keys**: Hero movement
- **Spacebar**: Interact with items/NPCs
- **ESC**: Open game menu
- **Enter**: Confirm selections in battle

## Difficulty Scaling

### Progressive Difficulty
- **Zone 1**: Basic math and simple science questions
- **Zone 2**: Intermediate questions, stronger monsters
- **Zone 3**: Advanced questions, boss monsters

### Adaptive Learning
- Track correct/incorrect answers
- Adjust question difficulty based on performance
- Provide hints for struggling players

## Development Phases

### Phase 1: Core Systems
- Basic map rendering and hero movement
- Collision detection system
- Simple battle mechanics

### Phase 2: Educational Content
- Riddle system implementation
- Question database creation
- Answer validation

### Phase 3: Game Polish
- Monster AI and animations
- Sound effects and music
- Save/load functionality

### Phase 4: Testing and Balancing
- Playtesting with target age group
- Difficulty balance adjustments
- Bug fixes and optimizations

## Success Metrics
- **Educational**: Percentage of riddles answered correctly
- **Engagement**: Time spent playing, battles fought
- **Progression**: Areas explored, monsters defeated
- **Learning**: Improvement in riddle accuracy over time

## Technical Requirements
- **React 18+**: For modern component architecture
- **Canvas/WebGL**: For efficient tile rendering
- **Local Storage**: For save game persistence
- **Responsive Design**: Works on tablets and desktops
- **Performance**: Smooth 60 FPS gameplay

## Launch Configuration
- **Development server**: Port 4455
- **Build system**: Create React App or Vite
- **Asset loading**: Optimized image loading and caching
- **Error handling**: Graceful error recovery and logging 