// Geography Riddles - Capital cities and geographical knowledge

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Crossroads-specific geography riddles (capital cities)
export const crossroadsGeographyRiddles = [
  {
    question: "Ποια είναι η πρωτεύουσα των ΗΠΑ;",
    options: shuffleArray(["Ουάσιγκτον", "Νέο Δελχί", "Νέα Υόρκη", "Λος Άντζελες"]),
    answer: "Ουάσιγκτον",
    category: "Crossroads-Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα του Μεξικού;",
    options: shuffleArray(["Πεκίνο", "Πόλη του Μεξικού", "Γκουανταλαχάρα", "Μοντερέι"]),
    answer: "Πόλη του Μεξικού",
    category: "Crossroads-Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Κίνας;",
    options: shuffleArray(["Πεκίνο", "Νέο Δελχί", "Σαγκάη", "Χονγκ Κονγκ"]),
    answer: "Πεκίνο",
    category: "Crossroads-Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ινδίας;",
    options: shuffleArray(["Μόσχα", "Νέο Δελχί", "Μουμπάι", "Καλκούτα"]),
    answer: "Νέο Δελχί",
    category: "Crossroads-Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ρωσίας;",
    options: shuffleArray(["Μόσχα", "Αλμάτι", "Αγία Πετρούπολη", "Νοβοσιμπίρσκ"]),
    answer: "Μόσχα",
    category: "Crossroads-Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα του Καζακστάν;",
    options: shuffleArray(["Νουρ-Σουλτάν", "Αλμάτι", "Καραγκάντα", "Σιμκέντ"]),
    answer: "Νουρ-Σουλτάν",
    category: "Crossroads-Geography"
  }
];

// Geography riddles in Greek
export const geographyRiddles = [
  {
    question: "Ποια είναι η πρωτεύουσα της Αγγλίας;",
    options: shuffleArray(["Λονδίνο", "Μάντσεστερ", "Λίβερπουλ", "Μπέρμιγχαμ"]),
    answer: "Λονδίνο",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Γαλλίας;",
    options: shuffleArray(["Λυών", "Μασσαλία", "Παρίσι", "Τουλούζη"]),
    answer: "Παρίσι",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ισπανίας;",
    options: shuffleArray(["Βαρκελώνη", "Μαδρίτη", "Σεβίλλη", "Βαλένθια"]),
    answer: "Μαδρίτη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ιταλίας;",
    options: shuffleArray(["Μιλάνο", "Ρώμη", "Νάπολη", "Φλωρεντία"]),
    answer: "Ρώμη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ελλάδας;",
    options: shuffleArray(["Θεσσαλονίκη", "Αθήνα", "Πάτρα", "Ηράκλειο"]),
    answer: "Αθήνα",
    category: "Geography"
  },
  // New geography riddles as requested
  {
    question: "Ποια είναι η πρωτεύουσα της Ρουμανίας;",
    options: shuffleArray(["Βουκουρέστι", "Κλουζ-Ναπόκα", "Τιμισοάρα", "Ιάσιο"]),
    answer: "Βουκουρέστι",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Βουλγαρίας;",
    options: shuffleArray(["Σόφια", "Πλόβντιβ", "Βάρνα", "Μπουργκάς"]),
    answer: "Σόφια",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Γερμανίας;",
    options: shuffleArray(["Βερολίνο", "Μόναχο", "Αμβούργο", "Φρανκφούρτη"]),
    answer: "Βερολίνο",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Ελβετίας;",
    options: shuffleArray(["Βέρνη", "Ζυρίχη", "Γενεύη", "Βασιλεία"]),
    answer: "Βέρνη",
    category: "Geography"
  },
  {
    question: "Ποια είναι η πρωτεύουσα της Αυστρίας;",
    options: shuffleArray(["Βιέννη", "Γκρατς", "Λιντς", "Σάλτσμπουργκ"]),
    answer: "Βιέννη",
    category: "Geography"
  }
];

// Volcano-specific geography proximity riddles (Greek)
export const volcanoGeographyProximityRiddles = [
  {
    question: "Ποια χώρα είναι δίπλα στη Γαλλία;",
    options: shuffleArray(["Ισπανία", "ΗΠΑ", "Αυστραλία", "Κίνα"]),
    answer: "Ισπανία",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στη Βραζιλία;",
    options: shuffleArray(["Αργεντινή", "ΗΠΑ", "Αυστραλία", "Ιαπωνία"]),
    answer: "Αργεντινή",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στη Νέα Ζηλανδία;",
    options: shuffleArray(["Αυστραλία", "ΗΠΑ", "Καναδάς", "Κίνα"]),
    answer: "Αυστραλία",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στη Νότια Κορέα;",
    options: shuffleArray(["Βόρεια Κορέα", "ΗΠΑ", "Αυστραλία", "Βραζιλία"]),
    answer: "Βόρεια Κορέα",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στη Νότια Κορέα;",
    options: shuffleArray(["Κίνα", "ΗΠΑ", "Αυστραλία", "Βραζιλία"]),
    answer: "Κίνα",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στις ΗΠΑ;",
    options: shuffleArray(["Καναδάς", "Αυστραλία", "Κίνα", "Βραζιλία"]),
    answer: "Καναδάς",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στη Γερμανία;",
    options: shuffleArray(["Γαλλία", "ΗΠΑ", "Αυστραλία", "Κίνα"]),
    answer: "Γαλλία",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στην Ιταλία;",
    options: shuffleArray(["Γαλλία", "ΗΠΑ", "Αυστραλία", "Κίνα"]),
    answer: "Γαλλία",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στην Ισπανία;",
    options: shuffleArray(["Πορτογαλία", "ΗΠΑ", "Αυστραλία", "Κίνα"]),
    answer: "Πορτογαλία",
    category: "Geography-Proximity"
  },
  {
    question: "Ποια χώρα είναι δίπλα στην Ελλάδα;",
    options: shuffleArray(["Τουρκία", "ΗΠΑ", "Αυστραλία", "Βραζιλία"]),
    answer: "Τουρκία",
    category: "Geography-Proximity"
  }
]; 