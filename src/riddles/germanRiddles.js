// German Language Riddles - Translation exercises between German and Greek

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// German to Greek translation riddles
export const germanToGreekRiddles = [
  // Animals
  {
    question: "Wie sagt man 'Hund' auf Griechisch?",
    options: shuffleArray(["σκύλος", "γάτα", "πούλι", "ψάρι"]),
    answer: "σκύλος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Katze' auf Griechisch?",
    options: shuffleArray(["σκύλος", "γάτα", "πούλι", "ψάρι"]),
    answer: "γάτα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Vogel' auf Griechisch?",
    options: shuffleArray(["σκύλος", "γάτα", "ποuλί", "ψάρι"]),
    answer: "ποuλί",
    category: "German"
  },
  {
    question: "Wie sagt man 'Fisch' auf Griechisch?",
    options: shuffleArray(["σκύλος", "γάτα", "πούλι", "ψάρι"]),
    answer: "ψάρι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Pferd' auf Griechisch?",
    options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]),
    answer: "άλογο",
    category: "German"
  },
  {
    question: "Wie sagt man 'Kuh' auf Griechisch?",
    options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]),
    answer: "αγελάδα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schaf' auf Griechisch?",
    options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]),
    answer: "πρόβατο",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schwein' auf Griechisch?",
    options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]),
    answer: "γουρούνι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Hase' auf Griechisch?",
    options: shuffleArray(["κουνέλι", "αλεπού", "αρκούδα", "λύκος"]),
    answer: "κουνέλι",
    category: "German"
  },
  {
    question: "Wie sagt man 'Fuchs' auf Griechisch?",
    options: shuffleArray(["κουνέλι", "αλεπού", "αρκούδα", "λύκος"]),
    answer: "αλεπού",
    category: "German"
  },
  // Family members
  {
    question: "Wie sagt man 'Mutter' auf Griechisch?",
    options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]),
    answer: "μητέρα",
    category: "German"
  },
  {
    question: "Wie sagt man 'Vater' auf Griechisch?",
    options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]),
    answer: "πατέρας",
    category: "German"
  },
  {
    question: "Wie sagt man 'Sohn' auf Griechisch?",
    options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]),
    answer: "γιος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Tochter' auf Griechisch?",
    options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]),
    answer: "κόρη",
    category: "German"
  },
  {
    question: "Wie sagt man 'Bruder' auf Griechisch?",
    options: shuffleArray(["αδελφός", "αδελφή", "παππούς", "γιαγιά"]),
    answer: "αδελφός",
    category: "German"
  },
  {
    question: "Wie sagt man 'Schwester' auf Griechisch?",
    options: shuffleArray(["αδελφός", "αδελφή", "παππούς", "γιαγιά"]),
    answer: "αδελφή",
    category: "German"
  },
  {
    question: "Wie sagt man 'Großvater' auf Griechisch?",
    options: shuffleArray(["αδελφός", "αδελφή", "παππούς", "γιαγιά"]),
    answer: "παππούς",
    category: "German"
  },
  {
    question: "Wie sagt man 'Großmutter' auf Griechisch?",
    options: shuffleArray(["αδελφός", "αδελφή", "παππούς", "γιαγιά"]),
    answer: "γιαγιά",
    category: "German"
  },
  {
    question: "Wie sagt man 'Onkel' auf Griechisch?",
    options: shuffleArray(["θείος", "θεία", "ανιψιός", "ανιψιά"]),
    answer: "θείος",
    category: "German"
  },
  {
    question: "Wie sagt man 'Tante' auf Griechisch?",
    options: shuffleArray(["θείος", "θεία", "ανιψιός", "ανιψιά"]),
    answer: "θεία",
    category: "German"
  }
];

// Greek to German translation riddles
export const greekToGermanRiddles = [
  // Animals
  {
    question: "Πώς λέγεται το 'σκύλος' στα γερμανικά;",
    options: shuffleArray(["Hund", "Katze", "Vogel", "Fisch"]),
    answer: "Hund",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'γάτα' στα γερμανικά;",
    options: shuffleArray(["Hund", "Katze", "Vogel", "Fisch"]),
    answer: "Katze",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'ποuλί' στα γερμανικά;",
    options: shuffleArray(["Hund", "Katze", "Vogel", "Fisch"]),
    answer: "Vogel",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'ψάρι' στα γερμανικά;",
    options: shuffleArray(["Hund", "Katze", "Vogel", "Fisch"]),
    answer: "Fisch",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'άλογο' στα γερμανικά;",
    options: shuffleArray(["Pferd", "Kuh", "Schaf", "Schwein"]),
    answer: "Pferd",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αγελάδα' στα γερμανικά;",
    options: shuffleArray(["Pferd", "Kuh", "Schaf", "Schwein"]),
    answer: "Kuh",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'πρόβατο' στα γερμανικά;",
    options: shuffleArray(["Pferd", "Kuh", "Schaf", "Schwein"]),
    answer: "Schaf",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'γουρούνι' στα γερμανικά;",
    options: shuffleArray(["Pferd", "Kuh", "Schaf", "Schwein"]),
    answer: "Schwein",
    category: "German"
  },
  {
    question: "Πώς λέγεται το 'κουνέλι' στα γερμανικά;",
    options: shuffleArray(["Hase", "Fuchs", "Bär", "Wolf"]),
    answer: "Hase",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αλεπού' στα γερμανικά;",
    options: shuffleArray(["Hase", "Fuchs", "Bär", "Wolf"]),
    answer: "Fuchs",
    category: "German"
  },
  // Family members
  {
    question: "Πώς λέγεται η 'μητέρα' στα γερμανικά;",
    options: shuffleArray(["Mutter", "Vater", "Sohn", "Tochter"]),
    answer: "Mutter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'πατέρας' στα γερμανικά;",
    options: shuffleArray(["Mutter", "Vater", "Sohn", "Tochter"]),
    answer: "Vater",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'γιος' στα γερμανικά;",
    options: shuffleArray(["Mutter", "Vater", "Sohn", "Tochter"]),
    answer: "Sohn",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'κόρη' στα γερμανικά;",
    options: shuffleArray(["Mutter", "Vater", "Sohn", "Tochter"]),
    answer: "Tochter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'αδελφός' στα γερμανικά;",
    options: shuffleArray(["Bruder", "Schwester", "Großvater", "Großmutter"]),
    answer: "Bruder",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'αδελφή' στα γερμανικά;",
    options: shuffleArray(["Bruder", "Schwester", "Großvater", "Großmutter"]),
    answer: "Schwester",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'παππούς' στα γερμανικά;",
    options: shuffleArray(["Bruder", "Schwester", "Großvater", "Großmutter"]),
    answer: "Großvater",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'γιαγιά' στα γερμανικά;",
    options: shuffleArray(["Bruder", "Schwester", "Großvater", "Großmutter"]),
    answer: "Großmutter",
    category: "German"
  },
  {
    question: "Πώς λέγεται ο 'θείος' στα γερμανικά;",
    options: shuffleArray(["Onkel", "Tante", "Cousin", "Cousine"]),
    answer: "Onkel",
    category: "German"
  },
  {
    question: "Πώς λέγεται η 'θεία' στα γερμανικά;",
    options: shuffleArray(["Onkel", "Tante", "Cousin", "Cousine"]),
    answer: "Tante",
    category: "German"
  }
];

// Forest-specific German math riddles (numbers as words)
export const forestGermanMathRiddles = [
  {
    question: "Was ist eins plus zwei?",
    options: shuffleArray(["drei", "vier", "fünf", "sechs"]),
    answer: "drei",
    category: "Forest-German"
  },
  {
    question: "Was ist fünf plus drei?",
    options: shuffleArray(["sieben", "acht", "neun", "zehn"]),
    answer: "acht",
    category: "Forest-German"
  },
  {
    question: "Was ist sieben plus vier?",
    options: shuffleArray(["zehn", "elf", "zwölf", "dreizehn"]),
    answer: "elf",
    category: "Forest-German"
  },
  {
    question: "Was ist neun plus sechs?",
    options: shuffleArray(["vierzehn", "fünfzehn", "sechzehn", "siebzehn"]),
    answer: "fünfzehn",
    category: "Forest-German"
  },
  {
    question: "Was ist acht plus sieben?",
    options: shuffleArray(["vierzehn", "fünfzehn", "sechzehn", "siebzehn"]),
    answer: "fünfzehn",
    category: "Forest-German"
  },
  {
    question: "Was ist zehn minus drei?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Forest-German"
  },
  {
    question: "Was ist zwölf minus fünf?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Forest-German"
  },
  {
    question: "Was ist fünfzehn minus acht?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Forest-German"
  },
  {
    question: "Was ist elf minus vier?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Forest-German"
  }
];