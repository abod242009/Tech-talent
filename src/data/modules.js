// Offline learning modules
// Each module contains: id, title, subject, level, goal, video, notes, quizQuestions
export const modules = [
  {
    id: 'english_foundation',
    title: 'English Foundation Module',
    subject: 'english',
    level: 'foundation',
    goal: 'tawjihi',
    video: require('../../assets/videos/english_foundation.mp4'),
    notes: [
      {
        title: 'Basic Grammar',
        explanation: 'A sentence needs a subject and a verb. Make sure they agree.',
        example: 'She goes to school.',
        mistake: 'Using the wrong verb form with a singular subject.',
        tip: 'Identify the subject and match the verb accordingly.',
      },
    ],
    quizQuestions: [
      {
        question: 'Identify the subject in the sentence: “The cat sleeps.”',
        options: ['The', 'cat', 'sleeps', 'cat sleeps'],
        correctAnswer: 1,
      },
      {
        question: 'Which is a complete sentence?',
        options: [
          'Running fast.',
          'The boy.',
          'They play.',
          'Beautiful flowers.',
        ],
        correctAnswer: 2,
      },
      {
        question: 'Choose the correct plural form: baby',
        options: ['babys', 'babies', 'babyes', 'babyies'],
        correctAnswer: 1,
      },
      {
        question: 'Select the correct verb: She ___ reading.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 0,
      },
      {
        question: 'Which is an adjective?',
        options: ['quickly', 'blue', 'run', 'city'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'math_foundation',
    title: 'Math Foundation Module',
    subject: 'math',
    level: 'foundation',
    goal: 'tawjihi',
    video: require('../../assets/videos/math_foundation.mp4'),
    notes: [
      {
        title: 'Basic Algebra',
        explanation: 'Algebra involves finding unknown values. Keep equations balanced.',
        example: '2x + 3 = 9 \n2x = 6 \nx = 3',
        mistake: 'Not performing the same operation on both sides.',
        tip: 'Whatever you do to one side of the equation, do to the other.',
      },
    ],
    quizQuestions: [
      {
        question: 'Solve for x: x + 5 = 10',
        options: ['3', '4', '5', '10'],
        correctAnswer: 2,
      },
      {
        question: 'What is 9 × 3?',
        options: ['18', '27', '30', '36'],
        correctAnswer: 1,
      },
      {
        question: 'Which fraction is equal to 0.5?',
        options: ['1/3', '1/2', '2/3', '3/4'],
        correctAnswer: 1,
      },
      {
        question: 'Simplify: 4x + 3x',
        options: ['7', '7x', 'x7', '4x'],
        correctAnswer: 1,
      },
      {
        question: 'What is the perimeter of a square with side length 4?',
        options: ['8', '12', '16', '20'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'critical_foundation',
    title: 'Critical Thinking Foundation Module',
    subject: 'critical',
    level: 'foundation',
    goal: 'tawjihi',
    video: require('../../assets/videos/critical_foundation.mp4'),
    notes: [
      {
        title: 'Logical Reasoning',
        explanation: 'Critical thinking involves analysing facts to make a decision.',
        example: 'If all birds fly and penguins are birds, penguins can fly is false because penguins are an exception.',
        mistake: 'Making generalisations without considering exceptions.',
        tip: 'Look for exceptions and verify assumptions.',
      },
    ],
    quizQuestions: [
      {
        question: 'Which conclusion follows from: All mammals breathe air. Whales are mammals.',
        options: [
          'Whales do not breathe air.',
          'Whales breathe air.',
          'Whales live on land.',
          'Whales are fish.',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Identify the pattern: 1, 4, 9, 16, ...',
        options: ['20', '25', '30', '36'],
        correctAnswer: 1,
      },
      {
        question: 'If A implies B and B implies C, then A implies...',
        options: ['A', 'C', 'B', 'Nothing'],
        correctAnswer: 1,
      },
      {
        question: 'Which is a fact?',
        options: [
          'Chocolate tastes better than vanilla.',
          'The Earth revolves around the Sun.',
          'Spring is the best season.',
          'Dogs are cuter than cats.',
        ],
        correctAnswer: 1,
      },
      {
        question: 'What does it mean to evaluate an argument?',
        options: [
          'Accept it without question.',
          'Determine its validity based on evidence.',
          'Argue back aggressively.',
          'Make the argument longer.',
        ],
        correctAnswer: 1,
      },
    ],
  },
];

/**
 * Return modules filtered by subject, level or goal. Pass undefined to ignore filter.
 */
export const getModuleForRecommendation = ({ subject, level, goal }) => {
  return modules.find(
    (m) => m.subject === subject && m.level === level && (!goal || m.goal === goal)
  );
};