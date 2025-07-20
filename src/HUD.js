import React, { useEffect } from 'react';
import { useGame, EQUIPMENT_ITEMS } from './GameState';

function HUD() {
  const { state, dispatch } = useGame();
  const { hero, currentMapId, maps, battle } = state;
  const currentMap = maps[currentMapId];
  const monsters = currentMap.monsters;
  
  console.log('HUD - Hero equipment:', hero.equipment);
  console.log('HUD - Weapon:', hero.equipment.weapon, 'Shield:', hero.equipment.shield, 'Armor:', hero.equipment.armor);
  console.log('HUD - EQUIPMENT_ITEMS[shield]:', EQUIPMENT_ITEMS[hero.equipment.shield]);

  // Clear potion message after 3 seconds
  useEffect(() => {
    if (battle.battleMessage && battle.battleMessage.includes('healing potion')) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_POTION_MESSAGE' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [battle.battleMessage, dispatch]);

  const aliveMonsters = monsters.filter(m => !m.isDefeated).length;
  const totalMonsters = monsters.length;

  return (
    <div className="hud">
      <div className="hud-section">
        <h3>Hero Status (Κατάσταση Ήρωα)</h3>
        <div className="health-bar">
          <div className="health-label">Health: (Υγεία:)</div>
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
          Position: (Θέση:) ({hero.x}, {hero.y})
        </div>
        <div className="current-map">
          Current Area: (Τρέχουσα Περιοχή:) {currentMapId === 'main' ? 'Village (Χωριό)' : 'Dungeon (Μπουντρούμι)'}
        </div>
      </div>

      {/* Equipment Section */}
      <div className="hud-section">
        <h3>Equipment (Εξοπλισμός)</h3>
        <div className="equipment-grid">
          <div className="equipment-slot weapon-slot" title={hero.equipment.weapon ? 
            `${EQUIPMENT_ITEMS[hero.equipment.weapon].name} (+${EQUIPMENT_ITEMS[hero.equipment.weapon].damageBonus} damage)` :
            'No weapon equipped'
          }>
            <strong>Weapon: (Όπλο:)</strong><br/>
            {hero.equipment.weapon ? 
              `${EQUIPMENT_ITEMS[hero.equipment.weapon].name} (+${EQUIPMENT_ITEMS[hero.equipment.weapon].damageBonus} damage)` :
              'None (Κανένα)'
            }
          </div>
          <div className="equipment-slot shield-slot" title={hero.equipment.shield ? 
            `${EQUIPMENT_ITEMS[hero.equipment.shield].name} (${Math.round(EQUIPMENT_ITEMS[hero.equipment.shield].blockChance * 100)}% block chance)` :
            'No shield equipped'
          }>
            <strong>Shield: (Ασπίδα:)</strong><br/>
            {hero.equipment.shield ? 
              `${EQUIPMENT_ITEMS[hero.equipment.shield].name} (${Math.round(EQUIPMENT_ITEMS[hero.equipment.shield].blockChance * 100)}% block chance)` :
              'None (Κανένο)'
            }
          </div>
          <div className="equipment-slot armor-slot" title={hero.equipment.armor ? 
            `${hero.equipment.armor.name} (-${hero.equipment.armor.defense} damage reduction)` :
            'No armor equipped'
          }>
            <strong>Armor: (Θωράκιση:)</strong><br/>
            {hero.equipment.armor ? 
              `${hero.equipment.armor.name} (-${hero.equipment.armor.defense} damage reduction)` :
              'None (Κανένα)'
            }
          </div>
          <div className="equipment-slot ring-slot" title={hero.equipment.ring ? 
            `${hero.equipment.ring.name} (${hero.equipment.ring.charges} charges remaining)` :
            'No ring equipped'
          }>
            <strong>Ring: (Δαχτυλίδι:)</strong><br/>
            {hero.equipment.ring ? 
              `${hero.equipment.ring.name} (${hero.equipment.ring.charges} charges)` :
              'None (Κανένο)'
            }
          </div>
        </div>
        {(!hero.equipment.weapon || !hero.equipment.shield) && currentMapId === 'main' && (
          <div className="equipment-hint">
            <small>🗡️ Sword visible next to the Dragon (defeat to collect) (Σπαθί ορατό δίπλα στον Δράκο - νικήστε για να το συλλέξετε)<br/>
                   🛡️ Shield visible next to the Ghost (defeat to collect) (Ασπίδα ορατή δίπλα στο Φάντασμα - νικήστε για να τη συλλέξετε)</small>
          </div>
        )}
        {!hero.equipment.armor && currentMapId === 'dungeon' && (
          <div className="equipment-hint">
            <small>🛡️ Armor available in the dungeon bottom-left area (defeat monsters to reach) (Θωράκιση διαθέσιμη στην κάτω-αριστερή περιοχή του μπουντρουμιού - νικήστε τέρατα για να φτάσετε)</small>
          </div>
        )}
        {!hero.equipment.ring && currentMapId === 'dungeon' && (
          <div className="equipment-hint">
            <small>💍 Ring of Knowledge available in the dungeon bottom-right area (defeat monsters to reach) (Δαχτυλίδι Γνώσης διαθέσιμο στην κάτω-δεξιά περιοχή του μπουντρουμιού - νικήστε τέρατα για να φτάσετε)</small>
          </div>
        )}
        
        {/* Debug section - remove this after testing */}
        <div className="debug-section" style={{marginTop: '10px', padding: '5px', backgroundColor: '#333', fontSize: '10px'}}>
          <strong>Debug Info:</strong><br/>
          Weapon: {hero.equipment.weapon || 'null'}<br/>
          Shield: {hero.equipment.shield || 'null'}<br/>
          Armor: {hero.equipment.armor ? hero.equipment.armor.name : 'null'}<br/>
          Ring: {hero.equipment.ring ? `${hero.equipment.ring.name} (${hero.equipment.ring.charges} charges)` : 'null'}<br/>
          Current Map: {currentMapId}
        </div>
      </div>

      <div className="hud-section">
        <h3>Quest Progress (Πρόοδος Αποστολής)</h3>
        <div className="monsters-remaining">
          Monsters: (Τέρατα:) {aliveMonsters}/{totalMonsters} {currentMapId === 'main' ? '(17 total)' : '(12 total)'} {currentMapId === 'main' ? '(17 συνολικά)' : '(12 συνολικά)'}
        </div>
        {currentMapId === 'main' && (
          <div className="potions-remaining">
            Potions: (Φίλτρα:) {currentMap.items.filter(item => item.type === 'potion' && !item.isCollected).length}/6 remaining (απομένουν)
          </div>
        )}
        {currentMapId === 'dungeon' && (
          <div className="potions-remaining">
            Potions: (Φίλτρα:) {currentMap.items.filter(item => item.type === 'potion' && !item.isCollected).length}/4 remaining (απομένουν)
          </div>
        )}
        <div className="inventory">
          Inventory: (Αποθήκη:) {hero.inventory.length} items (αντικείμενα)
        </div>
      </div>


      
      {/* Potion collection message */}
      {battle.battleMessage && battle.battleMessage.includes('healing potion') && (
        <div className="potion-message">
          <div className="potion-icon">🧪</div>
          <div className="potion-text">{battle.battleMessage}</div>
        </div>
      )}
      
      {/* Equipment collection message */}
      {battle.battleMessage && battle.battleMessage.includes('equipped') && (
        <div className="equipment-message">
          <div className="equipment-icon">⚡</div>
          <div className="equipment-text">{battle.battleMessage}</div>
        </div>
      )}
    </div>
  );
}

export default HUD; 