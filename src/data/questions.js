// Local question bank for the readiness exams
// Each object contains: id, subject (english|math|critical), question, options, correctAnswer (index)
export const questions = [
  {
    id: 'eng_001',
    subject: 'english',
    question: 'Which sentence is grammatically correct?',
    options: [
      'She go to school.',
      'She goes to school.',
      'She going to school.',
      'She gone to school.',
    ],
    correctAnswer: 1,
  },
  {
    id: 'eng_002',
    subject: 'english',
    question: 'Choose the correct synonym for “happy”.',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    correctAnswer: 1,
  },
  {
    id: 'eng_003',
    subject: 'english',
    question: 'What is the past tense of “go”?',
    options: ['Goed', 'Went', 'Go', 'Going'],
    correctAnswer: 1,
  },
  {
    id: 'eng_004',
    subject: 'english',
    question: 'Which word is a noun?',
    options: ['Run', 'Blue', 'City', 'Quickly'],
    correctAnswer: 2,
  },
  {
    id: 'eng_005',
    subject: 'english',
    question: 'Select the correct article: ___ apple a day keeps the doctor away.',
    options: ['A', 'An', 'The', 'No article'],
    correctAnswer: 1,
  },
  {
    id: 'math_001',
    subject: 'math',
    question: 'What is 7 + 5?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
  },
  {
    id: 'math_002',
    subject: 'math',
    question: 'If x = 4, what is 3x?',
    options: ['7', '8', '10', '12'],
    correctAnswer: 3,
  },
  {
    id: 'math_003',
    subject: 'math',
    question: 'Solve: 20 − 9 =',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
  },
  {
    id: 'math_004',
    subject: 'math',
    question: 'Which fraction is equivalent to 1/2?',
    options: ['2/4', '3/5', '4/6', '5/8'],
    correctAnswer: 0,
  },
  {
    id: 'math_005',
    subject: 'math',
    question: 'What is the area of a rectangle with length 5 and width 3?',
    options: ['8', '10', '15', '20'],
    correctAnswer: 2,
  },
  {
    id: 'critical_001',
    subject: 'critical',
    question: 'If all roses are flowers and some flowers fade quickly, which statement is true?',
    options: [
      'All roses fade quickly.',
      'Some roses fade quickly.',
      'No roses fade quickly.',
      'Some flowers are roses.',
    ],
    correctAnswer: 1,
  },
  {
    id: 'critical_002',
    subject: 'critical',
    question: 'Which shape has the most sides?',
    options: ['Triangle', 'Rectangle', 'Pentagon', 'Hexagon'],
    correctAnswer: 3,
  },
  {
    id: 'critical_003',
    subject: 'critical',
    question: 'What number comes next in the sequence: 2, 4, 8, 16, ...?',
    options: ['18', '20', '24', '32'],
    correctAnswer: 3,
  },
  {
    id: 'critical_004',
    subject: 'critical',
    question: 'If it takes 3 workers 3 hours to build a wall, how long will it take 6 workers?',
    options: ['1.5 hours', '3 hours', '6 hours', '9 hours'],
    correctAnswer: 0,
  },
  {
    id: 'critical_005',
    subject: 'critical',
    question: 'Which of the following is an example of cause and effect?',
    options: [
      'The sun rises in the east.',
      'If you study, you get better grades.',
      'Grass is green.',
      'Cats chase mice.',
    ],
    correctAnswer: 1,
  },
];

/**
 * Retrieve questions for a specific subject. Used by the quiz engine to
 * filter the question bank.
 */
export const getQuestionsBySubject = (subject) =>
  questions.filter((q) => q.subject === subject);