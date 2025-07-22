import React, { useEffect } from 'react';
import { useGame, EQUIPMENT_ITEMS, EQUIPMENT_TYPES } from './GameState';

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

  // Clear trap message after 4 seconds
  useEffect(() => {
    if (battle.battleMessage && (battle.battleMessage.includes('trap') || battle.battleMessage.includes('παγίδα'))) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_POTION_MESSAGE' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [battle.battleMessage, dispatch]);

  const aliveMonsters = monsters.filter(m => !m.isDefeated).length;
  const totalMonsters = monsters.length;
  
  // Helper function to generate equipment tooltip text
  const getEquipmentTooltipText = (equipmentType) => {
    const equipment = EQUIPMENT_ITEMS[equipmentType];
    if (!equipment) return '';
    
    let tooltipText = `${equipment.name} `;
    
    if (equipment.type === 'weapon' || equipment.type === EQUIPMENT_TYPES.WEAPON) {
      tooltipText += `(+${equipment.damageBonus} damage`;
      if (equipment.criticalChance) {
        tooltipText += `, ${Math.round(equipment.criticalChance * 100)}% crit chance`;
      }
      tooltipText += ')';
    } else if (equipment.type === 'shield') {
      tooltipText += `(${Math.round(equipment.blockChance * 100)}% block chance`;
      if (equipmentType === 'magicShield') {
        tooltipText += `, increases to 40% when HP < 40`;
      }
      tooltipText += ')';
    }
    
    return tooltipText;
  };

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
          Current Area: (Τρέχουσα Περιοχή:) {
            currentMapId === 'main' ? 'Village (Χωριό)' : 
            currentMapId === 'dungeon' ? 'Dungeon (Μπουντρούμι)' :
            currentMapId === 'volcano' ? 'Volcano (Ηφαίστειο)' : 'Unknown'
          }
        </div>
      </div>

      {/* Equipment Section */}
      <div className="hud-section">
        <h3>Equipment (Εξοπλισμός)</h3>
        <div className="equipment-grid">
          <div className="equipment-slot weapon-slot" title={hero.equipment.weapon ? 
            getEquipmentTooltipText(hero.equipment.weapon) :
            'No weapon equipped'
          }>
            <strong>Weapon: (Όπλο:)</strong><br/>
            {hero.equipment.weapon ? 
              getEquipmentTooltipText(hero.equipment.weapon) :
              'None (Κανένα)'
            }
          </div>
          <div className="equipment-slot shield-slot" title={hero.equipment.shield ? 
            getEquipmentTooltipText(hero.equipment.shield) :
            'No shield equipped'
          }>
            <strong>Shield: (Ασπίδα:)</strong><br/>
            {hero.equipment.shield ? 
              getEquipmentTooltipText(hero.equipment.shield) :
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
            `Ring of Knowledge (${hero.ringCharges || 0} charges remaining)` :
            'No ring equipped'
          }>
            <strong>Ring: (Δαχτυλίδι:)</strong><br/>
            {hero.equipment.ring ? 
              `Ring of Knowledge (${hero.ringCharges || 0} charges)` :
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
        {!hero.equipment.weapon && currentMapId === 'volcano' && (
          <div className="equipment-hint">
            <small>🪓 Magic Axe available near the Dragon (defeat Dragon to collect) (Μαγικό Τσεκούρι διαθέσιμο κοντά στον Δράκο - νικήστε τον Δράκο για να το συλλέξετε)</small>
          </div>
        )}
        {!hero.equipment.shield && currentMapId === 'volcano' && (
          <div className="equipment-hint">
            <small>🛡️ Magic Shield available near the Golem (defeat Golem to collect) (Μαγική Ασπίδα διαθέσιμη κοντά στον Γκόλεμ - νικήστε τον Γκόλεμ για να τη συλλέξετε)</small>
          </div>
        )}
      </div>

      {/* Bag Section */}
      {(hero.bag.weapon.length > 0 || hero.bag.shield.length > 0 || hero.bag.armor.length > 0) && (
        <div className="hud-section">
          <h3>Bag (Τσάντα)</h3>
          <div className="bag-grid">
            {hero.bag.weapon.length > 0 && (
              <div className="bag-category">
                <strong>Weapons: (Όπλα:)</strong>
                {hero.bag.weapon.map((itemType, index) => (
                  <div 
                    key={`weapon-${index}`}
                    className="bag-item clickable"
                    onClick={() => dispatch({ type: 'EQUIP_FROM_BAG', payload: { slot: 'weapon', itemType } })}
                    title={`Click to equip ${EQUIPMENT_ITEMS[itemType].name}`}
                  >
                    {EQUIPMENT_ITEMS[itemType].name}
                  </div>
                ))}
              </div>
            )}
            {hero.bag.shield.length > 0 && (
              <div className="bag-category">
                <strong>Shields: (Ασπίδες:)</strong>
                {hero.bag.shield.map((itemType, index) => (
                  <div 
                    key={`shield-${index}`}
                    className="bag-item clickable"
                    onClick={() => dispatch({ type: 'EQUIP_FROM_BAG', payload: { slot: 'shield', itemType } })}
                    title={`Click to equip ${EQUIPMENT_ITEMS[itemType].name}`}
                  >
                    {EQUIPMENT_ITEMS[itemType].name}
                  </div>
                ))}
              </div>
            )}
            {hero.bag.armor.length > 0 && (
              <div className="bag-category">
                <strong>Armor: (Θωράκιση:)</strong>
                {hero.bag.armor.map((itemType, index) => (
                  <div 
                    key={`armor-${index}`}
                    className="bag-item clickable"
                    onClick={() => dispatch({ type: 'EQUIP_FROM_BAG', payload: { slot: 'armor', itemType } })}
                    title={`Click to equip ${itemType.name}`}
                  >
                    {itemType.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="hud-section">
        <h3>Quest Progress (Πρόοδος Αποστολής)</h3>
        <div className="monsters-remaining">
          Monsters: (Τέρατα:) {aliveMonsters}/{totalMonsters} {
            currentMapId === 'main' ? '(17 total)' : 
            currentMapId === 'dungeon' ? '(12 total)' :
            currentMapId === 'volcano' ? '(15 total)' : '(unknown)'
          } {
            currentMapId === 'main' ? '(17 συνολικά)' : 
            currentMapId === 'dungeon' ? '(12 συνολικά)' :
            currentMapId === 'volcano' ? '(15 συνολικά)' : '(άγνωστο)'
          }
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
        {currentMapId === 'volcano' && (
          <div className="potions-remaining">
            Potions: (Φίλτρα:) {currentMap.items.filter(item => item.type === 'potion' && !item.isCollected).length}/5 remaining (απομένουν)
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
      
      {/* Trap activation message */}
      {battle.battleMessage && (battle.battleMessage.includes('trap') || battle.battleMessage.includes('παγίδα')) && (
        <div className="trap-message">
          <div className="trap-icon">💥</div>
          <div className="trap-text">{battle.battleMessage}</div>
        </div>
      )}
    </div>
  );
}

export default HUD; 