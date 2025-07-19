import React from 'react';
import { useGame } from './GameState';

function HUD() {
  const { state } = useGame();
  const { hero, monsters } = state;

  const aliveMonsters = monsters.filter(m => !m.isDefeated).length;
  const totalMonsters = monsters.length;

  return (
    <div className="hud">
      <div className="hud-section">
        <h3>Hero Status</h3>
        <div className="health-bar">
          <div className="health-label">Health:</div>
          <div className="health-bar-container">
            <div 
              className="health-bar-fill"
              style={{
                width: `${(hero.hp / hero.maxHp) * 100}%`,
                backgroundColor: hero.hp > 60 ? '#4CAF50' : 
                               hero.hp > 30 ? '#FF9800' : '#F44336'
              }}
            ></div>
            <div className="health-text">
              {hero.hp}/{hero.maxHp}
            </div>
          </div>
        </div>
        <div className="position">
          Position: ({hero.x}, {hero.y})
        </div>
      </div>

      <div className="hud-section">
        <h3>Quest Progress</h3>
        <div className="monsters-remaining">
          Monsters: {aliveMonsters}/{totalMonsters}
        </div>
        <div className="inventory">
          Inventory: {hero.inventory.length} items
        </div>
      </div>

      <div className="hud-section">
        <h3>Legend</h3>
        <div className="legend">
          <div>⚔️ Hero (Armored Knight)</div>
          <div>👹 9 Different Monsters</div>
          <div>🌱 Grass & Flowers (Safe)</div>
          <div>🛤️ Roads & Paths (Safe)</div>
          <div>🏘️ Houses & Structures</div>
          <div>💧 Water & Rocks (Blocked)</div>
          <div>🧱 Walls & Trees (Blocked)</div>
        </div>
        <div className="legend-note">
          <small>Realistic medieval village with connected roads!</small>
        </div>
      </div>
    </div>
  );
}

export default HUD; 