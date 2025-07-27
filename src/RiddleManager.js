// Riddle Manager - Centralized riddle system for the educational RPG game

// Import riddles from separate files
import { generateMathRiddles, volcanoMathRiddles } from './riddles/mathRiddles.js';
import { geographyRiddles, volcanoGeographyProximityRiddles } from './riddles/geographyRiddles.js';
import { germanToGreekRiddles, greekToGermanRiddles } from './riddles/germanRiddles.js';
import { spellingRiddles } from './riddles/spellingRiddles.js';

// Generate math riddles dynamically
const mathRiddles = generateMathRiddles();

// Combine all riddles
const allRiddles = [...mathRiddles, ...geographyRiddles, ...spellingRiddles, ...germanToGreekRiddles, ...greekToGermanRiddles, ...volcanoMathRiddles, ...volcanoGeographyProximityRiddles];

// Function to generate a random riddle
export function generateRandomRiddle() {
  return allRiddles[Math.floor(Math.random() * allRiddles.length)];
}

// Function to generate a random riddle for specific map
export function generateRandomRiddleForMap(mapId) {
  if (mapId === 'dungeon') {
    // In dungeon, only German and spelling riddles
    const dungeonRiddles = [...germanToGreekRiddles, ...greekToGermanRiddles, ...spellingRiddles];
    return dungeonRiddles[Math.floor(Math.random() * dungeonRiddles.length)];
  } else if (mapId === 'volcano') {
    // In volcano, only volcano-specific categories
    const volcanoRiddles = [...volcanoMathRiddles, ...volcanoGeographyProximityRiddles];
    return volcanoRiddles[Math.floor(Math.random() * volcanoRiddles.length)];
  } else {
    // In main map, all riddles EXCEPT volcano-specific ones
    const mainMapRiddles = [...mathRiddles, ...geographyRiddles, ...spellingRiddles, ...germanToGreekRiddles, ...greekToGermanRiddles];
    return mainMapRiddles[Math.floor(Math.random() * mainMapRiddles.length)];
  }
}

// Function to get riddles by category
export function getRiddlesByCategory(category) {
  return allRiddles.filter(riddle => riddle.category === category);
}

// Function to get all math riddles
export function getMathRiddles() {
  return mathRiddles;
}

// Function to get all geography riddles
export function getGeographyRiddles() {
  return geographyRiddles;
}

// Function to get all spelling riddles
export function getSpellingRiddles() {
  return spellingRiddles;
}

// Function to get all German riddles
export function getGermanRiddles() {
  return [...germanToGreekRiddles, ...greekToGermanRiddles];
}

// Function to get German to Greek riddles only
export function getGermanToGreekRiddles() {
  return germanToGreekRiddles;
}

// Function to get Greek to German riddles only
export function getGreekToGermanRiddles() {
  return greekToGermanRiddles;
}

// Function to get volcano math riddles only
export function getVolcanoMathRiddles() {
  return volcanoMathRiddles;
}

// Function to get volcano geography proximity riddles only
export function getVolcanoGeographyProximityRiddles() {
  return volcanoGeographyProximityRiddles;
}

// Function to get total number of riddles
export function getTotalRiddles() {
  return allRiddles.length;
}

// Function to regenerate math riddles (useful for variety)
export function regenerateMathRiddles() {
  const newMathRiddles = generateMathRiddles();
  // Update the allRiddles array
  const nonMathRiddles = allRiddles.filter(riddle => riddle.category !== "Math");
  allRiddles.length = 0;
  allRiddles.push(...newMathRiddles, ...nonMathRiddles);
  return newMathRiddles;
}

// Export individual riddle arrays for testing
export { mathRiddles, geographyRiddles, spellingRiddles, germanToGreekRiddles, greekToGermanRiddles, volcanoMathRiddles, volcanoGeographyProximityRiddles, allRiddles }; 