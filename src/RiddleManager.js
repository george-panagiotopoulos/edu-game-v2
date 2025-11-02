// Riddle Manager - Centralized riddle system for the educational RPG game

// Import riddles from separate files
import { generateMathRiddles, volcanoMathRiddles, forestMathRiddles, crossroadsMathRiddles, crossroadsGermanMathRiddles } from './riddles/mathRiddles.js';
import { geographyRiddles, volcanoGeographyProximityRiddles, crossroadsGeographyRiddles } from './riddles/geographyRiddles.js';
import { germanToGreekRiddles, greekToGermanRiddles, forestGermanMathRiddles } from './riddles/germanRiddles.js';
import { spellingRiddles, forestSpellingRiddles, crossroadsTreasureSpellingRiddles } from './riddles/spellingRiddles.js';
import { englishToGreekRiddles, greekToEnglishRiddles } from './riddles/englishRiddles.js';

// Generate math riddles dynamically
const mathRiddles = generateMathRiddles();

// Combine all riddles
const allRiddles = [...mathRiddles, ...geographyRiddles, ...spellingRiddles, ...germanToGreekRiddles, ...greekToGermanRiddles, ...englishToGreekRiddles, ...greekToEnglishRiddles, ...volcanoMathRiddles, ...volcanoGeographyProximityRiddles, ...forestMathRiddles, ...forestSpellingRiddles, ...forestGermanMathRiddles, ...crossroadsMathRiddles, ...crossroadsGeographyRiddles, ...crossroadsGermanMathRiddles, ...crossroadsTreasureSpellingRiddles];

// Function to generate a random riddle
export function generateRandomRiddle() {
  return allRiddles[Math.floor(Math.random() * allRiddles.length)];
}

// Function to generate a random riddle for specific map
export function generateRandomRiddleForMap(mapId) {
  if (mapId === 'dungeon' || mapId === 'dungeonLevel2') {
    // In dungeon level 2, use ALL available riddles (now includes English)
    if (mapId === 'dungeonLevel2') {
      return allRiddles[Math.floor(Math.random() * allRiddles.length)];
    }
    // In regular dungeon, use German, English, and spelling riddles
    const dungeonRiddles = [...germanToGreekRiddles, ...greekToGermanRiddles, ...englishToGreekRiddles, ...greekToEnglishRiddles, ...spellingRiddles];
    return dungeonRiddles[Math.floor(Math.random() * dungeonRiddles.length)];
  } else if (mapId === 'volcano') {
    // In volcano, only volcano-specific categories
    const volcanoRiddles = [...volcanoMathRiddles, ...volcanoGeographyProximityRiddles];
    return volcanoRiddles[Math.floor(Math.random() * volcanoRiddles.length)];
  } else if (mapId === 'forest') {
    // In forest, only forest-specific categories
    const forestRiddles = [...forestMathRiddles, ...forestSpellingRiddles, ...forestGermanMathRiddles];
    return forestRiddles[Math.floor(Math.random() * forestRiddles.length)];
  } else if (mapId === 'crossroads') {
    // In crossroads, only crossroads-specific categories + shared spelling set
    const crossroadsRiddles = [...crossroadsMathRiddles, ...crossroadsGeographyRiddles, ...crossroadsGermanMathRiddles, ...crossroadsTreasureSpellingRiddles];
    return crossroadsRiddles[Math.floor(Math.random() * crossroadsRiddles.length)];
  } else if (mapId === 'treasureIsland') {
    // In treasure island, include shared spelling set
    const treasureRiddles = [...crossroadsTreasureSpellingRiddles, ...mathRiddles];
    return treasureRiddles[Math.floor(Math.random() * treasureRiddles.length)];
  } else if (mapId === 'trollCastle') {
    // Troll area: English riddles + Crossroads/Treasure spelling + difficult math (crossroads) + sqrt pack
    const sqrtRiddles = [
      { question: "Ποια είναι η τετραγωνική ρίζα του 49;", options: ["5", "6", "7", "8"], answer: "7", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 64;", options: ["6", "7", "8", "9"], answer: "8", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 81;", options: ["7", "8", "9", "10"], answer: "9", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 100;", options: ["8", "9", "10", "11"], answer: "10", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 121;", options: ["10", "11", "12", "13"], answer: "11", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 144;", options: ["10", "11", "12", "13"], answer: "12", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 10000;", options: ["50", "75", "100", "125"], answer: "100", category: "Troll-Math" },
      { question: "Ποια είναι η τετραγωνική ρίζα του 40000;", options: ["150", "175", "200", "250"], answer: "200", category: "Troll-Math" }
    ];
    const trollRiddles = [
      ...englishToGreekRiddles,
      ...greekToEnglishRiddles,
      ...crossroadsTreasureSpellingRiddles,
      ...crossroadsMathRiddles,
      ...sqrtRiddles
    ];
    return trollRiddles[Math.floor(Math.random() * trollRiddles.length)];
  } else {
    // In main map, all riddles EXCEPT volcano-specific, forest-specific, and crossroads-specific ones
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

// Function to get forest math riddles only
export function getForestMathRiddles() {
  return forestMathRiddles;
}

// Function to get forest spelling riddles only
export function getForestSpellingRiddles() {
  return forestSpellingRiddles;
}

// Function to get forest German math riddles only
export function getForestGermanMathRiddles() {
  return forestGermanMathRiddles;
}

// Function to get crossroads math riddles only
export function getCrossroadsMathRiddles() {
  return crossroadsMathRiddles;
}

// Function to get crossroads geography riddles only
export function getCrossroadsGeographyRiddles() {
  return crossroadsGeographyRiddles;
}

// Function to get crossroads German math riddles only
export function getCrossroadsGermanMathRiddles() {
  return crossroadsGermanMathRiddles;
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
export { mathRiddles, geographyRiddles, spellingRiddles, germanToGreekRiddles, greekToGermanRiddles, volcanoMathRiddles, volcanoGeographyProximityRiddles, forestMathRiddles, forestSpellingRiddles, forestGermanMathRiddles, crossroadsMathRiddles, crossroadsGeographyRiddles, crossroadsGermanMathRiddles, allRiddles }; 