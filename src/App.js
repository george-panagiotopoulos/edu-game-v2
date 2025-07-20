import React, { useEffect } from 'react';
import { GameProvider, useGame } from './GameState';
import GameMap from './GameMap';
import HUD from './HUD';
import BattleScreen from './BattleScreen';
import './App.css';

function GameContent() {
  const { state, dispatch } = useGame();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (state.battle.isActive) return; // Don't move during battle
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 0, y: -1 } });
          break;
        case 'ArrowDown':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 0, y: 1 } });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: -1, y: 0 } });
          break;
        case 'ArrowRight':
          event.preventDefault();
          dispatch({ type: 'MOVE_HERO', payload: { x: 1, y: 0 } });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, state.battle.isActive]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Educational RPG Adventure (Εκπαιδευτική RPG Περιπέτεια)</h1>
      </div>
      <div className="game-content">
        <GameMap />
        <HUD />
      </div>
      <div className="game-instructions">
        <p>Use arrow keys to move your armored knight through the medieval village! (Χρησιμοποιήστε τα βελάκια για να κινηθείτε με τον θωρακισμένο ιππότη σας μέσα από το μεσαιωνικό χωριό!)</p>
        <p>Explore the rich medieval world with villages, castles, windmills, and varied terrain! (Εξερευνήστε τον πλούσιο μεσαιωνικό κόσμο με χωριά, κάστρα, ανεμόμυλους και ποικίλο έδαφος!)</p>
        <p>Find 14 different monsters - themed placement: water creatures in water, forest creatures in trees, castle guardians in castles! (Βρείτε 14 διαφορετικά τέρατα - θεματική τοποθέτηση: υδρόβια πλάσματα στο νερό, δασικά πλάσματα στα δέντρα, φύλακες κάστρων στα κάστρα!)</p>
        <p>Walk on grass, stone, roads, paths, and crossroads. Avoid water, forests, walls, and buildings! (Περπατήστε σε γρασίδι, πέτρα, δρόμους, μονοπάτια και διασταυρώσεις. Αποφύγετε το νερό, τα δάση, τους τοίχους και τα κτίρια!)</p>
        <p><strong>NEW:</strong> Get close to monsters to trigger epic battles! Choose basic attacks or solve riddles for powerful strikes! (<strong>ΝΕΟ:</strong> Πλησιάστε τα τέρατα για να ενεργοποιήσετε επικές μάχες! Επιλέξτε βασικές επιθέσεις ή λύστε γρίφους για ισχυρές κρούσεις!)</p>
      </div>
      <BattleScreen />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App; 