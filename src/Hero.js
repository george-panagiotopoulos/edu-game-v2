import React from 'react';
import { TILE_SIZE, EQUIPMENT_TYPES } from './constants';
import { useGame, EQUIPMENT_ITEMS } from './GameState';
import { getHeroAsset, getEquipmentAsset, getItemAsset } from './AssetManager';

function Hero({ x, y }) {
  const { state } = useGame();
  const { hero } = state;
  
  // Helper function to generate tooltip text for equipment
  const getEquipmentTooltipText = (equipmentType) => {
    const equipment = EQUIPMENT_ITEMS[equipmentType];
    if (!equipment) return '';
    
    let tooltipText = `<strong>${equipment.name}</strong><br/>`;
    
    if (equipment.type === 'weapon' || equipment.type === EQUIPMENT_TYPES.WEAPON) {
      tooltipText += `+${equipment.damageBonus} damage bonus<br/>`;
      if (equipment.criticalChance) {
        tooltipText += `${Math.round(equipment.criticalChance * 100)}% critical strike chance<br/>`;
      }
      tooltipText += `(+${equipment.damageBonus} μπόνους ζημιάς<br/>`;
      if (equipment.criticalChance) {
        tooltipText += `${Math.round(equipment.criticalChance * 100)}% πιθανότητα κρίσιμης κρούσης)`;
      } else {
        tooltipText += ')';
      }
    } else if (equipment.type === 'shield' || equipment.type === EQUIPMENT_TYPES.SHIELD) {
      tooltipText += `${Math.round(equipment.blockChance * 100)}% block chance<br/>`;
      if (equipmentType === 'magicShield') {
        tooltipText += `(increases to 40% when HP < 40)<br/>`;
      }
      tooltipText += `(${Math.round(equipment.blockChance * 100)}% πιθανότητα αποκλεισμού<br/>`;
      if (equipmentType === 'magicShield') {
        tooltipText += `(αυξάνεται στο 40% όταν HP < 40))`;
      } else {
        tooltipText += ')';
      }
    } else if (equipment.type === 'armor' || equipment.type === EQUIPMENT_TYPES.ARMOR) {
      if (typeof equipment.defense === 'number') {
        tooltipText += `-${equipment.defense} damage reduction`;
        if (equipment.fireImmune) {
          tooltipText += `, Fire Immune`;
        }
        tooltipText += `<br/>`;
        tooltipText += `(-${equipment.defense} μείωση ζημιάς`;
        if (equipment.fireImmune) {
          tooltipText += `, Ανοσία στη φωτιά`;
        }
        tooltipText += `)`;
      }
    }
    
    return tooltipText;
  };
  
  return (
    <div
      className="hero"
      style={{
        position: 'absolute',
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(${getHeroAsset()})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 10,
        transition: 'all 0.2s ease',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
      }}
    >
      {/* Equipped weapon (left top) */}
      {hero.equipment.weapon && (
        <div
          className="equipped-weapon"
          style={{
            position: 'absolute',
            left: '5%',
            top: '5%',
            width: '15%',
            height: '15%',
            backgroundImage: `url(${getEquipmentAsset(hero.equipment.weapon)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            border: '1px solid #FFD700',
            borderRadius: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
          title="Equipped Weapon"
        >
          {/* Full resolution weapon tooltip */}
          <div className="equipment-tooltip weapon-tooltip">
            <img 
              src={getEquipmentAsset(hero.equipment.weapon)} 
              alt="Weapon" 
              className="tooltip-image"
            />
            <div className="tooltip-text" 
                 dangerouslySetInnerHTML={{ __html: getEquipmentTooltipText(hero.equipment.weapon) }}
            />
          </div>
        </div>
      )}
      
      {/* Equipped armor (bottom left) */}
      {hero.equipment.armor && (
        <div
          className="equipped-armor"
          style={{
            position: 'absolute',
            left: '5%',
            bottom: '5%',
            width: '15%',
            height: '15%',
            backgroundImage: `url(${getEquipmentAsset(hero.equipment.armor)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            border: '1px solid #FFD700',
            borderRadius: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
          title="Equipped Armor"
        >
          {/* Full resolution armor tooltip */}
          <div className="equipment-tooltip armor-tooltip">
            <img 
              src={getEquipmentAsset(hero.equipment.armor)} 
              alt="Armor" 
              className="tooltip-image"
            />
            <div 
              className="tooltip-text"
              dangerouslySetInnerHTML={{ __html: getEquipmentTooltipText(hero.equipment.armor) }}
            />
          </div>
        </div>
      )}
      
      {/* Equipped shield (top right) */}
      {hero.equipment.shield && (
        <div
          className="equipped-shield"
          style={{
            position: 'absolute',
            right: '5%',
            top: '5%',
            width: '15%',
            height: '15%',
            backgroundImage: `url(${getEquipmentAsset(hero.equipment.shield)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            border: '1px solid #C0C0C0',
            borderRadius: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
          title="Equipped Shield"
        >
          {/* Full resolution shield tooltip */}
          <div className="equipment-tooltip shield-tooltip">
            <img 
              src={getEquipmentAsset(hero.equipment.shield)} 
              alt="Shield" 
              className="tooltip-image"
            />
            <div className="tooltip-text" 
                 dangerouslySetInnerHTML={{ __html: getEquipmentTooltipText(hero.equipment.shield) }}
            />
          </div>
        </div>
      )}
      
      {/* Equipped ring (bottom right) */}
      {hero.equipment.ring && (
        <div
          className="equipped-ring"
          style={{
            position: 'absolute',
            right: '5%',
            bottom: '5%',
            width: '15%',
            height: '15%',
            backgroundImage: `url(${getEquipmentAsset(hero.equipment.ring)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            border: '1px solid #FFD700',
            borderRadius: '2px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
          title="Equipped Ring"
        >
          {/* Full resolution ring tooltip */}
          <div className="equipment-tooltip ring-tooltip">
            <img 
              src={getEquipmentAsset('ring')} 
              alt="Ring" 
              className="tooltip-image"
            />
            <div className="tooltip-text">
              <strong>Ring of Knowledge</strong><br/>
              {hero.ringCharges || 0} charges remaining<br/>
              Skip riddles with charges<br/>
              (Δαχτυλίδι Γνώσης)<br/>
              {hero.ringCharges || 0} χρήσεις ακόμα
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero; 