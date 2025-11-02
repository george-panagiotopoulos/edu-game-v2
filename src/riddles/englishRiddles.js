// English Language Riddles - Translation exercises between English and Greek

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// English to Greek translation riddles (10)
export const englishToGreekRiddles = [
  { question: "How do you say 'dog' in Greek?", options: shuffleArray(["σκύλος", "γάτα", "ψάρι", "πουλί"]), answer: "σκύλος", category: "English" },
  { question: "How do you say 'cat' in Greek?", options: shuffleArray(["σκύλος", "γάτα", "ψάρι", "πουλί"]), answer: "γάτα", category: "English" },
  { question: "How do you say 'bird' in Greek?", options: shuffleArray(["σκύλος", "γάτα", "πουλί", "ψάρι"]), answer: "πουλί", category: "English" },
  { question: "How do you say 'fish' in Greek?", options: shuffleArray(["σκύλος", "γάτα", "πουλί", "ψάρι"]), answer: "ψάρι", category: "English" },
  { question: "How do you say 'horse' in Greek?", options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]), answer: "άλογο", category: "English" },
  { question: "How do you say 'cow' in Greek?", options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]), answer: "αγελάδα", category: "English" },
  { question: "How do you say 'sheep' in Greek?", options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]), answer: "πρόβατο", category: "English" },
  { question: "How do you say 'pig' in Greek?", options: shuffleArray(["άλογο", "αγελάδα", "πρόβατο", "γουρούνι"]), answer: "γουρούνι", category: "English" },
  { question: "How do you say 'mother' in Greek?", options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]), answer: "μητέρα", category: "English" },
  { question: "How do you say 'father' in Greek?", options: shuffleArray(["μητέρα", "πατέρας", "γιος", "κόρη"]), answer: "πατέρας", category: "English" }
];

// Greek to English translation riddles (10)
export const greekToEnglishRiddles = [
  { question: "Πώς λέγεται το 'σκύλος' στα αγγλικά;", options: shuffleArray(["dog", "cat", "fish", "bird"]), answer: "dog", category: "English" },
  { question: "Πώς λέγεται η 'γάτα' στα αγγλικά;", options: shuffleArray(["dog", "cat", "fish", "bird"]), answer: "cat", category: "English" },
  { question: "Πώς λέγεται το 'πουλί' στα αγγλικά;", options: shuffleArray(["dog", "cat", "bird", "fish"]), answer: "bird", category: "English" },
  { question: "Πώς λέγεται το 'ψάρι' στα αγγλικά;", options: shuffleArray(["dog", "cat", "bird", "fish"]), answer: "fish", category: "English" },
  { question: "Πώς λέγεται το 'άλογο' στα αγγλικά;", options: shuffleArray(["horse", "cow", "sheep", "pig"]), answer: "horse", category: "English" },
  { question: "Πώς λέγεται η 'αγελάδα' στα αγγλικά;", options: shuffleArray(["horse", "cow", "sheep", "pig"]), answer: "cow", category: "English" },
  { question: "Πώς λέγεται το 'πρόβατο' στα αγγλικά;", options: shuffleArray(["horse", "cow", "sheep", "pig"]), answer: "sheep", category: "English" },
  { question: "Πώς λέγεται το 'γουρούνι' στα αγγλικά;", options: shuffleArray(["horse", "cow", "sheep", "pig"]), answer: "pig", category: "English" },
  { question: "Πώς λέγεται η 'μητέρα' στα αγγλικά;", options: shuffleArray(["mother", "father", "son", "daughter"]), answer: "mother", category: "English" },
  { question: "Πώς λέγεται ο 'πατέρας' στα αγγλικά;", options: shuffleArray(["mother", "father", "son", "daughter"]), answer: "father", category: "English" }
];

