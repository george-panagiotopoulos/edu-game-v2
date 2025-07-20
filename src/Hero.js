import React from 'react';
import { TILE_SIZE, useGame } from './GameState';
import { getHeroAsset, getEquipmentAsset, getItemAsset } from './AssetManager';

function Hero({ x, y }) {
  const { state } = useGame();
  const { hero } = state;
  
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
            <div className="tooltip-text">
              <strong>Knight Sword</strong><br/>
              +3-5 damage bonus<br/>
              (Ξίφος Ιππότη)<br/>
              +3-5 μπόνους ζημιάς
            </div>
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
            backgroundImage: `url(${getItemAsset('armor')})`,
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
              src={getItemAsset('armor')} 
              alt="Armor" 
              className="tooltip-image"
            />
            <div className="tooltip-text">
              <strong>Knight Armor</strong><br/>
              -2 damage reduction<br/>
              (Πανοπλία Ιππότη)<br/>
              -2 μείωση ζημιάς
            </div>
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
            <div className="tooltip-text">
              <strong>Knight Shield</strong><br/>
              25% block chance<br/>
              (Ασπίδα Ιππότη)<br/>
              25% πιθανότητα αποκλεισμού
            </div>
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
              src={getEquipmentAsset(hero.equipment.ring)} 
              alt="Ring" 
              className="tooltip-image"
            />
            <div className="tooltip-text">
              <strong>Ring of Knowledge</strong><br/>
              {hero.equipment.ring.charges} charges remaining<br/>
              Skip riddles with charges<br/>
              (Δαχτυλίδι Γνώσης)<br/>
              {hero.equipment.ring.charges} χρήσεις ακόμα
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero; 