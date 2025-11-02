# Educational RPG Game

An interactive educational RPG game designed for kids that combines adventure exploration with learning through riddles and puzzles.

## 🎮 Game Features

- **Hero Movement**: Use arrow keys to move your hero around the medieval world
- **Map Exploration**: Navigate through multiple maps (Main Village, Dungeon, Volcano, Forest)
- **Monster Battles**: Find and battle various monsters with unique abilities
- **Boss Encounters**: Challenge powerful boss monsters with special mechanics
- **Equipment System**: Collect and use weapons, shields, armor and rings with special abilities
- **Visual Interface**: Colorful graphics with a clean, kid-friendly design
- **Educational Riddles**: Solve math, spelling, geography and language problems during battles
- **Map-Specific Content**: Each map offers unique monsters, items, and educational challenges

## 🚀 How to Start the Game

### Option 1: Using the Start Script
```bash
chmod +x start-game.sh
./start-game.sh
```

### Option 2: Manual Start
```bash
npm install
npm start
```

The game will automatically open in your browser at `http://localhost:4455`

## 🎯 How to Play

1. **Movement**: Use the arrow keys (↑↓←→) to move your hero
2. **Exploration**: Explore maps to find monsters, items, and map transitions
3. **Obstacles**: Avoid water (💧), walls (🧱), trees (🌳), and other blocked terrain
4. **Safe Zones**: Walk on grass (🌱) and paths (🛤️)
5. **Battles**: Approach monsters to trigger battles
6. **Riddles**: Answer educational riddles correctly to deal more damage
7. **Equipment**: Collect weapons, shields, and special items to become stronger

## 🗺️ Maps

- **Main Village**: Starting area with basic monsters and items
- **Dungeon**: More challenging underground area with stronger monsters
- **Volcano**: Advanced area with difficult monsters and educational challenges
- **Forest**: New area with trolls, wolves, and the hydra boss monster

## 👹 Monster Types

- **Regular Monsters**: Various creatures with standard abilities
- **Fast Monsters**: Wolves, snakes (attack first)
- **Strong Monsters**: Trolls (chance for double damage)
- **Boss Monsters**: Hydra (multi-headed creature with special mechanics)

## ⚔️ Battle System

- **Basic Attacks**: Deal standard damage without riddles
- **Special Attacks**: Answer riddles correctly to deal extra damage
- **Monster Abilities**: Some monsters have unique abilities (attack first, double damage)
- **Equipment Effects**: 
  - **Flaming Sword**: Sets monsters on fire (2 damage before they attack)
  - **Shields**: Chance to block attacks completely
  - **Armor**: Reduces damage from monster attacks

## 📚 Educational Content

- **Math Riddles**: Addition, subtraction, multiplication across difficulty levels
- **Forest Math**: 3-digit + 2-digit addition, equations with variables
- **Spelling Challenges**: Greek words with common spelling mistakes
- **German Math**: Addition and subtraction problems in German
- **Geography Questions**: Capital cities, countries, and landmarks
- **Map-specific content**: Each area has tailored educational challenges

## 🎲 Current Features

✅ **Implemented:**
- Hero movement with arrow keys
- Multiple maps with different themes and difficulty levels
- Monster battles with turn-based combat
- Educational riddle system with various subject categories
- Equipment collection and effects (weapons, shields, armor, rings)
- Special monster abilities and boss mechanics
- Healing potions and item collection
- Map transitions and special locations
- Permanent HP bonuses for completing maps

🚧 **Coming Soon:**
- Functional shop system in the Forest
- More riddle categories and educational content
- Sound effects and animations
- Save/load game functionality

## 🛠️ Technical Details

- **Framework**: React 18+
- **Port**: 4455
- **Styling**: CSS with modern design
- **State Management**: React Context and useReducer
- **Responsive**: Works on desktop and tablet
- **Storage**: LocalStorage for permanent bonuses

## 🎨 Asset Credits

- Map tiles from kenney_medieval-rts asset pack
- Monster graphics from various free game asset collections
- Item and equipment graphics from open source game assets

## 🔧 Development

To contribute to the game:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Make your changes and test thoroughly
5. Submit a pull request

## 📝 Game Design

For detailed game mechanics and design decisions, see the [Game Design Document](game_design.MD).

## 🎓 Educational Goals

This game is designed to:
- Improve problem-solving skills through diverse educational riddles
- Enhance mathematical thinking with age-appropriate challenges
- Develop language skills in both English and Greek
- Introduce basic German vocabulary through math problems
- Encourage exploration and strategic thinking
- Provide a safe, fun learning environment

---

**Have fun exploring and learning!** 🎉 