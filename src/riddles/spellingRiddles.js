// Greek Spelling Riddles - Words with multiple possible spellings

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Greek spelling riddles - words with multiple possible spellings
export const spellingRiddles = [
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["ποδοσφαιρο", "ποδόσφαιρο", "ποδοσφαιρό", "ποδοσφαίρό"]),
    answer: "ποδόσφαιρο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["παγωτο", "παγωτό", "παγώτο", "παγώτό"]),
    answer: "παγωτό",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τυρι", "τυρί", "τυρύ", "τυρύι"]),
    answer: "τυρί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["ψωμι", "ψωμί", "ψωμύ", "ψωμύι"]),
    answer: "ψωμί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["καφε", "καφαίς", "καφές", "καφέσ"]),
    answer: "καφές",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["γλυκο", "γλυκό", "γλυκώ", "γλυκώο"]),
    answer: "γλυκό",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["παιδι", "παιδί", "παιδύ", "παιδύι"]),
    answer: "παιδί",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["σχολειο", "σχολείο", "σχολειό", "σχολειώ"]),
    answer: "σχολείο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["βιβλιο", "βιβλίο", "βιβλιό", "βιβλιώ"]),
    answer: "βιβλίο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["οικογενεια", "οικογένεια", "οικογενειά", "οικογενειώ"]),
    answer: "οικογένεια",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["αυτοκινητο", "αυτοκίνητο", "αυτοκινητό", "αυτοκίνητό"]),
    answer: "αυτοκίνητο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τηλεφωνο", "τηλέφωνο", "τηλέφονο", "τηλέφωνό"]),
    answer: "τηλέφωνο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["κομπιουτερ", "κομπιούτερ", "κομπιουτέρ", "κομπιούτέρ"]),
    answer: "κομπιούτερ",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["δωματιο", "δωμάτιο", "δομάτιο", "δωμάτιό"]),
    answer: "δωμάτιο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["παράθιρο", "παράθυρο", "παραθυρό", "παράθηρό"]),
    answer: "παράθυρο",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["πώρτα", "πόρτα", "πορτά", "πόρτα"]),
    answer: "πόρτα",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τραπέζη", "τραπέζι", "τραπεζί", "τραπέζί"]),
    answer: "τραπέζι",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["κουζήνα", "κουζίνα", "κουζινά", "κουζίνα"]),
    answer: "κουζίνα",
    category: "Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["μπανnο", "μπάνιο", "μπανιό", "μπάνηω"]),
    answer: "μπάνιο",
    category: "Spelling"
  }
];

// Forest-specific spelling riddles
export const forestSpellingRiddles = [
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["θάλασσα", "θάλλασα", "θάλασα", "θάλλασσα"],
    answer: "θάλασσα",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["άλλος", "άλος", "άλλως", "άλλλος"],
    answer: "άλλος",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["μπιφτέκι", "μπιφταίκι", "μπηφτέκι", "μπιφτέκυ"],
    answer: "μπιφτέκι",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["παγώνο", "παγόνο", "παγόνω", "παγώνω"],
    answer: "παγώνω",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["συμπληρώνω", "σημπληρώνω", "σοιμπλιρώνω", "συμπληρώνο"],
    answer: "συμπληρώνω",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["καυτερός", "καφτερός", "καυτερώς", "καυταιρός"],
    answer: "καυτερός",
    category: "Forest-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: ["εξήντα", "αιξήντα", "εξίντα", "εξοιντα"],
    answer: "εξήντα",
    category: "Forest-Spelling"
  }
];

// Crossroads and Treasure Island specific spelling riddles
export const crossroadsTreasureSpellingRiddles = [
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["θησαυρός", "θυσαβρος", "θυσαβρός", "θυσσαυρός"]),
    answer: "θησαυρός",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τρυφίλι", "τριφύλλι", "τριφίλι", "τρυφύλλι"]),
    answer: "τριφύλλι",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["χελώνα", "χελόνα", "χαιλώνα", "χελλώνα"]),
    answer: "χελώνα",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["μελιτζάνα", "μαιλητζάνα", "μελιτζανα", "μελιτζάννα"]),
    answer: "μελιτζάνα",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τρίχαις", "τρήχες", "τρίχες", "τριχές"]),
    answer: "τρίχες",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["πηγαίνω", "πιγαίνο", "πηγαίνο", "πιγαίνω"]),
    answer: "πηγαίνω",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["τρώω", "τρώο", "τρωώ", "τρόω"]),
    answer: "τρώω",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["πεπόνι", "παιπόνη", "πεπώνι", "πεπόνη"]),
    answer: "πεπόνι",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["στρίβω", "στρήβο", "στρυβώ", "στρύβω"]),
    answer: "στρίβω",
    category: "CrossroadsTreasure-Spelling"
  },
  // Extra 6 similar spelling questions
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["καθρέφτης", "καθρεφτής", "καθρευτής", "καθρέφτις"]),
    answer: "καθρέφτης",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["ποδήλατο", "ποδύλατο", "ποδηλάτο", "ποδήλατω"]),
    answer: "ποδήλατο",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["ευχαριστώ", "ευχαρηστώ", "ευχαιριστώ", "ευχαριστο"]),
    answer: "ευχαριστώ",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["πρωί", "προί", "πρωη", "προυί"]),
    answer: "πρωί",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["αύριο", "αύρηο", "άυριο", "αύριω"]),
    answer: "αύριο",
    category: "CrossroadsTreasure-Spelling"
  },
  {
    question: "Ποια είναι η σωστή γραφή της λέξης;",
    options: shuffleArray(["καλοκαίρι", "καλοκαιρή", "καλοκέιρι", "καλοκαίρυ"]),
    answer: "καλοκαίρι",
    category: "CrossroadsTreasure-Spelling"
  }
];