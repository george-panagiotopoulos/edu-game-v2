// Math Riddles - Mathematical problems and equations

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