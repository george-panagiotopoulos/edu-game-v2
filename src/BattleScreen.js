import React, { useState, useEffect } from 'react';
import { useGame } from './GameState';
import { getMonsterAsset, getHeroAsset, getTileAsset } from './AssetManager';

function BattleScreen() {
  const { state, dispatch } = useGame();
  const { battle, hero } = state;
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Auto monster attack after hero's turn
  useEffect(() => {
    if (battle.turn === 'monster' && !battle.awaitingRiddleAnswer) {
      const timer = setTimeout(() => {
        dispatch({ type: 'MONSTER_ATTACK' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [battle.turn, battle.awaitingRiddleAnswer, dispatch]);

  // Clear attack animations after a delay
  useEffect(() => {
    if (battle.heroAttacking || battle.monsterAttacking) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_ATTACK_ANIMATIONS' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [battle.heroAttacking, battle.monsterAttacking, dispatch]);

  // Trigger DEFEAT_MONSTER action when monster is defeated
  useEffect(() => {
    if (battle.turn === 'victory' && battle.currentMonster) {
      dispatch({ type: 'DEFEAT_MONSTER', payload: { monsterId: battle.currentMonster.id } });
    }
  }, [battle.turn, battle.currentMonster, dispatch]);

  if (!battle.isActive) return null;

  const handleBasicAttack = () => {
    dispatch({ type: 'BASIC_ATTACK' });
  };

  const handleRiddleAttack = () => {
    dispatch({ type: 'START_RIDDLE_ATTACK' });
  };

  const handleRiddleAnswer = (answer) => {
    setSelectedAnswer('');
    dispatch({ type: 'ANSWER_RIDDLE', payload: { answer } });
  };

  const handleNextBattle = () => {
    dispatch({ type: 'NEXT_BATTLE' });
  };

  const handleFlee = () => {
    dispatch({ type: 'FLEE_BATTLE' });
  };

  const handleUseRing = () => {
    dispatch({ type: 'USE_RING_CHARGE' });
    // Automatically answer the riddle correctly
    setTimeout(() => {
      dispatch({ type: 'ANSWER_RIDDLE', payload: { answer: battle.currentRiddle.answer } });
    }, 100);
  };

  const getBackgroundColor = () => {
    switch (battle.battleBackground) {
      case 'water':
        return '#2196F3';
      default:
        return '#4CAF50';
    }
  };

  const getBackgroundPattern = () => {
    switch (battle.battleBackground) {
      case 'water':
        return `url(${getTileAsset('water')})`;
      default:
        return `url(${getTileAsset('grass')})`;
    }
  };

  return (
    <div className="battle-overlay">
      <div 
        className="battle-screen"
        style={{
          backgroundImage: getBackgroundPattern(),
          backgroundColor: getBackgroundColor(),
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="battle-header">
          <h2>Battle! (Μάχη!)</h2>
          {battle.battleQueue.length > 0 && (
            <p className="battle-queue">
              +{battle.battleQueue.length} more monster{battle.battleQueue.length > 1 ? 's' : ''} waiting (+{battle.battleQueue.length} επιπλέον τέρατα περιμένουν)
            </p>
          )}
        </div>

        <div className="battle-arena">
          {/* Hero Section */}
          <div className={`battle-hero ${battle.heroAttacking ? 'attacking' : ''} ${battle.monsterAttacking ? 'being-attacked' : ''}`}>
            <div className="character-sprite">
              <img 
                src={getHeroAsset()} 
                alt="Hero" 
                className="hero-battle-sprite"
              />
              {battle.heroAttacking && (
                <div className="attack-effect hero-attack-effect">⚔️</div>
              )}
              {battle.monsterAttacking && (
                <div className="attack-effect monster-attack-effect">💥</div>
              )}
            </div>
            <div className="character-info">
              <div className="character-name">Hero (Ήρωας)</div>
              <div className="health-bar">
                <div 
                  className="health-fill"
                  style={{
                    width: `${(hero.hp / hero.maxHp) * 100}%`,
                    backgroundColor: hero.hp > 60 ? '#4CAF50' : 
                                   hero.hp > 30 ? '#FF9800' : '#F44336'
                  }}
                />
                <div className="health-text">{hero.hp}/{hero.maxHp}</div>
              </div>
            </div>
          </div>

          {/* VS */}
          <div className="battle-vs">VS (ΕΝΑΝΤΙΟΝ)</div>

          {/* Monster Section */}
          <div className={`battle-monster ${battle.monsterAttacking ? 'attacking' : ''} ${battle.heroAttacking ? 'being-attacked' : ''}`}>
            <div className="character-sprite">
              <img 
                src={getMonsterAsset(battle.currentMonster.type)} 
                alt={battle.currentMonster.type}
                className="monster-battle-sprite"
              />
              {battle.monsterAttacking && (
                <div className="attack-effect monster-attack-effect">⚔️</div>
              )}
              {battle.heroAttacking && (
                <div className="attack-effect hero-attack-effect">💥</div>
              )}
            </div>
            <div className="character-info">
              <div className="character-name">{battle.currentMonster.type.toUpperCase()}</div>
              <div className="health-bar">
                <div 
                  className="health-fill"
                  style={{
                    width: `${(battle.currentMonster.hp / battle.currentMonster.maxHp) * 100}%`,
                    backgroundColor: battle.currentMonster.hp > 60 ? '#4CAF50' : 
                                   battle.currentMonster.hp > 30 ? '#FF9800' : '#F44336'
                  }}
                />
                <div className="health-text">
                  {battle.currentMonster.hp}/{battle.currentMonster.maxHp}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Message */}
        <div className="battle-message">
          {battle.battleMessage}
        </div>

        {/* Riddle Section */}
        {battle.awaitingRiddleAnswer && battle.currentRiddle && (
          <div className="riddle-section">
            <h3>{battle.currentRiddle.category} Question: (Ερώτηση:)</h3>
            <div className="riddle-question">
              {battle.currentRiddle.question}
            </div>
            <div className="riddle-options">
              {battle.currentRiddle.options.map((option, index) => (
                <button
                  key={index}
                  className={`riddle-option ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleRiddleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {hero.equipment.ring && hero.equipment.ring.charges > 0 && (
              <div className="ring-usage">
                <button 
                  className="battle-btn ring-btn" 
                  onClick={handleUseRing}
                  title={`Use Ring of Knowledge (${hero.equipment.ring.charges} charges left)`}
                >
                  💍 Use Ring ({hero.equipment.ring.charges} charges)
                  <small>Skip this riddle (Παραλείψτε αυτόν τον γρίφο)</small>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {battle.turn === 'hero' && !battle.awaitingRiddleAnswer && (
          <div className="battle-actions">
            <button className="battle-btn basic-attack" onClick={handleBasicAttack}>
              ⚔️ Basic Attack (Βασική Επίθεση)
              <small>Free attack (10-15 damage) (Δωρεάν επίθεση - 10-15 ζημιά)</small>
            </button>
            <button className="battle-btn riddle-attack" onClick={handleRiddleAttack}>
              ✨ Strong Attack (Ισχυρή Επίθεση)
              <small>Solve riddle (25-35 damage) (Λύστε γρίφο - 25-35 ζημιά)</small>
            </button>
            <button className="battle-btn flee" onClick={handleFlee}>
              🏃 Flee Battle (-2 HP) (Φυγή από τη Μάχη (-2 HP))
            </button>
          </div>
        )}

        {/* Victory/Continue Buttons */}
        {battle.turn === 'victory' && (
          <div className="battle-actions">
            {battle.battleQueue.length > 0 ? (
              <button className="battle-btn continue" onClick={handleNextBattle}>
                ⚔️ Next Battle (Επόμενη Μάχη)
              </button>
            ) : (
              <button className="battle-btn continue" onClick={handleNextBattle}>
                🎉 Victory! (Νίκη!)
              </button>
            )}
          </div>
        )}

        {/* Defeat Button */}
        {battle.turn === 'defeat' && (
          <div className="battle-actions">
            <button className="battle-btn defeat" onClick={handleFlee}>
              💀 You were defeated... (Ηττήθηκες...)
            </button>
          </div>
        )}
        
        {/* Victory Popup */}
        {battle.showVictoryPopup && (
          <div className="victory-popup-overlay">
            <div className="victory-popup">
              <h2>🎉 GAME COMPLETED! 🎉</h2>
              <h3>(ΟΛΟΚΛΗΡΩΣΑΤΕ ΤΟ ΠΑΙΧΝΙΔΙ!)</h3>
              <p>You defeated all monsters and earned a permanent +1 HP bonus!</p>
              <p>(Νικήσατε όλα τα τέρατα και κερδίσατε ένα μόνιμο μπόνους +1 HP!)</p>
              <p>Your hero is now stronger for the next game!</p>
              <p>(Ο ήρωάς σας είναι τώρα πιο δυνατός για το επόμενο παιχνίδι!)</p>
              <button className="victory-btn" onClick={() => dispatch({ type: 'HIDE_VICTORY_POPUP' })}>
                Continue (Συνέχεια)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattleScreen; 