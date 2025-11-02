// Math Riddles - Mathematical problems and equations

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to generate random math riddles
export function generateMathRiddles() {
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

// Volcano-specific math riddles (Greek)
export const volcanoMathRiddles = [
  // Simple equations (a+3=5, a=?)
  {
    question: "Αν α + 3 = 5, τότε α = ?",
    options: ["2", "3", "4", "5"],
    answer: "2",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 2 = 7, τότε α = ?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 4 = 9, τότε α = ?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 1 = 6, τότε α = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 5 = 10, τότε α = ?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 2 = 4, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 3 = 8, τότε α = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 1 = 3, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Volcano-Math"
  },
  // Negative numbers
  {
    question: "Αν α + 3 = 2, τότε α = ?",
    options: ["-2", "-1", "0", "1"],
    answer: "-1",
    category: "Volcano-Math"
  },
  {
    question: "Αν α + 4 = 2, τότε α = ?",
    options: ["-3", "-2", "-1", "0"],
    answer: "-2",
    category: "Volcano-Math"
  },
  // Zero
  {
    question: "Αν α + 5 = 5, τότε α = ?",
    options: ["-1", "0", "1", "2"],
    answer: "0",
    category: "Volcano-Math"
  },
  
  // Square roots
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 1;",
    options: ["0", "1", "2", "3"],
    answer: "1",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 4;",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 9;",
    options: ["2", "3", "4", "5"],
    answer: "3",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 16;",
    options: ["3", "4", "5", "6"],
    answer: "4",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 25;",
    options: ["4", "5", "6", "7"],
    answer: "5",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 36;",
    options: ["5", "6", "7", "8"],
    answer: "6",
    category: "Volcano-Math"
  },
  {
    question: "Ποια είναι η τετραγωνική ρίζα του 0;",
    options: ["0", "1", "2", "3"],
    answer: "0",
    category: "Volcano-Math"
  },
  
  // Geometric shapes
  {
    question: "Πόσες πλευρές έχει ένα τρίγωνο;",
    options: ["2", "3", "4", "5"],
    answer: "3",
    category: "Volcano-Math"
  },
  {
    question: "Πόσες πλευρές έχει ένα τετράγωνο;",
    options: ["3", "4", "5", "6"],
    answer: "4",
    category: "Volcano-Math"
  },
  {
    question: "Πόσες πλευρές έχει ένα εξάγωνο;",
    options: ["4", "5", "6", "7"],
    answer: "6",
    category: "Volcano-Math"
  },
  {
    question: "Πόσες πλευρές έχει ένας κύκλος;",
    options: ["0", "1", "2", "3"],
    answer: "0",
    category: "Volcano-Math"
  }
];

// Forest-specific math riddles
export const forestMathRiddles = [
  // 3-digit + 2-digit addition riddles (first digit 1, 2, or 3)
  {
    question: "What is 123 + 45?",
    options: ["168", "169", "167", "170"],
    answer: "168",
    category: "Forest-Math"
  },
  {
    question: "What is 145 + 67?",
    options: ["212", "213", "211", "214"],
    answer: "212",
    category: "Forest-Math"
  },
  {
    question: "What is 189 + 34?",
    options: ["223", "224", "222", "225"],
    answer: "223",
    category: "Forest-Math"
  },
  {
    question: "What is 156 + 89?",
    options: ["245", "246", "244", "247"],
    answer: "245",
    category: "Forest-Math"
  },
  {
    question: "What is 234 + 56?",
    options: ["290", "291", "289", "292"],
    answer: "290",
    category: "Forest-Math"
  },
  {
    question: "What is 267 + 78?",
    options: ["345", "346", "344", "347"],
    answer: "345",
    category: "Forest-Math"
  },
  {
    question: "What is 289 + 45?",
    options: ["334", "335", "333", "336"],
    answer: "334",
    category: "Forest-Math"
  },
  {
    question: "What is 312 + 23?",
    options: ["335", "336", "334", "337"],
    answer: "335",
    category: "Forest-Math"
  },
  {
    question: "What is 345 + 67?",
    options: ["412", "413", "411", "414"],
    answer: "412",
    category: "Forest-Math"
  },
  {
    question: "What is 378 + 89?",
    options: ["467", "468", "466", "469"],
    answer: "467",
    category: "Forest-Math"
  },
  
  // Equations with expanded range (-5 to 20) and subtraction
  {
    question: "Αν α + 5 = 15, τότε α = ?",
    options: ["8", "9", "10", "11"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 3 = 12, τότε α = ?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 7 = 18, τότε α = ?",
    options: ["10", "11", "12", "13"],
    answer: "11",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 4 = 8, τότε α = ?",
    options: ["11", "12", "13", "14"],
    answer: "12",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 2 = 19, τότε α = ?",
    options: ["16", "17", "18", "19"],
    answer: "17",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 6 = 9, τότε α = ?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 8 = 20, τότε α = ?",
    options: ["11", "12", "13", "14"],
    answer: "12",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 2 = 13, τότε α = ?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 3 = 16, τότε α = ?",
    options: ["12", "13", "14", "15"],
    answer: "13",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 5 = 10, τότε α = ?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 4 = 14, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 3 = 7, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 6 = 17, τότε α = ?",
    options: ["10", "11", "12", "13"],
    answer: "11",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 4 = 6, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 1 = 20, τότε α = ?",
    options: ["18", "19", "20", "21"],
    answer: "19",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 2 = 8, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 5 = 13, τότε α = ?",
    options: ["7", "8", "9", "10"],
    answer: "8",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 1 = 9, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  },
  {
    question: "Αν α + 3 = 11, τότε α = ?",
    options: ["7", "8", "9", "10"],
    answer: "8",
    category: "Forest-Math"
  },
  {
    question: "Αν α - 5 = 5, τότε α = ?",
    options: ["9", "10", "11", "12"],
    answer: "10",
    category: "Forest-Math"
  }
];

// Crossroads-specific math riddles (higher range -5 to 40, with multiplication)
export const crossroadsMathRiddles = [
  // Addition equations with expanded range (-5 to 40)
  {
    question: "Αν α + 8 = 35, τότε α = ?",
    options: ["25", "26", "27", "28"],
    answer: "27",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 12 = 40, τότε α = ?",
    options: ["26", "27", "28", "29"],
    answer: "28",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 15 = 38, τότε α = ?",
    options: ["21", "22", "23", "24"],
    answer: "23",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 20 = 45, τότε α = ?",
    options: ["23", "24", "25", "26"],
    answer: "25",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 7 = 32, τότε α = ?",
    options: ["23", "24", "25", "26"],
    answer: "25",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 18 = 42, τότε α = ?",
    options: ["22", "23", "24", "25"],
    answer: "24",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 25 = 50, τότε α = ?",
    options: ["23", "24", "25", "26"],
    answer: "25",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 10 = 30, τότε α = ?",
    options: ["18", "19", "20", "21"],
    answer: "20",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 22 = 45, τότε α = ?",
    options: ["21", "22", "23", "24"],
    answer: "23",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 16 = 39, τότε α = ?",
    options: ["21", "22", "23", "24"],
    answer: "23",
    category: "Crossroads-Math"
  },
  
  // Subtraction equations with expanded range
  {
    question: "Αν α - 8 = 25, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 12 = 20, τότε α = ?",
    options: ["30", "31", "32", "33"],
    answer: "32",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 15 = 18, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 10 = 22, τότε α = ?",
    options: ["30", "31", "32", "33"],
    answer: "32",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 18 = 15, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 5 = 28, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 20 = 12, τότε α = ?",
    options: ["30", "31", "32", "33"],
    answer: "32",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 14 = 19, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 7 = 26, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α - 16 = 17, τότε α = ?",
    options: ["31", "32", "33", "34"],
    answer: "33",
    category: "Crossroads-Math"
  },
  
  // Negative numbers
  {
    question: "Αν α + 5 = -2, τότε α = ?",
    options: ["-8", "-7", "-6", "-5"],
    answer: "-7",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 8 = -1, τότε α = ?",
    options: ["-10", "-9", "-8", "-7"],
    answer: "-9",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 12 = 2, τότε α = ?",
    options: ["-12", "-11", "-10", "-9"],
    answer: "-10",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 15 = -3, τότε α = ?",
    options: ["-19", "-18", "-17", "-16"],
    answer: "-18",
    category: "Crossroads-Math"
  },
  {
    question: "Αν α + 20 = 5, τότε α = ?",
    options: ["-17", "-16", "-15", "-14"],
    answer: "-15",
    category: "Crossroads-Math"
  },
  
  // Multiplication equations
  {
    question: "Αν 3 × α = 12, τότε α = ?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 4 × α = 8, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 6 × α = 0, τότε α = ?",
    options: ["-1", "0", "1", "2"],
    answer: "0",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 5 × α = 25, τότε α = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 7 × α = 21, τότε α = ?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 8 × α = 16, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 2 × α = 10, τότε α = ?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 9 × α = 18, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 10 × α = 30, τότε α = ?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    category: "Crossroads-Math"
  },
  {
    question: "Αν 11 × α = 22, τότε α = ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    category: "Crossroads-Math"
  }
];

// Include forest German math riddles in crossroads
export const crossroadsGermanMathRiddles = [
  {
    question: "Was ist eins plus zwei?",
    options: shuffleArray(["drei", "vier", "fünf", "sechs"]),
    answer: "drei",
    category: "Crossroads-German"
  },
  {
    question: "Was ist fünf plus drei?",
    options: shuffleArray(["sieben", "acht", "neun", "zehn"]),
    answer: "acht",
    category: "Crossroads-German"
  },
  {
    question: "Was ist sieben plus vier?",
    options: shuffleArray(["zehn", "elf", "zwölf", "dreizehn"]),
    answer: "elf",
    category: "Crossroads-German"
  },
  {
    question: "Was ist neun plus sechs?",
    options: shuffleArray(["vierzehn", "fünfzehn", "sechzehn", "siebzehn"]),
    answer: "fünfzehn",
    category: "Crossroads-German"
  },
  {
    question: "Was ist acht plus sieben?",
    options: shuffleArray(["vierzehn", "fünfzehn", "sechzehn", "siebzehn"]),
    answer: "fünfzehn",
    category: "Crossroads-German"
  },
  {
    question: "Was ist zehn minus drei?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Crossroads-German"
  },
  {
    question: "Was ist zwölf minus fünf?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Crossroads-German"
  },
  {
    question: "Was ist fünfzehn minus acht?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Crossroads-German"
  },
  {
    question: "Was ist elf minus vier?",
    options: shuffleArray(["fünf", "sechs", "sieben", "acht"]),
    answer: "sieben",
    category: "Crossroads-German"
  }
];