import React from 'react';
import { useGame } from './GameState';
import { getEquipmentAsset } from './AssetManager';

function Shop() {
  const { state, dispatch } = useGame();
  const { hero, shop, currentMapId, maps } = state;
  const currentMap = maps[currentMapId];

  // Item values (buy price, sell price is 50% rounded down)
  const itemValues = {
    sword: { name: 'Iron Sword', buyPrice: 3, sellPrice: 2 },
    shield: { name: 'Knight Shield', buyPrice: 4, sellPrice: 2 },
    magicShield: { name: 'Magic Shield', buyPrice: 6, sellPrice: 3 },
    armor: { name: 'Basic Armor', buyPrice: 4, sellPrice: 2 },
    redArmor: { name: 'Red Armor', buyPrice: 6, sellPrice: 3 },
    dungeonArmor: { name: 'Dungeon Armor', buyPrice: 3, sellPrice: 2 },
    axe: { name: 'Magic Axe', buyPrice: 6, sellPrice: 3 },
    flamingSword: { name: 'Flaming Sword', buyPrice: 7, sellPrice: 4 },
    portablePotion: { name: 'Portable Healing Potion', buyPrice: 3, sellPrice: 2 }
  };

  // Shop inventory - use map's shop inventory if available, otherwise use default
  const getShopInventory = () => {
    // If map has a shop configuration, use that inventory
    if (currentMap.shop && currentMap.shop.inventory) {
      return currentMap.shop.inventory.map(item => ({
        ...item,
        quantity: 1 // Show 1 of each item for Crossroads shop
      }));
    }
    
    // Default shop inventory (for dungeon)
    const currentPortableCount = hero.portableItems.filter(item => item.type === 'portablePotion').length;
    const maxPortablePotions = 3;
    const remainingPortablePotions = Math.max(0, maxPortablePotions - currentPortableCount);
    
    return [
      { 
        type: 'portablePotion', 
        name: 'Portable Healing Potion', 
        price: 3, 
        quantity: remainingPortablePotions 
      }
    ];
  };

  const shopInventory = getShopInventory();

  const handleBuyItem = (item, index) => {
    if (hero.gold >= item.price && item.quantity > 0) {
      dispatch({ 
        type: 'SHOP_BUY_ITEM', 
        payload: { 
          itemType: item.type, 
          price: item.price,
          name: item.name,
          index: index // Pass index to remove from shop
        } 
      });
    }
  };

  const handleSellItem = (itemType, itemName) => {
    const itemValue = itemValues[itemType];
    if (itemValue) {
      dispatch({ 
        type: 'SHOP_SELL_ITEM', 
        payload: { 
          itemType: itemType,
          price: itemValue.sellPrice,
          name: itemName
        } 
      });
    }
  };

  const handleSellPortableItem = (itemId, itemType, itemName) => {
    const itemValue = itemValues[itemType];
    if (itemValue) {
      dispatch({ 
        type: 'SHOP_SELL_PORTABLE_ITEM', 
        payload: { 
          itemId: itemId,
          itemType: itemType,
          price: itemValue.sellPrice,
          name: itemName
        } 
      });
    }
  };

  const handleCloseShop = () => {
    dispatch({ type: 'CLOSE_SHOP' });
  };

  // Get equipped items that can be sold
  // Get equipped items that can be sold - REMOVED: no longer selling equipped items
  const getEquippedItems = () => {
    return []; // Empty array - no longer selling equipped items
  };

  const getBagItems = () => {
    const items = [];
    
    // Add items from bag
    Object.entries(hero.bag).forEach(([slot, bagItems]) => {
      bagItems.forEach(itemType => {
        const itemValue = itemValues[itemType];
        if (itemValue) {
          items.push({
            type: itemType,
            name: itemValue.name,
            price: itemValue.sellPrice,
            slot: slot,
            fromBag: true
          });
        }
      });
    });

    return items;
  };

  const getPortableItems = () => {
    const items = [];
    
    // Add portable items
    hero.portableItems.forEach((portableItem, index) => {
      const itemValue = itemValues[portableItem.type];
      if (itemValue) {
        items.push({
          type: portableItem.type,
          name: itemValue.name,
          price: itemValue.sellPrice,
          itemId: portableItem.id,
          fromPortable: true,
          index: index
        });
      }
    });

    return items;
  };

  const equippedItems = getEquippedItems();
  const bagItems = getBagItems();
  const portableItems = getPortableItems();

  return (
    <div className="shop-overlay">
      <div className="shop-modal">
        <div className="shop-header">
          <h2>🏪 Shop (Κατάστημα)</h2>
          <button className="close-btn" onClick={handleCloseShop}>✕</button>
        </div>
        
        <div className="shop-content">
          <div className="shop-gold">
            <span className="gold-icon">💰</span>
            <span className="gold-amount">{hero.gold || 0} Gold</span>
          </div>
          
          <div className="shop-sections">
            {/* Buy Section */}
            <div className="shop-section">
              <h3>🛒 Buy Items (Αγορά Αντικειμένων)</h3>
              <div className="shop-items">
                {shopInventory.map((item, index) => (
                  <div key={`buy-${index}`} className="shop-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">💰 {item.price} Gold</span>
                      <span className="item-quantity">({item.quantity} left)</span>
                    </div>
                    <button 
                      className="buy-btn"
                      onClick={() => handleBuyItem(item, index)}
                      disabled={hero.gold < item.price || item.quantity <= 0}
                    >
                      {item.quantity <= 0 ? 'Sold Out' : 'Buy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sell Section */}
            <div className="shop-section">
              <h3>💰 Sell Items (Πώληση Αντικειμένων)</h3>
              
              {/* Portable Items */}
              {portableItems.length > 0 && (
                <div className="sell-category">
                  <h4>Portable Items (Φορητά Αντικείμενα)</h4>
                  <div className="shop-items">
                    {portableItems.map((item, index) => (
                      <div key={`sell-portable-${index}`} className="shop-item">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">💰 {item.price} Gold</span>
                        </div>
                        <button 
                          className="sell-btn"
                          onClick={() => handleSellPortableItem(item.itemId, item.type, item.name)}
                        >
                          Sell
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bag Items */}
              {bagItems.length > 0 && (
                <div className="sell-category">
                  <h4>Bag Items (Αντικείμενα Τσάντας)</h4>
                  <div className="shop-items">
                    {bagItems.map((item, index) => (
                      <div key={`sell-bag-${index}`} className="shop-item">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">💰 {item.price} Gold</span>
                        </div>
                        <button 
                          className="sell-btn"
                          onClick={() => handleSellItem(item.type, item.name)}
                        >
                          Sell
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portableItems.length === 0 && bagItems.length === 0 && (
                <p className="no-items">No items to sell</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop; 