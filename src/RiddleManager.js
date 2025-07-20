// Riddle Manager - Centralized riddle system for the educational RPG game

// Function to generate random math riddles
function generateMathRiddles() {
  const mathRiddles = [];
  
  // Generate 15 addition riddles (2-digit numbers)
  for (let i = 0; i < 15; i++) {
    const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
    const correctAnswer = num1 + num2;
    
    // Generate 3 wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrongAnswer = correctAnswer + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 20) + 1);
      if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    
    const options = [correctAnswer.toString(), ...wrongAnswers.map(a => a.toString())];
    // Shuffle options
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    
    mathRiddles.push({
      question: `What is ${num1} + ${num2}?`,
      options: options,
      answer: correctAnswer.toString(),
      category: "Math"
    });
  }
  
  // Generate 15 subtraction riddles (2-digit numbers)
  for (let i = 0; i < 15; i++) {
    const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    const num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1-1
    const correctAnswer = num1 - num2;
    
    // Generate 3 wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrongAnswer = correctAnswer + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 15) + 1);
      if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer) && wrongAnswer >= 0) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    
    const options = [correctAnswer.toString(), ...wrongAnswers.map(a => a.toString())];
    // Shuffle options
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    
    mathRiddles.push({
      question: `What is ${num1} - ${num2}?`,
      options: options,
      answer: correctAnswer.toString(),
      category: "Math"
    });
  }
  
  // Generate 15 multiplication riddles (numbers 1-12)
  for (let i = 0; i < 15; i++) {
    const num1 = Math.floor(Math.random() * 12) + 1; // 1-12
    const num2 = Math.floor(Math.random() * 12) + 1; // 1-12
    const correctAnswer = num1 * num2;
    
    // Generate 3 wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrongAnswer = correctAnswer + (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
      if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer) && wrongAnswer > 0) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    
    const options = [correctAnswer.toString(), ...wrongAnswers.map(a => a.toString())];
    // Shuffle options
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    
    mathRiddles.push({
      question: `What is ${num1} × ${num2}?`,
      options: options,
      answer: correctAnswer.toString(),
      category: "Math"
    });
  }
  
  return mathRiddles;
}

// Geography riddles in Greek
const geographyRiddles = [
  {
    question: "Ποια είναι η πρωτεύουσα της Αγγλίας;",
    options: ["Λονδίνο", "Μάντσεστερ", "Λίβερπουλ", "Μπέρμιγχαμ"],
    answer: "Λονδίνο",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Γαλλίας;",
    options: ["Λυών", "Μασσαλία", "Παρίσι", "Τουλούζη"],
    answer: "Παρίσι",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ισπανίας;",
    options: ["Βαρκελώνη", "Μαδρίτη", "Σεβίλλη", "Βαλένθια"],
    answer: "Μαδρίτη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ιταλίας;",
    options: ["Μιλάνο", "Ρώμη", "Νάπολη", "Φλωρεντία"],
    answer: "Ρώμη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ελλάδας;",
    options: ["Θεσσαλονίκη", "Αθήνα", "Πάτρα", "Ηράκλειο"],
    answer: "Αθήνα",
    category: "Geography"
  },
  // New geography riddles as requested
  {
    question: "Ποια είναι η πρωτεύουσα της Ρουμανίας;",
    options: ["Βουκουρέστι", "Κλουζ-Ναπόκα", "Τιμισοάρα", "Ιάσιο"],
    answer: "Βουκουρέστι",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Βουλγαρίας;",
    options: ["Σόφια", "Πλόβντιβ", "Βάρνα", "Μπουργκάς"],
    answer: "Σόφια",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Γερμανίας;",
    options: ["Βερολίνο", "Μόναχο", "Αμβούργο", "Φρανκφούρτη"],
    answer: "Βερολίνο",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ελβετίας;",
    options: ["Βέρνη", "Ζυρίχη", "Γενεύη", "Βασιλεία"],
    answer: "Βέρνη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Αυστρίας;",
    options: ["Βιέννη", "Γκρατς", "Λιντς", "Σάλτσμπουργκ"],
    answer: "Βιέννη",
    category: "Geography"
  }
];

// German to Greek translation riddles
const germanToGreekRiddles = [
  // Animals
  {
    question: "Wie sagt man 'Hund' auf Griechisch?",
    options: ["σκύλος", "γάτα", "πούλι", "ψάρι"],
    answer: "σκύλος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Katze' auf Griechisch?",
    options: ["σκύλος", "γάτα", "πούλι", "ψάρι"],
    answer: "γάτα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Vogel' auf Griechisch?",
    options: ["σκύλος", "γάτα", "πούλι", "ψάρι"],
    answer: "πούλι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Fisch' auf Griechisch?",
    options: ["σκύλος", "γάτα", "πούλι", "ψάρι"],
    answer: "ψάρι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Pferd' auf Griechisch?",
    options: ["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"],
    answer: "άλογο",
    category: "German"
  },
  {
    question: "Wie sagt man 'Kuh' auf Griechisch?",
    options: ["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"],
    answer: "αγελάδα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schaf' auf Griechisch?",
    options: ["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"],
    answer: "πρόβατο",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schwein' auf Griechisch?",
    options: ["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"],
    answer: "γουρούνι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Hase' auf Griechisch?",
    options: ["κουνέλι", "αλεπού", "αρκούδα", "λύκος"],
    answer: "κουνέλι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Fuchs' auf Griechisch?",
    options: ["κουνέλι", "αλεπού", "αρκούδα", "λύκος"],
    answer: "αλεπού",
    category: "German"
  },
  // Family members
  {
    question: "Wie sagt man 'Mutter' auf Griechisch?",
    options: ["μητέρα", "πατέρας", "γιος", "κόρη"],
    answer: "μητέρα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Vater' auf Griechisch?",
    options: ["μητέρα", "πατέρας", "γιος", "κόρη"],
    answer: "πατέρας",
    category: "German"
  },
  {
    question: "Wie sagt man 'Sohn' auf Griechisch?",
    options: ["μητέρα", "πατέρας", "γιος", "κόρη"],
    answer: "γιος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Tochter' auf Griechisch?",
    options: ["μητέρα", "πατέρας", "γιος", "κόρη"],
    answer: "κόρη",
    category: "German"
  },
  {
    question: "Wie sagt man 'Bruder' auf Griechisch?",
    options: ["αδελφός", "αδελφή", "παππούς", "γιαγιά"],
    answer: "αδελφός",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schwester' auf Griechisch?",
    options: ["αδελφός", "αδελφή", "παππούς", "γιαγιά"],
    answer: "αδελφή",
    category: "German"
  },
  {
    question: "Wie sagt man 'Großvater' auf Griechisch?",
    options: ["αδελφός", "αδελφή", "παππούς", "γιαγιά"],
    answer: "παππούς",
    category: "German"
  },
  {
    question: "Wie sagt man 'Großmutter' auf Griechisch?",
    options: ["αδελφός", "αδελφή", "παππούς", "γιαγιά"],
    answer: "γιαγιά",
    category: "German"
  },
  {
    question: "Wie sagt man 'Onkel' auf Griechisch?",
    options: ["θείος", "θεία", "ανιψιός", "ανιψιά"],
    answer: "θείος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Tante' auf Griechisch?",
    options: ["θείος", "θεία", "ανιψιός", "ανιψιά"],
    answer: "θεία",
    category: "German"
  }
];

// Greek to German translation riddles
const greekToGermanRiddles = [
  // Animals
  {
    question: "Πώς λέγεται το 'σκύλος' στα γερμανικά;",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    answer: "Hund",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'γάτα' στα γερμανικά;",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    answer: "Katze",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'πούλι' στα γερμανικά;",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    answer: "Vogel",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'ψάρι' στα γερμανικά;",
    options: ["Hund", "Katze", "Vogel", "Fisch"],
    answer: "Fisch",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'άλογο' στα γερμανικά;",
    options: ["Pferd", "Kuh", "Schaf", "Schwein"],
    answer: "Pferd",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αγελάδα' στα γερμανικά;",
    options: ["Pferd", "Kuh", "Schaf", "Schwein"],
    answer: "Kuh",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'πρόβατο' στα γερμανικά;",
    options: ["Pferd", "Kuh", "Schaf", "Schwein"],
    answer: "Schaf",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'γουρούνι' στα γερμανικά;",
    options: ["Pferd", "Kuh", "Schaf", "Schwein"],
    answer: "Schwein",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'κουνέλι' στα γερμανικά;",
    options: ["Hase", "Fuchs", "Bär", "Wolf"],
    answer: "Hase",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αλεπού' στα γερμανικά;",
    options: ["Hase", "Fuchs", "Bär", "Wolf"],
    answer: "Fuchs",
    category: "German"
  },
  // Family members
  {
    question: "Πώς λέγεται η 'μητέρα' στα γερμανικά;",
    options: ["Mutter", "Vater", "Sohn", "Tochter"],
    answer: "Mutter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'πατέρας' στα γερμανικά;",
    options: ["Mutter", "Vater", "Sohn", "Tochter"],
    answer: "Vater",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'γιος' στα γερμανικά;",
    options: ["Mutter", "Vater", "Sohn", "Tochter"],
    answer: "Sohn",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'κόρη' στα γερμανικά;",
    options: ["Mutter", "Vater", "Sohn", "Tochter"],
    answer: "Tochter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'αδελφός' στα γερμανικά;",
    options: ["Bruder", "Schwester", "Großvater", "Großmutter"],
    answer: "Bruder",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αδελφή' στα γερμανικά;",
    options: ["Bruder", "Schwester", "Großvater", "Großmutter"],
    answer: "Schwester",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'παππούς' στα γερμανικά;",
    options: ["Bruder", "Schwester", "Großvater", "Großmutter"],
    answer: "Großvater",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'γιαγιά' στα γερμανικά;",
    options: ["Bruder", "Schwester", "Großvater", "Großmutter"],
    answer: "Großmutter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'θείος' στα γερμανικά;",
    options: ["Onkel", "Tante", "Cousin", "Cousine"],
    answer: "Onkel",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'θεία' στα γερμανικά;",
    options: ["Onkel", "Tante", "Cousin", "Cousine"],
    answer: "Tante",
    category: "German"
  }
];

// Greek spelling riddles - words with multiple possible spellings
const spellingRiddles = [
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["ποδοσφαιρο", "ποδόσφαιρο", "ποδοσφαιρό", "ποδοσφαίρό"],
    answer: "ποδόσφαιρο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["παγωτο", "παγωτό", "παγώτο", "παγώτό"],
    answer: "παγωτό",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["τυρι", "τυρί", "τυρύ", "τυρύι"],
    answer: "τυρί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["ψωμι", "ψωμί", "ψωμύ", "ψωμύι"],
    answer: "ψωμί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["καφε", "καφαίς", "καφές", "καφέσ"],
    answer: "καφές",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["γλυκο", "γλυκό", "γλυκώ", "γλυκώο"],
    answer: "γλυκό",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["παιδι", "παιδί", "παιδύ", "παιδύι"],
    answer: "παιδί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["σχολειο", "σχολείο", "σχολειό", "σχολειώ"],
    answer: "σχολείο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["βιβλιο", "βιβλίο", "βιβλιό", "βιβλιώ"],
    answer: "βιβλίο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["οικογενεια", "οικογένεια", "οικογενειά", "οικογενειώ"],
    answer: "οικογένεια",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["αυτοκινητο", "αυτοκίνητο", "αυτοκινητό", "αυτοκίνητό"],
    answer: "αυτοκίνητο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["τηλεφωνο", "τηλέφωνο", "τηλέφονο", "τηλέφωνό"],
    answer: "τηλέφωνο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["κομπιουτερ", "κομπιούτερ", "κομπιουτέρ", "κομπιούτέρ"],
    answer: "κομπιούτερ",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["δωματιο", "δωμάτιο", "δομάτιο", "δωμάτιό"],
    answer: "δωμάτιο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["παράθιρο", "παράθυρο", "παραθυρό", "παράθηρό"],
    answer: "παράθυρο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["πώρτα", "πόρτα", "πορτά", "πόρτα"],
    answer: "πόρτα",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["τραπέζη", "τραπέζι", "τραπεζί", "τραπέζί"],
    answer: "τραπέζι",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["κουζήνα", "κουζίνα", "κουζινά", "κουζίνα"],
    answer: "κουζίνα",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["μπανnο", "μπάνιο", "μπανιό", "μπάνηω"],
    answer: "μπάνιο",
    category: "Spelling"
  }
];

// Generate math riddles dynamically
const mathRiddles = generateMathRiddles();

// Combine all riddles
const allRiddles = [...mathRiddles, ...geographyRiddles, ...spellingRiddles, ...germanToGreekRiddles, ...greekToGermanRiddles];

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
  } else {
    // In main map, all riddles including math and geography
    return allRiddles[Math.floor(Math.random() * allRiddles.length)];
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
export { mathRiddles, geographyRiddles, spellingRiddles, germanToGreekRiddles, greekToGermanRiddles, allRiddles }; 